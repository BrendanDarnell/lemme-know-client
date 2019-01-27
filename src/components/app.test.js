import React from 'react';
import {shallow, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';

import App from './app';

describe('<App/>', () => {
	it('should render without crashing', () => {
		let wrapper = shallow(<App/>);
	});

	it('should render correct react router components', () => {
		let wrapper = shallow(<App/>);
		expect(wrapper.find('Route')).toHaveLength(2);
		expect(wrapper.find('Switch')).toHaveLength(1);
	});

})