import React from 'react';
import {reduxForm, Field, focus, destroy, SubmissionError} from 'redux-form';

import {signup} from '../actions/auth';
import {required, nonEmpty, isTrimmed, length, matches} from '../validators';
import Input from './input';
import './signup-form.css';
const matchesPassword = matches('password');
const passwordLength = length({min: 8, max: 40});
const usernameLength = length({min: 3, max: 40});

export function SignupForm({error, ...props}) {

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
					name="firstName" 
					type="text" 
					label="First Name" 
					component={Input}
					validate={[required, nonEmpty]}
				/> 
				<Field 
					name="lastName" 
					type="text" 
					label="Last Name" 
					component={Input}
					validate={[required, nonEmpty]}
				/> 
				<Field 
					name="username" 
					type="text" 
					label="Username" 
					component={Input}
					validate={[required, nonEmpty, isTrimmed, usernameLength]}
				/> 
				<Field 
					name="password" 
					type="password" 
					label="Password" 
					component={Input}
					validate={[required, nonEmpty, isTrimmed, passwordLength]}
				/>
				<Field 
					name="verifyPassword" 
					type="password" 
					label="Verify Password" 
					component={Input}
					validate={[required, nonEmpty, isTrimmed, passwordLength, matchesPassword]}
				/>
				<button type="submit" disabled={props.pristine||props.submitting} className="form-button">Submit</button>
			</form>
		</React.Fragment>
	);
	
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0])),
    destroyOnUnmount: false,
    onSubmitSuccess: (result,dispatch) => {
    	console.log('redux-form success');
    	dispatch(destroy('event'));
    }
})(SignupForm);

