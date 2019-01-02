import {SubmissionError} from 'redux-form';

import {convertToUTC} from '../utils';

function mockApiReq(data) {
	console.log('mock reqest', data);
	const mockApiRes = Object.assign({},{username: data.username},{token: '123abc'}, {event: data.data});
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
export const newEventSuccess = (newEvent) => ({
	type: NEW_EVENT_SUCCESS,
	newEvent
});

export const NEW_EVENT_ERROR = 'NEW_EVENT_ERROR';
export const newEventError = (error) => ({
	type: NEW_EVENT_ERROR,
	error
});

export const newEvent = (username, token, data) => dispatch => {
	dispatch(newEventRequest());

	return(
		convertToUTC('12-25-19', '4:45')
		.then(res => mockApiReq({username, token, data}))
		.then(res => dispatch(newEventSuccess(res.event)))
		.catch(err => {
			dispatch(newEventError(err));
			console.log(err.field);
			return Promise.reject(new SubmissionError({_error: "wrong password"}));
			
		})
	);
}

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const deleteEventRequest = () => ({
	type: DELETE_EVENT_REQUEST
});

export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const deleteEventSuccess = (updatedEvents) => ({
	type: DELETE_EVENT_SUCCESS,
	updatedEvents
});

export const DELETE_EVENT_ERROR = 'DELETE_EVENT_ERROR';
export const deleteEventError = (error) => ({
	type: DELETE_EVENT_ERROR,
	error
});

export const deleteEvent = (username, token, eventId) => dispatch => {
	dispatch(deleteEventRequest());
	console.log(eventId);
	return(
		mockApiReq({username, token, eventId})
		.then(res => dispatch(deleteEventSuccess(res)))
		.catch(error => dispatch(deleteEventError(error)))
	);
}

