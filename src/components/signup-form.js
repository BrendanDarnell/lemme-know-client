import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';

import {signup} from '../actions/auth';
import Input from './input';
import './signup-form.css';

export function SignupForm(props) {

	// <label htmlFor="contactNumber">Please provide your contact's phone number.</label>
				// <Field name="contactNumber" type="text" label="" component="input"/>

				// <label htmlFor="verifyContactNumber">Please verify your contact's phone number.</label>
				// <Field name="verifyContactNumber" type="text" component="input"/>

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
				<Field 
					name="verifyPassword" 
					type="password" 
					label="Verify Password" 
					component={Input}
				/>
				<button type="submit" disabled={props.pristine||props.submitting}>Submit</button>
			</form>
		</React.Fragment>
	);
	
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(SignupForm);

