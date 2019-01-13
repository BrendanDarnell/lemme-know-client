import {
	LOAD_EVENTS,
	NEW_EVENT_REQUEST,
	NEW_EVENT_SUCCESS,
	NEW_EVENT_ERROR,
	DELETE_EVENT_REQUEST,
	DELETE_EVENT_SUCCESS,
	DELETE_EVENT_ERROR

} from '../actions/events';

// const event1 = {
// 	id: 1,
// 	name: 'Hiking',
// 	date: '12-20-18',
// 	returnTime: '18:30',
// 	description: 'Hiking to diamond lakes in Indian Peaks Wilderness Area'
// }

// const event2 = {
// 	id: 2,
// 	name: 'Running',
// 	date: '12-25-18',
// 	returnTime: '5:30',
// 	description: 'Going for a quick run to Olde Town Arvada and back'
// }

const initialState = {
	loading: false,
	events: [],
	error: null
}


export const eventsReducer = (state=initialState, action) => {
	if(action.type === LOAD_EVENTS) {
		console.log('load events', action);
		return Object.assign({}, state, {
			events: action.events,
			error: action.err
		});
	}
	else if(action.type === NEW_EVENT_REQUEST) {
		console.log('event request');
		return Object.assign({}, state, {
			loading: true,
			error: null
		});
	}
	else if(action.type === NEW_EVENT_SUCCESS) {
		console.log('event success');
		console.log(action);
		return Object.assign({}, state, {
			loading: false, 
			events: action.updatedEvents,
			error: null
		});
	}
	else if(action.type === NEW_EVENT_ERROR) {
		console.log('event error', action.error);
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		});
	}
	else if(action.type === DELETE_EVENT_REQUEST) {
		console.log('delete request');
		return Object.assign({}, state, {
			loading: true,
			error: null
		});
	}
	else if(action.type === DELETE_EVENT_SUCCESS) {
		console.log('delete success');
		console.log(action);
		return Object.assign({}, state, {
			loading: false, 
			events: [],
			error: null
		});
	}
	else if(action.type === DELETE_EVENT_ERROR) {
		console.log('delete error', action.error);
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		});
	}
	return state;
}