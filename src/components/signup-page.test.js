import React from 'react';
import {shallow} from 'enzyme';

import {SignupPage} from './signup-page';

describe('<SignupPage/>', () => {
	it('should render without crashing', () => {
		const props = {
			loggedIn: false,
			token: null,
			loading: false,
			error: null
		}
		let wrapper = shallow(<SignupPage {...props}/>);
	});
	
	it('should redirect to /my-events if logged in and has token', () => {
		const props = {
			loggedIn: true,
			token: 'mockToken',
			loading: false,
			error: null
		}
		let wrapper = shallow(<SignupPage {...props}/>);
		expect(wrapper.find('Redirect')).toHaveLength(1);
	});

	it('should display spinner if content is loading', () => {
		const props = {
			loggedIn: false,
			token: null,
			loading: true,
			error: null
		}
		let wrapper = shallow(<SignupPage {...props}/>);
		expect(wrapper.find('div').hasClass('spinner')).toBe(true);
		expect(wrapper.find('Loader')).toHaveLength(1);		
	});

	it('if all props null or false, should display login form', () => {
		const props = {
			loggedIn: false,
			token: null,
			loading: false,
			error: null
		}
		let wrapper = shallow(<SignupPage {...props}/>);
		expect(wrapper.find('div').hasClass('registration-page')).toBe(true);
	});	
})