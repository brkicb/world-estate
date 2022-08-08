import { useGetListingQuery } from 'features/listings/listingsApiSlice';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from 'components/Layout';
import { numWithCommas } from 'lib/numWithCommas';

const ListingDetailPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { slug } = useParams();

	const { data: listing, isLoading, isSuccess } = useGetListingQuery(slug);

	const goBack = () => {
		if (
			location.state &&
			location.state.from &&
			location.state.from.pathname &&
			location.state.from.pathname === '/login'
		) {
			navigate('/listings');
		} else {
			navigate(-1);
		}
	};

	return (
		<Layout
			title={`World Estate | ${isSuccess && listing.address}`}
			content='ListingDetail page'
		>
			{isLoading ? (
				<div className='spinner-border text-primary mt-5' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			) : isSuccess ? (
				<>
					<nav>
						<ol className='breadcrumb'>
							<li className='breadcrumb-item'>
								<a
									className='link-primary cursor-pointer'
									role='button'
									onClick={goBack}
								>
									Listings
								</a>
							</li>
							<li className='breadcrumb-item active'>{listing.address}</li>
						</ol>
					</nav>
					<img
						className='img-fluid'
						src={listing.photo}
						alt={listing.address}
					/>
					<h1 className='display-6 mt-5 mb-5'>{listing.address}</h1>
					<div className='row'>
						<div className='col-6'>
							<p className='text-muted'>
								{listing.city}, {listing.state_province}
							</p>
							<p className='fw-bold'>
								{listing.bedrooms} Bed &middot; {listing.bathrooms} Bath
								&middot; {listing.sqft} Sqft
							</p>
						</div>
						<div className='col-6'>
							<p className='fs-3 fw-bold'>${numWithCommas(listing.price)}</p>
							<p className='fs-4 fst-italic'>{listing.sale_type}</p>
						</div>
					</div>
					<p className='fs-4 fw-bold'>Details</p>
					<ul>
						<li>Zipcode: {listing.postal_zip_code}</li>
						<li>Taxes: ${numWithCommas(listing.taxes)}</li>
						<li>Home Type: {listing.home_type}</li>
						<li>Open House: {listing.open_house ? 'Yes' : 'No'}</li>
						<li>Walk Score: {listing.walk_score}</li>
						<li>MLS#: {listing.mls_number}</li>
						<li>MLS Source: {listing.mls_source}</li>
						<li>
							Added:{' '}
							{new Date(listing.date_created).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</li>
						<li>
							Listed By: {listing.realtor.first_name}{' '}
							{listing.realtor.last_name}
						</li>
						<li>Realtor Contact: {listing.realtor.email}</li>
					</ul>
					<div className='row mt-5'>
						{listing.listing_photos.map(listing_photo => (
							<div key={listing_photo.id} className='col-md-4 mb-5'>
								<img
									className='img-fluid'
									src={listing_photo.photo}
									alt={listing_photo.alt}
								/>
							</div>
						))}
					</div>
				</>
			) : (
				<></>
			)}
		</Layout>
	);
};

export default ListingDetailPage;
