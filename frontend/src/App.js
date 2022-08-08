import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useVerifyMutation } from 'features/auth/authApiSlice';
import { setAuth } from 'features/auth/authSlice';

import RequireAuth from 'features/auth/RequireAuth';

import ContactPage from 'containers/ContactPage';
import HomePage from 'containers/HomePage';
import ListingDetailPage from 'features/listings/ListingDetailPage';
import ListingsPage from 'features/listings/ListingsPage';
import SearchPage from 'features/listings/SearchPage';
import LoginPage from 'features/auth/LoginPage';
import RegisterPage from 'features/auth/RegisterPage';

const App = () => {
	const dispatch = useDispatch();
	const { access, refresh } = useSelector(state => state.auth);

	const [verify] = useVerifyMutation();

	const effectRan = useRef(false);

	useEffect(() => {
		if (effectRan.current === false) {
			const verifyToken = async () => {
				if (access && refresh) {
					await verify(access)
						.unwrap()
						.then(fulfilled => {
							dispatch(setAuth({ access, refresh }));
						})
						.catch(rejected => {});
				}
			};

			verifyToken();

			return () => {
				effectRan.current = true;
			};
		}
	}, []);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/contact' element={<ContactPage />} />
				<Route path='/listings' element={<ListingsPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/search' element={<SearchPage />} />
				<Route element={<RequireAuth />}>
					<Route path='/listings/:slug' element={<ListingDetailPage />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
