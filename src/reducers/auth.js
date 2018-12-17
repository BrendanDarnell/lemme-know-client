import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR
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
		return Object.assign({}, state, {loading: true})
	}
	else if(action.type === LOGIN_SUCCESS) {
		console.log('login success');
		console.log(action);
		return Object.assign({}, state, {
			loading: false, 
			username: action.username, 
			token: action.token
		});
	}
	else if(action.type === LOGIN_ERROR) {
		console.log('login error');
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		})
	}
	return state;
}