import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { apiSlice } from 'features/api/apiSlice';
import { Provider } from 'react-redux';
import App from './App';

import { store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
