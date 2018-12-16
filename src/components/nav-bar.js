import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './nav-bar.css';

export default function NavBar(props) {
	return (
		<div className="header-div">	
			<div className="logo">
				<h1>Lemme Know</h1>
			</div>
			<nav className="nav-links">
				<ul className="nav-list">
					<li>
						<Link to="/my-events">My Events</Link>
					</li>
					<li>
						<Link to="/create-event">Create Event</Link>
					</li>
				</ul>
			</nav>
		</div>
		);
}

