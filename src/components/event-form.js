import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';

import Input from './input';
import './event-form.css';

export function EventForm(props) {

	return (
		<React.Fragment>
			<h2 className="new-event">New Event</h2>
			
			<form className="event-form"
				onSubmit={props.handleSubmit(data => 
					props.handleNewEvent(data)	
				)}
			>
				<Field 
					name="eventName" 
					type="text" 
					label="Event Name" 
					component={Input}
				/> 
				<Field 
					name="date" 
					type="text" 
					label="What day are you going?" 
					component={Input}
				/>
				<Field 
					name="returnTime" 
					type="text" 
					label="What time will you return?" 
					component={Input}
				/>
				<Field 
					name="description" 
					type="text" 
					label="Please provide a brief description of what/where you will be doing/going."
					component={Input}
				/>
				<button type="submit" disabled={props.pristine||props.submitting}>Submit</button>
			</form>
		</React.Fragment>
	);
	
}

export default reduxForm({
	form: 'event',
	onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(EventForm);

