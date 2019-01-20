import {authReducer} from './auth';

import {
	loginRequest, 
	loginSuccess,
	loginError,
	signupRequest,
	signupSuccess,
	signupError,
	clearAuth
} from '../actions/auth';

const initialState = {
	loggedIn: false,
	loading: false,
	name: null,
	username: null,
	token: null
}

const loadingState = {
	loggedIn: false,
	loading: true,
	name: null,
	username: null,
	token: null
}

const mockUser = {
	name: 'mockUser',
	username: 'mockUsername',
	token: 'mockToken'
}

const loggedInState = {
	loggedIn: true,
	loading: false,
	name: 'mockUser',
	username: 'mockUsername',
	token: 'mockToken'
}

const errorState =  {
	loggedIn: false,
	loading: false,
	name: null,
	username: null,
	token: null,
	error: 'mockError'
}

describe('authReducer', () => {
	it('Should set the initial state when nothing is passed in', () => {
        const state = authReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual(initialState);
    });
	
	it('should change loading value to true on loginRequest', () => {
		const state = authReducer(initialState, loginRequest());
		expect(state).toEqual(loadingState);
	});

	it('should store user credentials on loginSuccess and change loading to false', () => {
		const state = authReducer(loadingState, loginSuccess(mockUser));
		expect(state).toEqual(loggedInState);
	});

	it('should add error key and value on loginError', () => {
		const state = authReducer(loadingState, loginError('mockError'));
		expect(state).toEqual(errorState);
	});

	it('should change loading value to true on signupRequest', () => {
		const state = authReducer(initialState, signupRequest());
		expect(state).toEqual(loadingState);
	});

	it('should store user credentials on signupSuccess and change loading to false', () => {
		const state = authReducer(loadingState, signupSuccess(mockUser));
		expect(state).toEqual(loggedInState);
	});

	it('should add error key and value on signupError', () => {
		const state = authReducer(loadingState, signupError('mockError'));
		expect(state).toEqual(errorState);
	});

	it('should turn back to initialState when clearAuth is passed in', () => {
		const state = authReducer(loggedInState, clearAuth());
		expect(state).toEqual(initialState);
	});
})