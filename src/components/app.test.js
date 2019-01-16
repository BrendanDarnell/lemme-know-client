import React from 'react';
import {shallow, mount} from 'enzyme';
import App from './app';

describe('<App/>', () => {
	it('should render without crashing', () => {
		wrapper = shallow(<App/>);
	})
})