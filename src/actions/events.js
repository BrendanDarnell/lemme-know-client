// use redux-form SubmissionError to display async errors on form submission
import {SubmissionError} from 'redux-form';

import {logout} from './auth';
import {convertToUtc, normalizeResponseErrors} from '../utils';
import {API_BASE_URL} from '../config';

export const LOAD_EVENTS = 'LOAD_EVENTS';
export const loadEvents = (events, err) => ({
	type: LOAD_EVENTS,
	events,
	err
});

export const fetchEvents = (username, token) => dispatch => {
	return (
		fetch(`${API_BASE_URL}/events/${username}`, {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
		})
		.then(res => normalizeResponseErrors(res))
		.then(res =>  {
			return res.json();
		})
		.then(events => dispatch(loadEvents(events, null)))
		.catch(err => {
			dispatch(loadEvents(null, err))
		})
	)
}

export const NEW_EVENT_REQUEST = 'NEW_EVENT_REQUEST';
export const newEventRequest = () => ({
	type: NEW_EVENT_REQUEST
});

export const NEW_EVENT_SUCCESS = 'NEW_EVENT_SUCCESS';
export const newEventSuccess = (updatedEvents) => ({
	type: NEW_EVENT_SUCCESS,
	updatedEvents
});

export const NEW_EVENT_ERROR = 'NEW_EVENT_ERROR';
export const newEventError = (error) => ({
	type: NEW_EVENT_ERROR,
	error
});

export const newEvent = (data) => dispatch => {
	dispatch(newEventRequest());
	return(
		convertToUtc(data.date, data.returnTime +' '+ data.amOrPm)
		.then(utcDateTime => {
			data.utcDateTime = utcDateTime;
		})
		.then(() => {
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
			return res.json();
		})
		.then(updatedEvents => dispatch(newEventSuccess(updatedEvents)))
		.catch(err => {
			dispatch(newEventError(err));
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

export const deleteEvent = (token, eventId) => dispatch => {
	dispatch(deleteEventRequest());
	return(
		fetch(`${API_BASE_URL}/events/${eventId}`, {
			method: 'DELETE',
			headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
		})
		.then(res => normalizeResponseErrors(res))
		.then(res =>  {
			return res.json();
		})		
		.then(updatedEvents => dispatch(deleteEventSuccess(updatedEvents)))
		.catch(err => {
			if(err.status === 401) {
				dispatch(logout());
			}
			else {
				dispatch(deleteEventError(err));
			}
		})
	);
}

