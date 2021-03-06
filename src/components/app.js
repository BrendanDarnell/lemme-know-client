import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import EventHome from './event-home';
import NewEventPage from './new-event-page';
import NavBar from './nav-bar';
import LandingPage from './landing-page';
import SignupPage	from './signup-page';
import './app.css';

export default function App(props) {
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
	<main role="main" className="landing-page-main">
		<Route exact path="/" component={LandingPage}/>
	</main>	
)

const DefaultContainer = () => (
	<React.Fragment>
		<header role="banner">
			<NavBar/>
		</header>

		<main role="main">
			<Route exact path="/signup" component={SignupPage}/>
			<Route exact path="/my-events" component={EventHome}/>
			<Route exact path="/create-event" component={NewEventPage}/>
		</main>
	</React.Fragment>
)