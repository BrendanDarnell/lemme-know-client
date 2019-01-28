import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../actions/auth';

import './nav-bar.css';

export function NavBar(props) {
	return (
		<div className="header-div">	
			<div className="logo">
				<h1>Lemme Know</h1>
			</div>
			<nav className="nav-links" role="navigation">
				<div className="dropdown-container">
					<span className="fa fa-navicon fa-3x"></span>
					<ul className="nav-list">
						<li>
							<Link to="/my-events">My Events</Link>
						</li>
						<li>
							<Link to="/create-event">Create Event</Link>
						</li>
						<li className="list-button">	
							<button className="logout-button" onClick={()=>props.dispatch(logout())}>logout</button>
						</li>
					</ul>
				</div>
			</nav>
		</div>
		);
}

export default connect()(NavBar);

