import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from 'features/auth/authApiSlice';
import Layout from 'components/Layout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
	const navigate = useNavigate();
	const [register] = useRegisterMutation();
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
	});
	const [submitAttempted, setSubmitAttempted] = useState(false);

	const { first_name, last_name, email, password } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();

		register({ first_name, last_name, email, password })
			.unwrap()
			.then(payload => {
				navigate('/login');
			})
			.catch(err => {
				toast.error('Register failed');
			});
	};

	const formStyling = submitAttempted
		? 'needs-validation was-validated'
		: 'needs-validation';

	return (
		<Layout title='World Estate | Register' content='Register page'>
			<ToastContainer />
			<h1 className='display-6 mb-5'>Register for an Account</h1>
			<form className={formStyling} onSubmit={onSubmit}>
				<div className='form-group'>
					<label className='form-label' htmlFor='first_name'>
						First Name
					</label>
					<input
						className='form-control'
						type='text'
						name='first_name'
						onChange={onChange}
						value={first_name}
						required
					/>
					<div className='invalid-feedback'>Please enter a first name</div>
				</div>
				<div className='form-group mt-3'>
					<label className='form-label' htmlFor='last_name'>
						Last Name
					</label>
					<input
						className='form-control'
						type='text'
						name='last_name'
						onChange={onChange}
						value={last_name}
						required
					/>
					<div className='invalid-feedback'>Please enter a last name</div>
				</div>
				<div className='form-group mt-3'>
					<label className='form-label' htmlFor='email'>
						Email
					</label>
					<input
						className='form-control'
						type='email'
						name='email'
						onChange={onChange}
						value={email}
						required
					/>
					<div className='invalid-feedback'>Please enter an email address</div>
				</div>
				<div className='form-group mt-3'>
					<label className='form-label' htmlFor='password'>
						Password
					</label>
					<input
						className='form-control'
						type='password'
						name='password'
						onChange={onChange}
						value={password}
						required
					/>
					<div className='invalid-feedback'>Please enter a password</div>
				</div>
				<button
					className='btn btn-primary mt-4'
					onClick={() => setSubmitAttempted(true)}
				>
					Register
				</button>
			</form>
			<p className='mt-5'>
				Already have an account? <Link to='/login'>Login</Link>
			</p>
		</Layout>
	);
};

export default RegisterPage;
