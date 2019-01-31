import React from 'react';
import {reduxForm, Field, focus, destroy} from 'redux-form';

import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import Input from './input';
import './login-form.css';

export function LoginForm({error, ...props}) {
	let formError;
	if(error) {
		formError = (
			<div className="form-error" aria-live="polite">
                {error}
            </div>
        );
	}

	return (
		<React.Fragment>
			<h2 className="login">Login</h2>
			
			<form className="login-form"
				onSubmit={props.handleSubmit(data => {
					console.log('form data', data)
					return props.dispatch(login(data))
				}
				)}
			>
				{formError}
				<Field 
					name="username" 
					type="text" 
					label="Username" 
					component={Input}
					validate={[required, nonEmpty]}
				/> 
				<Field 
					name="password" 
					type="password" 
					label="Password" 
					component={Input}
					validate={[required, nonEmpty]}
				/>
				<button type="submit" disabled={props.pristine||props.submitting} className="form-button">Submit</button>
			</form>
		</React.Fragment>
	);	
}

// set destroyOnUnmount to false so the form is not cleared if server returns validation error
// use onSubmitSuccess to clear form if a successful submission is made
export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) =>
        dispatch(focus('login', Object.keys(errors)[0])),
    destroyOnUnmount: false,
    onSubmitSuccess: (result,dispatch) => {
    	console.log('redux-form success');
    	dispatch(destroy('event'));
    }
})(LoginForm);

