import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from 'features/auth/authSlice';
import { useLoginMutation } from 'features/auth/authApiSlice';
import Layout from 'components/Layout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const [login] = useLoginMutation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [submitAttempted, setSubmitAttempted] = useState(false);

	const { email, password } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();

		login({ email, password })
			.unwrap()
			.then(fulfilled => {
				localStorage.setItem('access', fulfilled.access);
				localStorage.setItem('refresh', fulfilled.refresh);

				dispatch(setAuth(fulfilled));
				if (
					location.state &&
					location.state.from &&
					location.state.from.pathname
				) {
					navigate(
						`${location.state.from.pathname}${location.state.from.search}`,
						{ state: { from: location } }
					);
				} else {
					navigate('/listings', { state: { from: location } });
				}
			})
			.catch(rejected => {
				toast.error('Login failed');
			});
	};

	const formStyling = submitAttempted
		? 'needs-validation was-validated'
		: 'needs-validation';

	return (
		<Layout title='World Estate | Login' content='Login page'>
			<ToastContainer />
			<h1 className='display-6 mb-5'>Log into your Account</h1>
			<form className={formStyling} onSubmit={onSubmit}>
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
					Login
				</button>
			</form>
			<p className='mt-5'>
				Don't have an account? <Link to='/register'>Register</Link>
			</p>
		</Layout>
	);
};

export default LoginPage;
