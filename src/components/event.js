import React from 'react';

import './event.css';

export default function Event(props) {
	return (
		<div className="event-div {props.name}-div" id="{props.id}">
			<h2 className="event-name">{props.name}</h2>
			<ul className="event-list">
				<li>Event Date: {props.date}</li>
				<li>Return Time: {props.returnTime}</li>
				<li>Description: {props.description}</li>
			</ul>
			<span className="remove-event">
				<button onClick={props.onClick}>X</button>
				Check-in/Remove Event
			</span>
		</div>
	);
}



