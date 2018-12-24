function mockApiReq(data) {
	console.log(data);
	const mockApiRes = Object.assign({},{username: data.username},{token: '123abc'});
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			resolve(mockApiRes)},
			3000);
		});
}

export const NEW_EVENT_REQUEST = 'NEW_EVENT_REQUEST';
export const newEventRequest = () => ({
	type: NEW_EVENT_REQUEST
});

export const NEW_EVENT_SUCCESS = 'NEW_EVENT_SUCCESS';
export const newEventSuccess = (data) => ({
	type: NEW_EVENT_SUCCESS,
	data
});

export const NEW_EVENT_ERROR = 'NEW_EVENT_ERROR';
export const newEventError = (error) => ({
	type: NEW_EVENT_ERROR,
	error
});

export const newEvent = (username, token, data) => dispatch => {
	dispatch(loginRequest());
	return(
		mockApiReq({username, password})
		.then(res => dispatch(loginSuccess(res)))
		.catch(error => dispatch(loginError(error)))
	);
}