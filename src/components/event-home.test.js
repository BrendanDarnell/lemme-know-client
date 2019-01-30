import React from 'react';
import {shallow, mount} from 'enzyme';

import {EventHome} from './event-home';

const mockFetchEventsAction = {
	type: 'FETCH_EVENTS'
};

const mockDeleteEventAction = {
	type: 'DELETE_EVENT'
};

jest.mock('../actions/events', () => Object.assign({},
	require.requireActual('../actions/events'),
	{
		fetchEvents: jest.fn().mockImplementation(() => mockFetchEventsAction),
		deleteEvent: jest.fn().mockImplementation(() => mockDeleteEventAction)
	}
	)
);

describe('<EventHome/>', () => {
	it('should render without crashing', () => {
		let props = {
			'username': 'mockUsername',
			'events': ['mockEvent1', 'mockEvent2'],
			'token': 'mockToken',
			'error': null,
			'loggedIn': true
		}
		let wrapper = shallow(<EventHome {...props}/>);
	});
	
	it('should dispatch fetchEvents on mount if no events are loaded', () => {
		let props = {
			'username': 'mockUsername',
			'events': [],
			'token': 'mockToken',
			'error': null,
			'loggedIn': true
		}	
		const dispatch = jest.fn();
		let wrapper = shallow(<EventHome {...props} dispatch={dispatch}/>);
		expect(dispatch).toHaveBeenCalledWith(mockFetchEventsAction);
	});
	
	it('should not dispact fetchEvents on mount if events are already loaded', () => {
		let props = {
			'username': 'mockUsername',
			'events': ['mockEvent1', 'mockEvent2'],
			'token': 'mockToken',
			'error': null,
			'loggedIn': true
		}	
		const dispatch = jest.fn();
		let wrapper = shallow(<EventHome {...props} dispatch={dispatch}/>);
		expect(dispatch).not.toHaveBeenCalled;		
	});

	it('should redirect to landing page if not logged in', () => {
		let props = {
			'username': null,
			'events': [],
			'token': 'mockToken',
			'error': null,
			'loggedIn': false
		}	
		const dispatch = jest.fn();
		let wrapper = shallow(<EventHome {...props} dispatch={dispatch}/>);	
		expect(wrapper.find('Redirect')).toHaveLength(1);
	});

	it('should redirect to landing page if missing token', () => {
		let props = {
			'username': null,
			'events': [],
			'token': null,
			'error': null,
			'loggedIn': true
		}	
		const dispatch = jest.fn();
		let wrapper = shallow(<EventHome {...props} dispatch={dispatch}/>);	
		expect(wrapper.find('Redirect')).toHaveLength(1);
	});

	it('should display errors if any exist', () => {
		let props = {
			'username': 'mockUsername',
			'events': ["mockEvent1", "mockEvent2"],
			'token': "mockToken",
			'error': {message: 'mock error message'},
			'loggedIn': true
		}	
		const dispatch = jest.fn();
		let wrapper = shallow(<EventHome {...props} dispatch={dispatch}/>);
		expect(wrapper.contains(<div className="events-error event-home">mock error message</div>)).toBe(true);		
	});

	it('should display no event message if the user does not have any events', ()=> {
		let props = {
			'username': 'mockUsername',
			'events': [],
			'token': "mockToken",
			'error': null,
			'loggedIn': true
		}	
		const dispatch = jest.fn();
		let wrapper = shallow(<EventHome {...props} dispatch={dispatch}/>);
		expect(wrapper.find('div').hasClass('no-events')).toBe(true);		
	})

	it('should render a list of events if logged in and no errors', () => {
		let props = {
			'username': 'mockUsername',
			'events': ["mockEvent1", "mockEvent2"],
			'token': "mockToken",
			'error': null,
			'loggedIn': true
		}	
		const dispatch = jest.fn();
		let wrapper = shallow(<EventHome {...props} dispatch={dispatch}/>);
		expect(wrapper.find('ul').hasClass('event-list')).toBe(true);
		expect(wrapper.find('Event')).toHaveLength(2);
		expect(wrapper.find('li')).toHaveLength(2);	
	});
	
	it('should dispatch deleteEvent when delete button is clicked', () => {
		let props = {
			'username': 'mockUsername',
			'events': ["mockEvent1"],
			'token': "mockToken",
			'error': null,
			'loggedIn': true
		}
		const dispatch = jest.fn();
		let wrapper = mount(<EventHome {...props} dispatch={dispatch}/>);
		wrapper.find('.delete-button').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(mockDeleteEventAction);	
	});
})