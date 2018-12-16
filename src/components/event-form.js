import React from 'react';

import {reduxForm, Field} from 'redux-form';

import './event-form.css';

export function EventForm(props) {

	return (
		<React.Fragment>
			<h2 className="new-event">New Event</h2>
			
			<form className="event-form"
				onSubmit={props.handleSubmit(data => 
					console.log(data,props)	
				)}
			>
				<label htmlFor="eventName">Event Name</label>
				<Field name="eventName" type="text" component="input"/> 

				<label htmlFor="date">What day are you going?</label>
				<Field name="date" type="text" component="input"/>

				<label htmlFor="returnTime">What time will you return?</label>
				<Field name="returnTime" type="text" component="input"/>

				<label htmlFor="description">Please provide a brief description of what/where 
				you will be doing/going.</label>
				<Field name="description" type="text" component="input"/>

				<button type="submit" disabled={props.pristine||props.submitting}>Submit</button>
			</form>
		</React.Fragment>
	);
	
}

export default reduxForm({
	form: 'event'
})(EventForm);

