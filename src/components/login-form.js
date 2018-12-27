import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';

import {login} from '../actions/auth';
import Input from './input';
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
				<Field 
					name="username" 
					type="text" 
					label="Username" 
					component={Input}
				/> 
				<Field 
					name="password" 
					type="password" 
					label="Password" 
					component={Input}
				/>
				<button type="submit" disabled={props.pristine||props.submitting}>Submit</button>
			</form>
		</React.Fragment>
	);	
}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(LoginForm);

