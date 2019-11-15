import React from 'react';
import { Route } from 'react-router';
import { Row, Nav, Navbar, NavbarBrand, Container, NavDropdown } from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { HomePage } from '../../slices/Home/HomePage';
import DropdownItem from 'react-bootstrap/DropdownItem';
import LoginPage from '../../slices/LogIn/LoginPage';

const Routes = (props) => {
    console.log(props);
    return (
        <div className='app'>
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
                <Nav>
                    <NavLink href='/login'>Log In</NavLink>
                </Nav>
            </Navbar>
            <Container fluid>
                <Route exact path='/' component={HomePage} {...props} />
                <Route path='/login' component={LoginPage} {...props} />
            </Container>
        </div>)
}

export default Routes;