import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR
} from '../actions/auth';


const initialState = {
	loggedIn: false,
	loading: false,
	username: null,
	token: null
}

export const authReducer = (state=initialState, action) => {
	if(action.type === LOGIN_REQUEST) {
		console.log('login request');
		return Object.assign({}, state, {loading: true});
	}
	else if(action.type === LOGIN_SUCCESS) {
		console.log('login success');
		console.log(action);
		return Object.assign({}, state, {
			loggedIn: true,
			loading: false, 
			username: action.user.username, 
			token: action.user.token
		});
	}
	else if(action.type === LOGIN_ERROR) {
		console.log('login error');
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		});
	}
	else if(action.type === SIGNUP_REQUEST) {
		console.log('signup request');
		return Object.assign({}, state, {loading: true});
	}
	else if(action.type === SIGNUP_SUCCESS) {
		console.log('signup success');
		return Object.assign({}, state, {
			loggedIn: true,
			loading: false,
			username: action.user.username,
			token: action.user.token
		});
	}
	else if (action.type === SIGNUP_ERROR) {
		console.log('login error');
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		});
	}
	return state;
}