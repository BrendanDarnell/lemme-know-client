import {createStore} from 'redux'

import {eventsReducer} from './reducers';

export default createStore(eventsReducer);
