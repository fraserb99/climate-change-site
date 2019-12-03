import React, { useContext, useCallback } from 'react';
import {Nav, Navbar, NavbarBrand, Container, NavDropdown, CarouselItem} from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSign, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import Cookies from 'js-cookie';

export const NavBar = (props) => {
    const {user, setUser} = useContext(UserContext);

    const logout = useCallback(() => {
        console.log('logout');
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
                    UTF &thinsp;<i class="fa fa-tree"></i>

                </NavbarBrand>
                <Nav className="mr-auto">
                    <Nav.Link href='/' active={props.location.pathname == '/'}><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                    <Nav.Link href='/discussions' active={props.location.pathname.includes('/discussions')}>Forum</Nav.Link>
                    <Nav.Link href='/co2tracker' active={props.location.pathname.includes('/co2tracker')}>CO2 Tracker</Nav.Link>
                </Nav>
                <Nav className='login-nav'>
                    {!user ? 
                        <NavLink href='/login'>Log In/Create Account <FontAwesomeIcon icon={faSignInAlt} /></NavLink>
                        :
                        <NavDropdown title={<span><FontAwesomeIcon icon={faUser} /> {user.username}</span>}>
                            <DropdownItem href='user/details'>Your Account</DropdownItem>
                            <DropdownItem onClick={() => logout()}>Log Out</DropdownItem>
                        </NavDropdown>
                    }
                </Nav>
        </Navbar>
    )
}