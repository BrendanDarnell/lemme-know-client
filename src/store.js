import {createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer} from './reducers/auth';
import {eventsReducer} from './reducers/events';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	auth: authReducer,
	events: eventsReducer,
	form: formReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));
