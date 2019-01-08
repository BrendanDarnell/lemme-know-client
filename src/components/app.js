import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import EventList from './event-list';
import NewEventPage from './new-event-page';
import NavBar from './nav-bar';
import LandingPage from './landing-page';
import SignupPage	from './signup-page';
import './app.css';

export default function App(props) {
	console.log(props.state);
	return (
		<Router>
			<React.Fragment>
				<header>
					<NavBar/>
				</header>

				<main role="main">
					<Route exact path="/" component={LandingPage}/>
					<Route exact path="/signup" component={SignupPage}/>
					<Route exact path="/my-events" component={EventList}/>
					<Route exact path="/create-event" component={NewEventPage}/>
				</main>
			</React.Fragment>
		</Router>
	);
}