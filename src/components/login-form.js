import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Redirect} from 'react-router-dom';

import {login} from '../actions/auth'
import './login-form.css';

export function LoginForm(props) {

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
				<label htmlFor="username">Username</label>
				<Field name="username" type="text" component="input"/> 

				<label htmlFor="password">Password</label>
				<Field name="password" type="password" component="input"/>

				<button type="submit" disabled={props.pristine||props.submitting}>Submit</button>
			</form>
		</React.Fragment>
	);
	
}

export default reduxForm({
	form: 'login'
})(LoginForm);

