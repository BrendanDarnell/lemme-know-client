import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import EventHome from './event-home';
import NewEventPage from './new-event-page';
import NavBar from './nav-bar';
import LandingPage from './landing-page';
import SignupPage	from './signup-page';
import './app.css';

export default function App(props) {
	console.log(props.state);
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={LandingPageContainer}/>
				<Route component={DefaultContainer}/>			
			</Switch>
		</Router>
	);
}

const LandingPageContainer = () => (	
	<React.Fragment>
		<header>
			<h1>Lemme Know</h1>
		</header>

		<main role="main">
			<Route exact path="/" component={LandingPage}/>
		</main>
	</React.Fragment>
)

const DefaultContainer = () => (
	<React.Fragment>
		<header>
			<NavBar/>
		</header>

		<main role="main">
			<Route exact path="/signup" component={SignupPage}/>
			<Route exact path="/my-events" component={EventHome}/>
			<Route exact path="/create-event" component={NewEventPage}/>
		</main>
	</React.Fragment>
)