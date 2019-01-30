import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import SignupForm from './signup-form';
import './signup-page.css';

export function SignupPage(props) {
	if(props.loggedIn && props.token) {
		return <Redirect to="/my-events"/>
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
			<div className="registration-page">
				<SignupForm/>
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

export default connect(mapStateToProps)(SignupPage);