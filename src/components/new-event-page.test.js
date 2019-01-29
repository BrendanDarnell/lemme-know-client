import React from 'react';
import {shallow, mount} from 'enzyme';

import {NewEventPage} from './new-event-page';

const mockNewEventAction = {
	type: 'NEW_EVENT'
};

jest.mock('../actions/events', () => Object.assign({},
	require.requireActual('../actions/events'),
	{
		newEvent: jest.fn().mockImplementation(() => mockNewEventAction)
	}
	)
);

describe('<NewEventPage/>', () => {
	it('should render without crashing', () => {
		const props = {
			loggedIn: true,
			name: 'Mock User',
			username: 'mock-user',
			token: 'mockToken',
			loading: false,
			events: ['newEvent1', 'newEvent2']
		}
		const dispatch = jest.fn();
		let wrapper = shallow(<NewEventPage {...props} dispatch={dispatch}/>);
	});

	it('should call componentDidUpdate when a new event is added', () => {
		const props = {
			loggedIn: true,
			name: 'Mock User',
			username: 'mock-user',
			token: 'mockToken',
			loading: false,
			events: ['newEvent1'],
			history: []
		}
		const dispatch = jest.fn();
		let wrapper = shallow(<NewEventPage {...props} dispatch={dispatch}/>);
		wrapper.setProps({events: ['newEvent1', 'newEvent2']}).update();
		expect('componentDidUpdate').toHaveBeenCalled;
	});

	it('should redirect to landing page if not logged in', () => {
		const props = {
			loggedIn: false,
			name: 'Mock User',
			username: 'mock-user',
			token: 'mockToken',
			loading: false,
			events: ['newEvent1'],
		}
		const dispatch = jest.fn();
		let wrapper = shallow(<NewEventPage {...props} dispatch={dispatch}/>);
		expect(wrapper.find('Redirect')).toHaveLength(1);
	});

	it('should redirect to landing page if missing token', () => {
		const props = {
			loggedIn: true,
			name: 'Mock User',
			username: 'mock-user',
			token: null,
			loading: false,
			events: ['newEvent1'],
		}
		const dispatch = jest.fn();
		let wrapper = shallow(<NewEventPage {...props} dispatch={dispatch}/>);
		expect(wrapper.find('Redirect')).toHaveLength(1);
	});

	it('should display a spinner if loading', () => {
		const props = {
			loggedIn: true,
			name: 'Mock User',
			username: 'mock-user',
			token: 'mockToken',
			loading: true,
			events: ['newEvent1', 'newEvent2']
		}
		const dispatch = jest.fn();
		let wrapper = shallow(<NewEventPage {...props} dispatch={dispatch}/>);
		expect(wrapper.find('div').hasClass('spinner')).toBe(true);
		expect(wrapper.find('Loader')).toHaveLength(1);
	});

	it('should render an event form if logged in and has token', () => {
		const props = {
			loggedIn: true,
			name: 'Mock User',
			username: 'mock-user',
			token: 'mockToken',
			loading: false,
			events: ['newEvent1', 'newEvent2']
		}
		const dispatch = jest.fn();
		let wrapper = shallow(<NewEventPage {...props} dispatch={dispatch}/>);
		expect(wrapper.find('div').hasClass('new-event-page')).toBe(true);			
	});

	it('should dispatch the newEvent action when handleNewEvent is called', () => {
		const props = {
			loggedIn: true,
			name: 'Mock User',
			username: 'mock-user',
			token: 'mockToken',
			loading: false,
			events: ['newEvent1', 'newEvent2']
		}
		const mockData = {mockData: 'mockData'};
		const dispatch = jest.fn();
		let wrapper = shallow(<NewEventPage {...props} dispatch={dispatch}/>);
		let instance = wrapper.instance();
		instance.handleNewEvent(mockData);
		expect(dispatch).toHaveBeenCalledWith(mockNewEventAction);		
	});
})