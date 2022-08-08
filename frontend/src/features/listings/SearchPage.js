import { useSearchListingsQuery } from 'features/listings/listingsApiSlice';
import { Link, Navigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Layout from 'components/Layout';
import Pagination from 'components/Pagination';
import { numWithCommas } from 'lib/numWithCommas';

const SearchPage = () => {
	const location = useLocation();
	const { page, ...queryParams } = queryString.parse(location.search);

	const currentPage = () => {
		const n = parseInt(page);

		if (isNaN(n)) return 1;
		return n;
	};

	const {
		data: listings,
		isLoading,
		isError,
	} = useSearchListingsQuery({ page: currentPage(), ...queryParams });

	const getListings = () => {
		return (
			<div className='row'>
				{listings.results.map(listing => (
					<div key={listing.id} className='col-md-4 mb-5'>
						<div className='card'>
							<Link to={`/listings/${listing.slug}`}>
								<img
									src={listing.photo}
									className='card-img-top'
									alt={listing.address}
								/>
							</Link>
							<div className='card-body'>
								<h5 className='card-title'>${numWithCommas(listing.price)}</h5>
								<p className='card-text'>
									{listing.bedrooms} bed, {listing.bathrooms} bath,{' '}
									{listing.sqft} sqft
								</p>
								<p className='card-text'>
									{listing.address}, {listing.city}, {listing.state_province}{' '}
									&middot; {listing.postal_zip_code}
								</p>
								<p className='card-text text-muted'>
									MLS&reg; {listing.mls_number} &middot; {listing.mls_source}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	if (isError) {
		return <Navigate to='/' />;
	}

	return (
		<Layout title='World Estate | Search' content='Search page'>
			{isLoading || listings === undefined ? (
				<div className='spinner-border text-primary mt-5' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			) : (
				<>
					<h1 className='display-6 mb-5'>Found {listings.count} Listings</h1>
					{getListings()}
					<Pagination
						count={listings.count}
						currentPage={currentPage()}
						previous={listings.previous}
						next={listings.next}
					/>
				</>
			)}
		</Layout>
	);
};

export default SearchPage;
