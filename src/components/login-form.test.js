import React from 'react';
import {shallow, mount} from 'enzyme';

import {LoginForm} from './login-form';


describe('<LoginForm/>', () => {
	it('should render without crashing', () => {
		let handleSubmit = jest.fn();
		let wrapper = shallow(<LoginForm handleSubmit={handleSubmit}/>);
	});

	it('should render all Field components', () => {
		let handleSubmit = jest.fn();
		let wrapper = shallow(<LoginForm handleSubmit={handleSubmit}/>);
		expect(wrapper.find('Field')).toHaveLength(2);
		expect(wrapper.find('[name="username"]')).toHaveLength(1);
		expect(wrapper.find('[name="password"]')).toHaveLength(1);
	})

	it('should call handleSubmit on form submission', () => {
		let handleSubmit = jest.fn();
		let wrapper = shallow(<LoginForm handleSubmit={handleSubmit}/>);
		wrapper.simulate('submit');
		expect(handleSubmit).toHaveBeenCalled;
	});
})