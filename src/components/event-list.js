import React from 'react';
import {connect} from 'react-redux';

import Event from './event';
import './event-list.css';

export function EventList(props) {
	const events = props.events.map((event,index) => {
		return (
			<li key={index}>
				<Event {...event}/>
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
	events: state.events
});

export default connect(mapStateToProps)(EventList);
