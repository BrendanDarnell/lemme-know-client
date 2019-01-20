import {
	LOGIN_REQUEST,
	loginRequest,
	LOGIN_SUCCESS,
	loginSuccess,
	LOGIN_ERROR,
	loginError,
	SIGNUP_REQUEST,
	signupRequest,
	SIGNUP_SUCCESS,
	signupSuccess,
	SIGNUP_ERROR,
	signupError,
	CLEAR_AUTH,
	clearAuth,
	login,
	signup,
	logout
} from './auth';

//test synchronous actions
describe('loginRequest', () => {
	it('should return the action', () => {
		let action = loginRequest();
		expect(action.type).toEqual(LOGIN_REQUEST);
	});
});

describe('loginSuccess', () => {
	let data = 'mockUserData'
	it('should return the action', () => {
		let action = loginSuccess(data);
		expect(action.type).toEqual(LOGIN_SUCCESS);
		expect(action.user).toEqual(data);
	});
});

describe('loginError', () => {
	let error = 'mockError'
	it('should return the action', () => {
		let action = loginError(error);
		expect(action.type).toEqual(LOGIN_ERROR);
		expect(action.error).toEqual(error);
	});
});

describe('signupRequest', () => {
	it('should return the action', () => {
		let action = signupRequest();
		expect(action.type).toEqual(SIGNUP_REQUEST);
	});
});

describe('signupSuccess', () => {
	let data = 'mockUserData'
	it('should return the action', () => {
		let action = signupSuccess(data);
		expect(action.type).toEqual(SIGNUP_SUCCESS);
		expect(action.user).toEqual(data);
	});
});

describe('signupError', () => {
	let error = 'mockError'
	it('should return the action', () => {
		let action = signupError(error);
		expect(action.type).toEqual(SIGNUP_ERROR);
		expect(action.error).toEqual(error);
	});
});

describe('clearAuth', () => {
	it('should return the action', () => {
		let action = clearAuth();
		expect(action.type).toEqual(CLEAR_AUTH);
	});	
})

describe('logout', () => {
	let dispatch = jest.fn();
	logout()(dispatch);
	expect(dispatch).toHaveBeenCalledWith({type: CLEAR_AUTH});
});

//test asynchronous actions
describe('login', () => {
	it('should dispatch loginRequest and loginSuccess on successful requests', () => {
		let data = 'mockUserData'
		global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return data;
                }
            })
        );
        let dispatch = jest.fn();
        return login()(dispatch).then(() => {
        	expect(dispatch).toHaveBeenCalledWith(loginRequest());
        	expect(dispatch).toHaveBeenCalledWith(loginSuccess(data));
        	expect(dispatch).toHaveBeenCalledTimes(2);
        });
	});

	it('should dispatch loginRequest and loginError on failed requests', () => {
		let error = {status: 401, statusText: 'UNAUTHORIZED'}
		global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: false,
                json() {
                    return error;
                }
            })
        );
        let dispatch = jest.fn();
        return login()(dispatch).catch((err) => {
        	expect(dispatch).toHaveBeenCalledWith(loginRequest());
        	expect(loginError).toHaveBeenCalled;
        	expect(dispatch).toHaveBeenCalledTimes(2);
        })
	});
});

describe('signup', () => {
	it('should dispatch signupRequest and signupSuccess on successful requests', () => {
		let data = 'mockUserData'
		global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return data;
                }
            })
        );
        let dispatch = jest.fn();
        return signup()(dispatch).then(() => {
        	expect(dispatch).toHaveBeenCalledWith(signupRequest());
        	expect(dispatch).toHaveBeenCalledWith(signupSuccess(data));
        	expect(dispatch).toHaveBeenCalledTimes(2);
        });
	});

	it('should dispatch loginRequest and loginError on failed requests', () => {
		let error = {status: 401, statusText: 'UNAUTHORIZED'}
		global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: false,
                json() {
                    return error;
                }
            })
        );
        let dispatch = jest.fn();
        return signup()(dispatch).catch((err) => {
        	expect(dispatch).toHaveBeenCalledWith(signupRequest());
        	expect(signupError).toHaveBeenCalled;
        	expect(dispatch).toHaveBeenCalledTimes(2);
        })
	});
});




