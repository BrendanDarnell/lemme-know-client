import {saveCredentials, clearCredentials} from '../local-storage';


function mockApiReq(data) {
	console.log(data);
	const mockApiRes = Object.assign({},{username: data.username},{token: '123abc'});
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			resolve(mockApiRes)},
			3000);
		});
}

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

export const login = (username, password) => dispatch => {
	dispatch(loginRequest());
	return(
		mockApiReq({username, password})
		.then(res => {
			dispatch(loginSuccess(res));
			return res;
		})
		.then(credentials => saveCredentials(credentials))
		.catch(error => dispatch(loginError(error)))
	);
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const signupRequest = () => ({
	type: LOGIN_REQUEST
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
		mockApiReq(data)
		.then(res => {
			dispatch(signupSuccess(res));
			return res;
		})
		.then(credentials => saveCredentials(credentials))
		.catch(error => dispatch(signupError(error)))
	);
}