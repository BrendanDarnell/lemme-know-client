import React from 'react';
import {shallow} from 'enzyme';

import Input from './input';

describe('<Input/>', () => {
	it('should render without crashing', () => {
		const props = {
			input: {name: 'foo'},
			label: 'bar',
			type: 'email',
			meta: {touched: false, error: false}
		}
		let wrapper = shallow(<Input {...props}/>);
	});
	
	it('should render proper elements and information provided by props', () => {
		const props = {
			input: {name: 'foo'},
			label: 'bar',
			type: 'email',
			meta: {touched: false, error: false}
		}
		let wrapper = shallow(<Input {...props}/>);
		expect(wrapper.find('div').hasClass('form-input')).toBe(true);
		expect(wrapper.contains(<label htmlFor="foo">bar</label>)).toBe(true);
		expect(wrapper.contains(<input name="foo" id="foo" type="email" ref={input => (this.input = input)}/>)).toBe(true);
	});

	it('should display error messages if meta.touched and meta.error', () => {
		const props = {
			input: {name: 'foo'},
			label: 'bar',
			type: 'email',
			meta: {touched: true, error: 'error message'}
		}		
		let wrapper = shallow(<Input {...props}/>);
		expect(wrapper.find('label > div').hasClass('field-error')).toBe(true)
	})
})