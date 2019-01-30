import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	CLEAR_AUTH
} from '../actions/auth';

const initialState = {
	loggedIn: false,
	loading: false,
	name: null,
	username: null,
	token: null
}

export const authReducer = (state=initialState, action) => {
	if(action.type === LOGIN_REQUEST) {
		return Object.assign({}, state, {loading: true});
	}
	else if(action.type === LOGIN_SUCCESS) {
		return Object.assign({}, state, {
			loggedIn: true,
			loading: false, 
			name: action.user.name,
			username: action.user.username, 
			token: action.user.token
		});
	}
	else if(action.type === LOGIN_ERROR) {
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		});
	}
	else if(action.type === SIGNUP_REQUEST) {
		return Object.assign({}, state, {loading: true});
	}
	else if(action.type === SIGNUP_SUCCESS) {
		return Object.assign({}, state, {
			loggedIn: true,
			loading: false,
			name: action.user.name,
			username: action.user.username,
			token: action.user.token
		});
	}
	else if(action.type === SIGNUP_ERROR) {
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		});
	}
	else if(action.type === CLEAR_AUTH) {
		return Object.assign({}, initialState);
	} 
	return state;
}