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
		expect(wrapper.find('ul').hasClass('event-details')).toBe(true);
		expect(wrapper.find('span.remove-event')).toHaveLength(1);
		expect(wrapper.find('button').hasClass('delete-button')).toBe(true);
		expect(wrapper.contains(<h2 className="event-name">Hiking</h2>)).toBe(true);
		expect(wrapper.contains(<li><span className="detail-name">Event Date:</span> 01-20-19</li>)).toBe(true);
		expect(wrapper.contains(<li><span className="detail-name">Return Time:</span> 5:30 pm</li>)).toBe(true);
		expect(wrapper.contains(<li><span className="detail-name">Contact Number:</span> 1-333-333-3333</li>)).toBe(true);
		expect(wrapper.contains(<li><span className="detail-name">Description:</span> Hiking Longs Peak</li>)).toBe(true);
	});

	it('should call the onClick prop when the delete button is clicked', () => {
		const onClick = jest.fn();
		let wrapper = shallow(<Event onClick={onClick}/>);
		wrapper.find('.delete-button').simulate('click');
		expect(onClick).toHaveBeenCalled();
	})
})
