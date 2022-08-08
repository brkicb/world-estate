import { useGetListingsQuery } from 'features/listings/listingsApiSlice';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Layout from 'components/Layout';
import Pagination from 'components/Pagination';
import { numWithCommas } from 'lib/numWithCommas';

const ListingsPage = () => {
	const { search } = useLocation();

	const queryParams = queryString.parse(search);

	const currentPage = () => {
		const n = parseInt(queryParams.page);

		if (n) return n;
		return 1;
	};

	const { data: listings, isLoading } = useGetListingsQuery(currentPage());

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

	return (
		<Layout title='World Estate | Listings' content='Listings page'>
			<h1 className='display-6 mb-5'>All Listings</h1>
			{isLoading || listings === undefined ? (
				<div className='spinner-border text-primary' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			) : (
				<>
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

export default ListingsPage;
