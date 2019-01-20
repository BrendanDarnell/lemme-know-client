import {
	LOAD_EVENTS,
	loadEvents,
	fetchEvents,
	NEW_EVENT_REQUEST,
	newEventRequest,
	NEW_EVENT_SUCCESS,
	newEventSuccess,
	NEW_EVENT_ERROR,
	newEventError,
	newEvent,
	DELETE_EVENT_REQUEST,
	deleteEventRequest,
	DELETE_EVENT_SUCCESS,
	deleteEventSuccess,
	DELETE_EVENT_ERROR,
	deleteEventError,
	deleteEvent
} from './events';

jest.dontMock('moment');
jest.dontMock('../utils');

let mockEvent = {	
	eventName: 'Hiking',
	date: '12-20-18',
	returnTime: '5:30',
	amOrPm: 'pm',
	contactNumber: '1-333-333-3333',
	description: 'Hiking to diamond lakes in Indian Peaks Wilderness Area'
}

//test synchronous actions
describe('loadEvents', () => {
	it('should return the action', () => {
		let action = loadEvents('mockEvent', 'mockError');
		expect(action.type).toEqual(LOAD_EVENTS);
		expect(action.events).toEqual('mockEvent');
		expect(action.err).toEqual('mockError');
	});
});

describe('newEventRequest', () => {
	it('should return the action', () => {
		let action = newEventRequest();
		expect(action.type).toEqual(NEW_EVENT_REQUEST);
	});
});

describe('newEventSuccess', () => {
	it('should return the action', () => {
		let updatedEvents = ['event1','event2'];
		let action = newEventSuccess(updatedEvents);
		expect(action.type).toEqual(NEW_EVENT_SUCCESS);
		expect(action.updatedEvents).toEqual(updatedEvents);
	});
});

describe('newEventError', () => {
	it('should return the action', () => {
		let err = 'mockError';
		let action = newEventError(err);
		expect(action.type).toEqual(NEW_EVENT_ERROR);
		expect(action.error).toEqual(err);
	});
});

describe('deleteEventRequest', () => {
	it('should return the action', () => {
		let action = deleteEventRequest();
		expect(action.type).toEqual(DELETE_EVENT_REQUEST);
	});
});

describe('deleteEventSuccess', () => {
	it('should return the action', () => {
		let updatedEvents = ['event1','event2'];
		let action = deleteEventSuccess(updatedEvents);
		expect(action.type).toEqual(DELETE_EVENT_SUCCESS);
		expect(action.updatedEvents).toEqual(updatedEvents);
	});
});

describe('deleteEventError', () => {
	it('should return the action', () => {
		let err = 'mockError';
		let action = deleteEventError(err);
		expect(action.type).toEqual(DELETE_EVENT_ERROR);
		expect(action.error).toEqual(err);
	});
});

//test async actions
describe('fetchEvents', () => {
	it('should dispatch loadEvents(events,null) on successful requests', () => {
		const convertToUtc = jest.fn(() => '01-30-19 2:30pm')
		let events = ['event1','event2'];
		global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return events;
                }
            })
        );
        let dispatch = jest.fn();
        return fetchEvents()(dispatch).then(() => {
        	expect(dispatch).toHaveBeenCalledWith(loadEvents(events, null));
        	expect(dispatch).toHaveBeenCalledTimes(1);
        });
	});

	it('should dispatch loadEvents(null, error) on failed requests', () => {
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
        return fetchEvents()(dispatch).catch((err) => {;
        	expect(loadEvents).toHaveBeenCalled;
        	expect(dispatch).toHaveBeenCalledTimes(1);
        })
	});
});

describe('newEvent', () => {
	it('should dispatch newEventRequest and newEventSuccess on successful requests', () => {
		let updatedEvents = ['event1','event2'];
		global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return updatedEvents;
                }
            })
        );
        let dispatch = jest.fn();
        return newEvent(mockEvent)(dispatch).then(() => {
        	expect(dispatch).toHaveBeenCalledWith(newEventRequest());
        	expect(dispatch).toHaveBeenCalledWith(newEventSuccess(updatedEvents));
        	expect(dispatch).toHaveBeenCalledTimes(2);
        });
	});

	it('should dispatch newEventRequest and newEventError on failed requests', () => {
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
        return newEvent(mockEvent)(dispatch).catch((err) => {
        	expect(dispatch).toHaveBeenCalledWith(newEventRequest());
        	expect(newEventError).toHaveBeenCalled;
        	expect(dispatch).toHaveBeenCalledTimes(2);
        })
	});
});

describe('newEvent', () => {
	it('should dispatch deleteEventRequest and deleteEventSuccess on successful requests', () => {
		let updatedEvents = ['event1','event2'];
		global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return updatedEvents;
                }
            })
        );
        let dispatch = jest.fn();
        return deleteEvent()(dispatch).then(() => {
        	expect(dispatch).toHaveBeenCalledWith(deleteEventRequest());
        	expect(dispatch).toHaveBeenCalledWith(deleteEventSuccess(updatedEvents));
        	expect(dispatch).toHaveBeenCalledTimes(2);
        });
	});

	it('should dispatch deleteEventRequest and deleteEventError on failed requests', () => {
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
        return deleteEvent()(dispatch).catch((err) => {
        	expect(dispatch).toHaveBeenCalledWith(deleteEventRequest());
        	expect(deleteEventError).toHaveBeenCalled;
        	expect(dispatch).toHaveBeenCalledTimes(2);
        })
	});
});



