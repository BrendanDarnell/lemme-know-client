import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../actions/auth';

import './nav-bar.css';

// onClick={props.dispatch(logout())}

export function NavBar(props) {
	return (
		<div className="header-div">	
			<div className="logo">
				<h1>Lemme Know</h1>
			</div>
			<nav className="nav-links" role="navigation">
				<ul className="nav-list">
					<li>
						<Link to="/my-events">My Events</Link>
					</li>
					<li>
						<Link to="/create-event">Create Event</Link>
					</li>
					<li>	
						<button className="logout-button">logout</button>
					</li>
				</ul>
			</nav>
		</div>
		);
}

export default connect()(NavBar);

