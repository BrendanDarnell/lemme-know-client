import React from 'react';
import {shallow, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';

import App from './app';

describe('<App/>', () => {
	it('should render without crashing', () => {
		let wrapper = shallow(<App/>);
	})

	it('should render a header and a main element', () => {
		let wrapper = shallow(<App/>);
		expect(wrapper.find('header')).toHaveLength(1);
		expect(wrapper.find('main')).toHaveLength(1);
	})

})