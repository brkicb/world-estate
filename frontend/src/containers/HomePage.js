import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from 'components/Layout';

const HomePage = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		home_type: 'House',
		sale_type: 'For Sale',
		price: 0,
		bedrooms: 0,
		bathrooms: 0,
		sqft: 0,
		photo_count: 1,
		open_house: false,
	});

	const {
		home_type,
		sale_type,
		price,
		bedrooms,
		bathrooms,
		sqft,
		photo_count,
		open_house,
	} = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();

		let url = '/search';
		url += `?home_type=${home_type}`;
		url += `&sale_type=${sale_type}`;
		url += `&price=${price}`;
		url += `&bedrooms=${bedrooms}`;
		url += `&bathrooms=${bathrooms}`;
		url += `&sqft=${sqft}`;
		url += `&photo_count=${photo_count}`;
		url += `&open_house=${open_house}`;

		navigate(url);
	};

	return (
		<Layout title='World Estate | Home' content='Home page'>
			<h1 className='display-6 mb-5'>World Estate</h1>
			<form onSubmit={onSubmit}>
				<div className='row'>
					<div className='col-md-3'>
						<div className='form-group'>
							<label className='form-label' htmlFor='home_type'>
								Home Type
							</label>
							<select
								className='form-select mb-3'
								name='home_type'
								onChange={onChange}
								value={home_type}
								required
							>
								<option value='House'>House</option>
								<option value='Condo'>Condo</option>
								<option value='Townhouse'>Townhouse</option>
							</select>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='form-group'>
							<label className='form-label' htmlFor='sale_type'>
								For Sale or Rent
							</label>
							<select
								className='form-select mb-3'
								name='sale_type'
								onChange={onChange}
								value={sale_type}
								required
							>
								<option value='For Sale'>For Sale</option>
								<option value='For Rent'>For Rent</option>
							</select>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='form-group'>
							<label className='form-label' htmlFor='price'>
								Min Price
							</label>
							<select
								className='form-select mb-3'
								name='price'
								onChange={onChange}
								value={price}
								required
							>
								<option value={0}>$0+</option>
								<option value={200000}>$200,000+</option>
								<option value={400000}>$400,000+</option>
								<option value={600000}>$600,000+</option>
								<option value={800000}>$800,000+</option>
								<option value={100000}>$1,000,000+</option>
								<option value={1500000}>$1,500,000+</option>
								<option value={2000000}>$2,000,000+</option>
							</select>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='form-group'>
							<label className='form-label' htmlFor='bedrooms'>
								Bedrooms
							</label>
							<select
								className='form-select mb-3'
								name='bedrooms'
								onChange={onChange}
								value={bedrooms}
								required
							>
								<option value={0}>0+</option>
								<option value={1}>1+</option>
								<option value={2}>2+</option>
								<option value={3}>3+</option>
								<option value={4}>4+</option>
								<option value={5}>5+</option>
							</select>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-3'>
						<div className='form-group'>
							<label className='form-label' htmlFor='bathrooms'>
								Bathrooms
							</label>
							<select
								className='form-select mb-3'
								name='bathrooms'
								onChange={onChange}
								value={bathrooms}
								required
							>
								<option value={0}>0+</option>
								<option value={1}>1+</option>
								<option value={2}>2+</option>
								<option value={3}>3+</option>
								<option value={4}>4+</option>
							</select>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='form-group'>
							<label className='form-label' htmlFor='sqft'>
								Sqft
							</label>
							<select
								className='form-select mb-3'
								name='sqft'
								onChange={onChange}
								value={sqft}
								required
							>
								<option value={0}>0+</option>
								<option value={500}>500+</option>
								<option value={1000}>1000+</option>
								<option value={1500}>1500+</option>
								<option value={2000}>2000+</option>
								<option value={3000}>3000+</option>
							</select>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='form-group'>
							<label className='form-label' htmlFor='photo_count'>
								Interior Photos
							</label>
							<select
								className='form-select mb-3'
								name='photo_count'
								onChange={onChange}
								value={photo_count}
								required
							>
								<option value={1}>1+</option>
								<option value={2}>2+</option>
								<option value={3}>3+</option>
								<option value={4}>4+</option>
								<option value={5}>5+</option>
							</select>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='form-group'>
							<label className='form-label' htmlFor='open_house'>
								Open House
							</label>
							<select
								className='form-select mb-3'
								name='open_house'
								onChange={onChange}
								value={open_house}
								required
							>
								<option value={false}>No</option>
								<option value={true}>Yes</option>
							</select>
						</div>
					</div>
				</div>
				<button className='btn btn-primary mt-5'>Search Listings</button>
			</form>
		</Layout>
	);
};

export default HomePage;
