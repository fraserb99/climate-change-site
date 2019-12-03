import React, { useContext, useCallback } from 'react';
import {Nav, Navbar, NavbarBrand, Container, NavDropdown, CarouselItem} from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSign, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export const NavBar = ({history, ...props}) => {
    const {user, setUser} = useContext(UserContext);

    const logout = useCallback(() => {
        Cookies.set('jwt', null);
        setUser(null);
    });

    return (
        <Navbar
            variant='dark'
            sticky='top'
            bg='dark'
            expand='lg'
            >
                <NavbarBrand>
                    UTF &thinsp;<i className="fa fa-tree"></i>

                </NavbarBrand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push('/')} active={props.location.pathname == '/'}><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                    <Nav.Link onClick={() => history.push('/discussions')} active={props.location.pathname.includes('/discussions')}>Forum</Nav.Link>
                    <Nav.Link onClick={() => history.push('/co2tracker')} active={props.location.pathname.includes('/co2tracker')}>CO2 Tracker</Nav.Link>
                </Nav>
                <Nav className='login-nav'>
                    {!user ? 
                        <NavLink onClick={() => history.push('/login')}>Log In/Create Account <FontAwesomeIcon icon={faSignInAlt} /></NavLink>
                        :
                        <NavDropdown title={<span><FontAwesomeIcon icon={faUser} /> {user.username}</span>}>
                            <DropdownItem onClick={() => history.push('user/details')}>Your Account</DropdownItem>
                            <DropdownItem onClick={() => logout()}>Log Out</DropdownItem>
                        </NavDropdown>
                    }
                </Nav>
        </Navbar>
    )
}