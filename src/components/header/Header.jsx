import React from 'react';
import styles from './header.module.css';
import { NavLink } from 'react-router-dom';

const Header = props => {

    return (
        <header className={styles.header}>
          <NavLink to="/">
            <img
              src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
              alt="logo"/>
          </NavLink>
          <div className={styles.loginBlock}>
            {
              props.isAuth 
              ?  <div>{props.login} - <button onClick={props.logout}>Log Out</button></div>
              : <NavLink to="/login">Login</NavLink>
            }
          </div>
        </header>
    )
}

export default Header