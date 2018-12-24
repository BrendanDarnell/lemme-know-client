import React from 'react';
import {reduxForm, Field} from 'redux-form';

import {signup} from '../actions/auth';
import './signup-form.css';

export function SignupForm(props) {

	return (
		<React.Fragment>
			<h2 className="register">Register</h2>
			
			<form 
				className="signup-form"
				onSubmit={props.handleSubmit(data => {
					console.log(data);
					props.dispatch(signup(data))
				}
				)}
			>
				<label htmlFor="username">Username</label>
				<Field name="username" type="text" component="input"/> 

				<label htmlFor="password">Password</label>
				<Field name="password" type="password" component="input"/>

				<label htmlFor="verifyPassword">Verify Password</label>
				<Field name="verifyPassword" type="password" component="input"/>

				<label htmlFor="contactNumber">Please provide your contact's phone number.</label>
				<Field name="contactNumber" type="text" component="input"/>

				<label htmlFor="verifyContactNumber">Please verify your contact's phone number.</label>
				<Field name="verifyContactNumber" type="text" component="input"/>

				<button type="submit" disabled={props.pristine||props.submitting}>Submit</button>
			</form>
		</React.Fragment>
	);
	
}

export default reduxForm({
	form: 'registration'
})(SignupForm);

