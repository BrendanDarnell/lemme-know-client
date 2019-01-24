import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import LoginForm from './login-form';
import './landing-page.css';

export function LandingPage(props) {
	if(props.loggedIn && props.token) {
		return <Redirect to="/my-events"/>
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
			<div className="landing-page">
				<div className="app-intro">
					<h1 className="intro-name">Lemme Know</h1>
					<p className="intro-text">
						Going on a solo hike, an early morning run, or backcountry skiing?  Stay safe
						with the Lemme Know app.  Lemme Know allows users to create events containing their
						expected return time and a contact's phone number.  If the user doesn't check-in
						from the event by the time they specified, their contact is sent a text asking to
						check-in on the user. 
					</p>
					<p className="instr-text">
						 To try out the app yourself, login with the username: DemoUser,
						the password: password, put your phone number as the contact number, and create an
						event that expires in a few minutes.  After the event expires, you should recieve a text
						notification.  
					</p>
				</div>
				<div className="login-form-div">
					<LoginForm/>
					<p className="register-link">New User? Click <Link to="/signup">here</Link> to create an account.</p>
				</div>
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

export default connect(mapStateToProps)(LandingPage);