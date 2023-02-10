import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from "./auth/UserContext";

function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext);


    function loggedInNav () {
    return (
            
            <Nav justified>
                <NavItem>
                    <NavLink to="/companies" style={{color: 'white'}}>Companies</NavLink>
                </NavItem> 
                <NavItem>
                    <NavLink to="/jobs" style={{color: 'white'}}>Jobs</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/profile" style={{color: 'white'}}>{currentUser.username}</NavLink>
                </NavItem>
                <NavItem>
                    <Link to="/" onClick={ logout } style={{color: 'white'}}>Log Out</Link>
                </NavItem>
            </Nav>
            
    );
    }

    function loggedOutNav () {
        return (
            <Nav className="ml-auto" navbar justified>
            <NavItem>
                    <NavLink to="/login" style={{color: 'white'}}>Log In</NavLink>
            </NavItem>
            <NavItem>
                    <NavLink to="/signup" style={{color: 'white'}}>Sign Up</NavLink>
            </NavItem>
            </Nav>
        )
    }

    return (
        <Navbar expand='md' color="dark">
            <NavLink exact to="/" className="navbar-brand" style={{color: 'white'}}>
                    Jobly
            </NavLink>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </Navbar>
    )
}

export default NavBar;