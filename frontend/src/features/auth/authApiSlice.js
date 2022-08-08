import { apiSlice } from 'features/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation({
			query: ({ first_name, last_name, email, password }) => ({
				url: 'users/register',
				method: 'POST',
				body: { first_name, last_name, email, password },
			}),
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: 'token/',
				method: 'POST',
				body: { email, password },
			}),
		}),
		verify: builder.mutation({
			query: access => ({
				url: 'token/verify/',
				method: 'POST',
				body: { token: access },
			}),
		}),
		getUser: builder.query({
			query: () => '/users/me',
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useVerifyMutation,
	useGetUserQuery,
} = authApiSlice;
