import React from 'react';

import './event.css';

export default function Event(props) {
	return (
		<div className={`event-div ${props.eventName}-div`} id={props._id}>
			<h2 className="event-name">{props.eventName}</h2>
			<ul className="event-details">
				<li><span className="detail-name">Event Date:</span> {props.date}</li>
				<li><span className="detail-name">Return Time:</span> {`${props.returnTime} ${props.amOrPm}`}</li>
				<li><span className="detail-name">Contact Number:</span> {props.contactNumber}</li>
				<li><span className="detail-name">Description:</span> {props.description}</li>
			</ul>
			<span className="remove-event">
				<button onClick={props.onClick} className="delete-button">Check-in/Remove Event</button>
			</span>
		</div>
	);
}



