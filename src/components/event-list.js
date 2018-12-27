import React from 'react';
import {connect} from 'react-redux';

import {deleteEvent} from '../actions/events';
import Event from './event';
import './event-list.css';

export function EventList(props) {
	const events = props.events.map((event,index) => {
		return (
			<li key={index}>
				<Event {...event} onClick={() =>
					props.dispatch(deleteEvent(props.username,props.token,event.id))
				}/>
			</li>
		);
	});

	return (
		<div className="event-list-div">
			<ul className="event-list">
				{events}
			</ul>
		</div>
	)
}

const mapStateToProps = (state, props) => ({
	username: state.auth.username,
	token: state.auth.token,
	events: state.events.events
});

export default connect(mapStateToProps)(EventList);
