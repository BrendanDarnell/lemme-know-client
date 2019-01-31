import React from 'react';
import {reduxForm, Field, focus, destroy} from 'redux-form';

import Input from './input';
import {required, nonEmpty, phoneNumber, date, time} from '../validators';
import './event-form.css';

export function EventForm({error, ...props}) {
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
				<div className="am-pm">
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
				</div>
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
					label="Briefly describe the event."
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
	form: 'event',
	onSubmitFail: (errors, dispatch) => {
        dispatch(focus('event', Object.keys(errors)[0]));
    	},
    destroyOnUnmount: false,
    onSubmitSuccess: (result,dispatch) => {
    	dispatch(destroy('event'));
    	}
})(EventForm);

