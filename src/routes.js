import React from 'react';
import { Route } from 'react-router';
import { TestPage } from './TestPage';
import { Row, Nav, Navbar, NavbarBrand, Container, NavDropdown } from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { HomePage } from './HomePage';
import DropdownItem from 'react-bootstrap/DropdownItem';

const Routes = (props) => {
    console.log(props);
    return (
    <body>
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
            <NavLink href='#'>LogIn</NavLink>
        </Nav>
    </Navbar>
    <Container fluid>
        <Route path='/test' component={TestPage} {...props} />
        <Route exact path='/' component={HomePage} {...props} />
    </Container>
    </body>)
}

export default Routes;