import React from 'react';
import {shallow, mount} from 'enzyme';

import {NavBar} from './nav-bar';

const mockLogoutAction = {
	type: 'LOGOUT'
};

jest.mock('../actions/auth', () => Object.assign({},
	require.requireActual('../actions/events'),
	{
		logout: jest.fn().mockImplementation(() => mockLogoutAction)
	}
	)
);

describe('<navBar/>', () => {
	it('should render without crashing', () => {
		const dispatch = jest.fn();
		let wrapper = shallow(<NavBar dispatch={dispatch}/>);
	});

	it('should render the proper elements/components', () => {
		const dispatch = jest.fn();
		let wrapper = shallow(<NavBar dispatch={dispatch}/>);
		expect(wrapper.find('.header-div')).toHaveLength(1);
		expect(wrapper.find('.logo')).toHaveLength(1);
		expect(wrapper.find('nav')).toHaveLength(1);
		expect(wrapper.find('ul')).toHaveLength(1);
		expect(wrapper.find('li')).toHaveLength(3);
		expect(wrapper.find('Link')).toHaveLength(2);
		expect(wrapper.contains(<h1>Lemme Know</h1>)).toBe(true);
		expect(wrapper.find('button')).toHaveLength(1);
	});

	it('should dispatch logout when logout button is clicked', () => {
		const dispatch = jest.fn();
		let wrapper = shallow(<NavBar dispatch={dispatch}/>);
		wrapper.find('button').simulate('click');
		expect(dispatch).toHaveBeenCalledWith(mockLogoutAction);	
	});
})
