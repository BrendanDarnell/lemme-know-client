import React from 'react';
import {reduxForm, Field, focus, destroy, SubmissionError} from 'redux-form';

import Input from './input';
import {required, nonEmpty, phoneNumber, date, time} from '../validators';
import './event-form.css';

export function EventForm({error, ...props}) {
	let formError;
	if(error) {
		console.log(error);
		formError = (
			<div className="form-error" aria-live="polite">
                {error}
            </div>
        );
	}

	return (
		<React.Fragment>
			<h2 className="new-event">New Event</h2>
			
			<form className="event-form"
				onSubmit={props.handleSubmit(data =>  
					props.handleNewEvent(data)	
				)}
			>
				{formError}
				<Field 
					name="eventName" 
					type="text" 
					label="Event Name" 
					component={Input}
					validate={[required, nonEmpty]}
				/> 
				<Field 
					name="date" 
					type="text" 
					label="What day are you going?" 
					component={Input}
					validate={[required, nonEmpty, date]}
				/>
				<Field 
					name="returnTime" 
					type="text" 
					label="What time will you return?" 
					component={Input}
					validate={[required, nonEmpty, time]}
				/>
				<Field
					name="amOrPm" 
					type="radio" 
					label="am" 
					value="am"
					component={Input}
					validate={required}
				/>
				<Field
					name="amOrPm" 
					type="radio" 
					label="pm" 
					value="pm"
					component={Input}
					validate={required}
				/>
				<Field 
					name="contactNumber" 
					type="text" 
					label="Please provide a contact's phone number." 
					component={Input}
					validate={[required, nonEmpty, phoneNumber]}
				/>
				<Field 
					name="description" 
					type="text" 
					label="Please provide a brief description of what/where you will be doing/going."
					component={Input}
					validate={[required, nonEmpty]}
				/>
				<button type="submit" disabled={props.pristine||props.submitting} className="form-button">Submit</button>
			</form>
		</React.Fragment>
	);
	
}

export default reduxForm({
	form: 'event',
	onSubmitFail: (errors, dispatch) => {
		console.log('onSubmitFail', Object.keys(errors));
        dispatch(focus('event', Object.keys(errors)[0]));
    	},
    destroyOnUnmount: false,
    onSubmitSuccess: (result,dispatch) => {
    	console.log('redux-form success');
    	dispatch(destroy('event'));
    	}
})(EventForm);

