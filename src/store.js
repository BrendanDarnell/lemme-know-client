import {createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer} from './reducers/auth';
import {eventsReducer} from './reducers/events';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import {loadCredentials} from './local-storage';
import {loginSuccess} from './actions/auth';

const rootReducer = combineReducers({
	auth: authReducer,
	events: eventsReducer,
	form: formReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const credentials = loadCredentials();
if(credentials) {
	if(credentials.username && credentials.token && credentials.name) {
		store.dispatch(loginSuccess(credentials));
	}
}

export default store;