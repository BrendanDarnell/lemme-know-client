import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {SubmissionError} from 'redux-form';

import EventForm from './event-form';
import {newEvent} from '../actions/events';
import './new-event-page.css';

export class NewEventPage extends React.Component {
	constructor(props) {
		super(props);
	}
	
	componentDidUpdate(prevProps) {
		console.log(this.props.events, prevProps.events);
		if(this.props.events !== prevProps.events) {
			return this.props.history.push('/my-events');
		}
	}

	handleNewEvent(data) {
		let reqData = Object.assign(data, {
			name: this.props.name,
			username: this.props.username,
			token: this.props.token 
		});
		return this.props.dispatch(newEvent(reqData));
	}

	render() {
		if(!this.props.loggedIn || !this.props.token) {
			return <Redirect to="/"/>
		}
		else if(this.props.loading) {
			return(
				<div className="spinner">
					<Loader type="Oval" color="blue" height={100} width={100}/>
				</div>
			)
		}
		else {
			return(
				<div className="new-event-page">
					<EventForm handleNewEvent={(data) => this.handleNewEvent(data)}/>
				</div>
			)
		}
	}
}

const mapStateToProps = (state,props) => ({
	loggedIn: state.auth.loggedIn,
	name: state.auth.name,
	username: state.auth.username,
	token: state.auth.token,
	loading: state.events.loading,
	events: state.events.events
});

export default connect(mapStateToProps)(NewEventPage);