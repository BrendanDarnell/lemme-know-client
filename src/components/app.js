import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import EventList from './event-list';
import EventForm from './event-form';
import NavBar from './nav-bar';
import LoginForm from './login-form';
import SignupForm	from './signup-form';
import './app.css';

export default function App(props) {
	console.log(props.state);
	return (
		<Router>
			<React.Fragment>
				<header>
					<NavBar/>
				</header>

				<main>
					<Route exact path="/" component={LoginForm}/>
					<Route exact path="/signup" component={SignupForm}/>
					<Route exact path="/my-events" component={EventList}/>
					<Route exact path="/create-event" component={EventForm}/>
				</main>
			</React.Fragment>
		</Router>
	);
}