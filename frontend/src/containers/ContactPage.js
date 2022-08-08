import { useState } from 'react';
import Layout from 'components/Layout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
	const [formData, setFormData] = useState({
		first_name: '',
		email: '',
		message: '',
	});
	const [loading, setLoading] = useState(false);

	const { first_name, email, message } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();

		const body = JSON.stringify({ first_name, email, message });

		setLoading(true);
		const res = await fetch('/api/contact/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

		const data = await res.json();
		setLoading(false);

		if (res.status === 200) {
			setFormData({
				first_name: '',
				email: '',
				message: '',
			});
			toast.success(data.success);
		} else {
			if (data.first_name) {
				toast.error(`First Name: ${data.first_name[0]}`);
			} else if (data.email) {
				toast.error(`Email: ${data.email[0]}`);
			} else if (data.message) {
				toast.error(`Message: ${data.message[0]}`);
			} else {
				toast.error(data.error);
			}
		}
	};

	return (
		<Layout title='World Estate | Contact' content='Contact page'>
			<ToastContainer />
			<h1 className='display-6 mb-5'>Contact Us</h1>
			<form onSubmit={onSubmit}>
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
				</div>
				<div className='form-group mt-3'>
					<label className='form-label' htmlFor='message'>
						Message
					</label>
					<textarea
						className='form-control'
						rows='6'
						name='message'
						onChange={onChange}
						value={message}
						required
					></textarea>
				</div>
				{loading ? (
					<div className='spinner-border text-primary mt-4' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				) : (
					<button className='btn btn-primary mt-4'>Send Message</button>
				)}
			</form>
		</Layout>
	);
};

export default ContactPage;
