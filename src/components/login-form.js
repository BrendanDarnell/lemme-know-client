import React from 'react';
import {reduxForm, Field, focus, destroy, SubmissionError} from 'redux-form';

import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import Input from './input';
import './login-form.css';

export function LoginForm({error, ...props}) {

	return (
		<React.Fragment>
			<h2 className="login">Login</h2>
			
			<form className="login-form"
				onSubmit={props.handleSubmit(data => {
					console.log('form data', data)
					props.dispatch(login(data.username, data.password))
				}
				)}
			>
				<Field 
					name="username" 
					type="text" 
					label="Username" 
					component={Input}
					validators={[required, nonEmpty]}
				/> 
				<Field 
					name="password" 
					type="password" 
					label="Password" 
					component={Input}
					validators={[required, nonEmpty]}
				/>
				<button type="submit" disabled={props.pristine||props.submitting} className="form-button">Submit</button>
			</form>
		</React.Fragment>
	);	
}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0])),
    destroyOnUnmount: false,
    onSubmitSuccess: (result,dispatch) => {
    	console.log('redux-form success');
    	dispatch(destroy('event'));
    }
})(LoginForm);

