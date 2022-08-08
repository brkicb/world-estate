import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	access: localStorage.getItem('access'),
	refresh: localStorage.getItem('refresh'),
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			localStorage.setItem('access', action.payload.access);
			localStorage.setItem('refresh', action.payload.refresh);

			state.isAuthenticated = true;
			state.access = action.payload.access;
			state.refresh = action.payload.refresh;
		},
		logout: state => {
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');

			state.access = null;
			state.refresh = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
