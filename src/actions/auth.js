// use redux-form SubmissionError to display async errors on form submission
import {SubmissionError} from 'redux-form';

import {saveCredentials, clearCredentials} from '../local-storage';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../utils';


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = () => ({
	type: LOGIN_REQUEST
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (user) => ({
	type: LOGIN_SUCCESS,
	user
});

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (error) => ({
	type: LOGIN_ERROR,
	error
});

export const login = (data) => dispatch => {
	dispatch(loginRequest());
	return(
		fetch(`${API_BASE_URL}/login`, {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
		})
		.then(res => normalizeResponseErrors(res))
		.then(res =>  {
			return res.json()
		})
		.then(res => {
			dispatch(loginSuccess(res));
			return res;
		})
		.then(credentials => saveCredentials(credentials))
		.catch(err => {
			dispatch(loginError(err));
			if(err.message) {
				return Promise.reject(new SubmissionError({_error: err.message}));
			}
			else {
				let message = 'Sorry, there was an error logging into your account.'
				return Promise.reject(new SubmissionError({_error: message}))		
			}	
		})
	);
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const signupRequest = () => ({
	type: SIGNUP_REQUEST
});

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = (user) => ({
	type: SIGNUP_SUCCESS,
	user
});

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const signupError = (error) => ({
	type: SIGNUP_ERROR,
	error
});

export const signup = (data) => dispatch => {
	dispatch(signupRequest());
	return(
		fetch(`${API_BASE_URL}/signup`, {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
		})
		.then(res => normalizeResponseErrors(res))
		.then(res =>  {
			return res.json()
		})
		.then(res => {
			dispatch(signupSuccess(res));
			return res;
		})
		.then(credentials => saveCredentials(credentials))
		.catch(err => { 
			dispatch(signupError(err))
			if(err.message) {
				return Promise.reject(new SubmissionError({_error: err.message}));
			}
			else {
				let message = 'Sorry, there was an error creating your account.'
				return Promise.reject(new SubmissionError({_error: message}));		
			}	
		})
	);
}

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
	type: CLEAR_AUTH
})

export const logout = () => dispatch => {
	clearCredentials();
	dispatch(clearAuth());
} 