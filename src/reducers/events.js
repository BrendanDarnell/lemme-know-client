import {
	LOAD_EVENTS,
	NEW_EVENT_REQUEST,
	NEW_EVENT_SUCCESS,
	NEW_EVENT_ERROR,
	DELETE_EVENT_REQUEST,
	DELETE_EVENT_SUCCESS,
	DELETE_EVENT_ERROR

} from '../actions/events';

const initialState = {
	loading: false,
	events: [],
	error: null
}

export const eventsReducer = (state=initialState, action) => {
	if(action.type === LOAD_EVENTS) {
		return Object.assign({}, state, {
			events: action.events,
			error: action.err
		});
	}
	else if(action.type === NEW_EVENT_REQUEST) {
		return Object.assign({}, state, {
			loading: true,
			error: null
		});
	}
	else if(action.type === NEW_EVENT_SUCCESS) {
		return Object.assign({}, state, {
			loading: false, 
			events: action.updatedEvents,
			error: null
		});
	}
	else if(action.type === NEW_EVENT_ERROR) {
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		});
	}
	else if(action.type === DELETE_EVENT_REQUEST) {
		return Object.assign({}, state, {
			loading: true,
			error: null
		});
	}
	else if(action.type === DELETE_EVENT_SUCCESS) {
		return Object.assign({}, state, {
			loading: false, 
			events: action.updatedEvents,
			error: null
		});
	}
	else if(action.type === DELETE_EVENT_ERROR) {
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		});
	}
	return state;
}