import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Row, Nav, Navbar, NavbarBrand, Container, NavDropdown } from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { HomePage } from '../../slices/Home/HomePage';
import DropdownItem from 'react-bootstrap/DropdownItem';
import LoginPage from '../../slices/LogIn/LoginPage';
import CreateAccountPage from '../../slices/LogIn/CreateAccountPage';
import { UserContext } from '../contexts/UserContext';
import { NavBar } from '../../components/NavBar/NavBar';
import { UserDetailsPage } from '../../slices/Users/Details';
import { ForumPage } from '../../slices/Forum/ForumPage';
import { DiscussionPage } from '../../slices/Forum/DiscussionPage';
import { CarbonTrackerPage } from '../../slices/CarbonTracker/CarbonTrackerPage';
import { Link } from 'react-router-dom';


const Routes = (props) => {
    return (
        <div className='app'>
            <NavBar {...props} />
            <Container fluid>
                <Route exact path='/' component={HomePage} {...props} />
                <Route path='/login' render={(props) => <LoginPage {...props} />} />
                <Route path='/createaccount' component={(props) => <CreateAccountPage {...props} />} />
                <Route path='/user/details' component={UserDetailsPage} />

                <Route exact path='/discussions' component={DiscussionPage} />
                <Route path='/discussions/:discussionId' component={ForumPage} />

                <Route path='/co2tracker' component={CarbonTrackerPage} />
            </Container>
        </div>)
}

export default Routes;