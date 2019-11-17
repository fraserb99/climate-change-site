import React, { useContext, useCallback } from 'react';
import { Nav, Navbar, NavbarBrand, Container, NavDropdown } from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
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
                    Climate Change
                </NavbarBrand>
                <Nav className="mr-auto">
                    <Nav.Link href='/' active={props.location.pathname == '/'}><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                    <Nav.Link href='/test' active={props.location.pathname.includes('/test')}>Test</Nav.Link>
                    <NavDropdown title='More'>
                        <DropdownItem href='/1'>1</DropdownItem>
                    </NavDropdown>
                </Nav>
                <Nav className='login-nav'>
                    {!user ? 
                        <NavLink href='/login'>Log In</NavLink>
                        :
                        <NavDropdown title={user.username}>
                            <DropdownItem onClick={() => logout()}>Log Out</DropdownItem>
                        </NavDropdown>
                    }
                </Nav>
        </Navbar>
    )
}