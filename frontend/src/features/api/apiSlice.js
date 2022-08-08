import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { setAuth, logout } from 'features/auth/authSlice';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: '/api/',
	prepareHeaders: (headers, { getState }) => {
		const access = getState().auth.access;
		if (access) {
			headers.set('Authorization', `Bearer ${access}`);
		}
		return headers;
	},
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			try {
				const refresh = api.getState().auth.refresh;

				const refreshResult = await baseQuery(
					{
						url: 'token/refresh/',
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: {
							refresh,
						},
					},
					api,
					extraOptions
				);

				if (refreshResult.data) {
					api.dispatch(setAuth({ access: refreshResult.data.access, refresh }));

					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({}),
});
