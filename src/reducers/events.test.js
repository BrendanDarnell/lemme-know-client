import {eventsReducer} from './events';

import {
	loadEvents,
	newEventRequest,
	newEventSuccess,
	newEventError,
	deleteEventRequest,
	deleteEventSuccess,
	deleteEventError
} from '../actions/events';

const event1 = {
	id: 1,
	name: 'Hiking',
	date: '12-20-18',
	returnTime: '18:30',
	description: 'Hiking to diamond lakes in Indian Peaks Wilderness Area'
}

const event2 = {
	id: 2,
	name: 'Running',
	date: '12-25-18',
	returnTime: '5:30',
	description: 'Going for a quick run to Olde Town Arvada and back'
}

const initialState = {
	loading: false,
	events: [],
	error: null
}

describe('eventsReducer', () => {
	it('Should set the initial state when nothing is passed in', () => {
        const state = eventsReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual(initialState);
    });
	
	it('should load events if events are passed to loadEvents', () => {
		const state = eventsReducer(initialState, loadEvents([event1,event2], null));
		expect(state).toEqual({
			loading: false,
			events: [event1,event2],
			error: null
		});
	});

	it('should load errors if errors are passed to loadEvents', () => {
		const state = eventsReducer(initialState, loadEvents(null, 'mockError'));
		expect(state).toEqual({
			loading: false,
			events: null,
			error: 'mockError'
		});
	});

	it('should change loading to true on newEventRequest', () => {
		const state = eventsReducer(initialState, newEventRequest());
		expect(state).toEqual({
			loading: true,
			events: [],
			error: null
		});
	});

	it('should change loading to false and add new event on newEventSuccess', () => {
		let state = eventsReducer(initialState, newEventSuccess(event1));
		state = eventsReducer(state, newEventSuccess([event1, event2]));
		expect(state).toEqual({
			loading: false,
			events: [event1, event2],
			error: null
		});
	});

	it('should change loading to false and add error on newEventError', () => {
		const state = eventsReducer(initialState, newEventError('mockError'));
		expect(state).toEqual({
			loading: false,
			events: [],
			error: 'mockError'
		});
	});

	it('should change loading to true on deleteEventRequest', () => {
		const state = eventsReducer(initialState, newEventRequest());
		expect(state).toEqual({
			loading: true,
			events: [],
			error: null
		});
	});

	it('should update events on deleteEventSuccess', () => {
		let state = eventsReducer(initialState, newEventSuccess([event1, event2]));
		state = eventsReducer(state, deleteEventSuccess([event1]));
		expect(state).toEqual({
			loading: false,
			events: [event1],
			error: null
		});
	});

	it('should change loading to false and add error on deleteEventError', () => {
		const state = eventsReducer(initialState, deleteEventError('mockError'));
		expect(state).toEqual({
			loading: false,
			events: [],
			error: 'mockError'
		});
	});
})