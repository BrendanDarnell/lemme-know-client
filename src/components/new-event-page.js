import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import EventForm from './event-form';
import './new-event-page.css';

export function NewEventPage(props) {
	if(!props.loggedIn || !props.token) {
		return <Redirect to="/"/>
		// return props.history.push('/my-events')
	}
	else if(props.loading) {
		return(
			<div className="spinner">
				<Loader type="Oval" color="blue" height={100} width={100}/>
			</div>
		)
	}
	else {
		return(
			<div className="new-event-div">
				<EventForm/>
			</div>
			)
	}
}

const mapStateToProps = (state,props) => ({
	loggedIn: state.auth.loggedIn,
	token: state.auth.token,
	loading: state.auth.loading,
	error: state.auth.error
});

export default connect(mapStateToProps)(NewEventPage);