import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import EventList from './event-list';
import EventForm from './event-form';
import NavBar from './nav-bar';
import './app.css';

export default function App(props) {
	return (
		<Router>
			<React.Fragment>
				<header>
					<NavBar/>
				</header>

				<main>
					<Redirect exact from="/" to="/my-events"/>
					<Route exact path="/my-events" component={EventList}/>
					<Route exact path="/create-event" component={EventForm}/>
				</main>
			</React.Fragment>
		</Router>
	);
}