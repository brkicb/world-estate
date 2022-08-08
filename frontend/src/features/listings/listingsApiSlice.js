import { apiSlice } from 'features/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
	refetchOnReconnect: true,
	endpoints: builder => ({
		getListing: builder.query({
			query: slug => `listings/${slug}`,
		}),
		getListings: builder.query({
			query: (page = 1) => ({ url: `listings/?page=${page}` }),
		}),
		searchListings: builder.query({
			query: ({
				home_type,
				sale_type,
				price,
				bedrooms,
				bathrooms,
				sqft,
				photo_count,
				open_house,
				page = 1,
			}) => ({
				url: 'listings/search',
				params: {
					home_type,
					sale_type,
					price,
					bedrooms,
					bathrooms,
					sqft,
					photo_count,
					open_house,
					page,
				},
			}),
		}),
	}),
});

export const {
	useGetListingQuery,
	useGetListingsQuery,
	useSearchListingsQuery,
} = authApiSlice;
