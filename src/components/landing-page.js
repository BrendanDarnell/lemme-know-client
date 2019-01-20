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
				<LoginForm/>
				<p className="register-link">New User? Click <Link to="/signup">here</Link> to create an account.</p>
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