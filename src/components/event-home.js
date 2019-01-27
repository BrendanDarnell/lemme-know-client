import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {fetchEvents, deleteEvent} from '../actions/events';
import Event from './event';
import './event-home.css';

export class EventHome extends React.Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		console.log('mounted', this.props.events);
		if(!this.props.events || this.props.events.length === 0) {
			this.props.dispatch(fetchEvents(this.props.username, this.props.token));
		}
	}

	render() {
		if(!this.props.loggedIn || !this.props.token) {
			return <Redirect to="/"/>
		}
		else if(this.props.error) {
			if(this.props.error.message) {
				return <div className="events-error event-home">{this.props.error.message}</div>
			}
			else {
				return <div className="events-error event-home">Sorry, there was an internal server error.</div>
			}
		}
		else if(!this.props.events || this.props.events.length === 0) {
			let noEventsMessage = 'You don\'t currently have any events. To create an event, click Create Event\
			in the navigation bar.';
			return <div className="no-events event-home">{noEventsMessage}</div>	
		}
		else {
			const events = this.props.events.map((event,index) => {
				return (
					<li key={index}>
						<Event {...event} onClick={() =>
							this.props.dispatch(deleteEvent(this.props.token, event._id))
						}/>
					</li>
				);
			});

			return (
				<div className="event-home">
					<ul className="event-list">
						{events}
					</ul>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, props) => ({
	username: state.auth.username,
	token: state.auth.token,
	events: state.events.events,
	error: state.events.error,
	loggedIn: state.auth.loggedIn,
	token: state.auth.token
});

export default connect(mapStateToProps)(EventHome);
