import React from 'react';
import {shallow, mount} from 'enzyme';

import {EventForm} from './event-form';


describe('<EventForm/>', () => {
	it('should render without crashing', () => {
		let handleSubmit = jest.fn();
		let wrapper = shallow(<EventForm handleSubmit={handleSubmit}/>);
	});

	it('should render all Field components', () => {
		let handleSubmit = jest.fn();
		let wrapper = shallow(<EventForm handleSubmit={handleSubmit}/>);
		expect(wrapper.find('Field')).toHaveLength(7);
		expect(wrapper.find('[name="eventName"]')).toHaveLength(1);
		expect(wrapper.find('[name="date"]')).toHaveLength(1);
		expect(wrapper.find('[name="returnTime"]')).toHaveLength(1);
		expect(wrapper.find('[name="amOrPm"]')).toHaveLength(2);
		expect(wrapper.find('[name="contactNumber"]')).toHaveLength(1);
		expect(wrapper.find('[name="description"]')).toHaveLength(1);
	})

	it('should call handleSubmit on form submission', () => {
		let handleSubmit = jest.fn();
		let wrapper = shallow(<EventForm handleSubmit={handleSubmit}/>);
		wrapper.simulate('submit');
		expect(handleSubmit).toHaveBeenCalled;
	});
})