import React from 'react';

import './event.css';

export default function Event(props) {
	return (
		<div className="event-div {props.name}-div" id="{event.id}">
			<h2>Name: {props.name}</h2>
			<ul>
				<li>Event Date: {props.date}</li>
				<li>Return Time: {props.returnTime}</li>
				<li>Description: {props.description}</li>
			</ul>
		</div>
	);
}

