import React from 'react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom'

const Navbar = props => {
    return (
        <nav className={styles.nav}>
          <div>
            <NavLink to="/profile">Profile</NavLink>
          </div>
          <div>
            <NavLink to="/dialogs">Dialogs</NavLink>
          </div>
          <div>
            <NavLink to="/users">Users</NavLink>
          </div>
					{/* <div>
            <a href="#">News</a>
          </div>
					<div>
            <a href="#">Music</a>
          </div>
          <div>
            <a href="#">Settings</a>
          </div> */}
        </nav>
    )
}

export default Navbar