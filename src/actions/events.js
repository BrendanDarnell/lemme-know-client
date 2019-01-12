import {SubmissionError} from 'redux-form';

import {convertToUtc, normalizeResponseErrors} from '../utils';
import {API_BASE_URL} from '../config';

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

export const newEvent = (data) => dispatch => {
	dispatch(newEventRequest());
	console.log(data.date, data.returnTime+data.amOrPm);
	return(
		convertToUtc(data.date, data.returnTime +' '+ data.amOrPm)
		.then(utcDateTime => {
			data.utcDateTime = utcDateTime;
			// return data;
		})
		.then(() => {
			console.log('new event request', data);
			return fetch(`${API_BASE_URL}/events`, {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
			});
		})
		.then(res => normalizeResponseErrors(res))
		.then(res =>  {
			console.log(res);
			return res.json();
		})
		.then(res => dispatch(newEventSuccess(res)))
		.catch(err => {
			dispatch(newEventError(err));
			console.log(err.message);
			if(err.message) {
				return Promise.reject(new SubmissionError({_error: err.message}));
			}
			else {
				let message = 'Sorry, there was an error creating your event.'
				return Promise.reject(new SubmissionError({_error: message}))		
			}	
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

