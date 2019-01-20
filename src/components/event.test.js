import React from 'react';
import {shallow} from 'enzyme';

import Event from './event';


describe('<Event/>', () => {
	it('should render without crashing', () => {
		let wrapper = shallow(<Event/>);
	});

	it('should render proper elements and information provided by props', () => {
		const props = {
			eventName: 'Hiking',
			date: '01-20-19',
			returnTime: '5:30',
			amOrPm: 'pm',
			contactNumber: '1-333-333-3333',
			description: 'Hiking Longs Peak'
		}
		let wrapper = shallow(<Event {...props}/>);
		expect(wrapper.find('div').hasClass('event-div')).toBe(true);
		expect(wrapper.find('ul').hasClass('event-list')).toBe(true);
		expect(wrapper.find('span').hasClass('remove-event')).toBe(true);
		expect(wrapper.find('button').hasClass('delete-button')).toBe(true);
		expect(wrapper.contains(<h2 className="event-name">Hiking</h2>)).toBe(true);
		expect(wrapper.contains(<li>Event Date: 01-20-19</li>)).toBe(true);
		expect(wrapper.contains(<li>Return Time: 5:30 pm</li>)).toBe(true);
		expect(wrapper.contains(<li>Contact Number: 1-333-333-3333</li>)).toBe(true);
		expect(wrapper.contains(<li>Description: Hiking Longs Peak</li>)).toBe(true);
	});

	it('should call the onClick prop when the delete button is clicked', () => {
		const onClick = jest.fn();
		let wrapper = shallow(<Event onClick={onClick}/>);
		wrapper.find('.delete-button').simulate('click');
		expect(onClick).toHaveBeenCalled();
	})
})
