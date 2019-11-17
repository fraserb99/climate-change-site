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

const Routes = (props) => {
    const {user, setUser} = useContext(UserContext);
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
                    {!user ? 
                        <NavLink href='/login'>Log In</NavLink>
                        :
                        <NavDropdown title={user.username}>
                            <DropdownItem href='/logout'>Log Out</DropdownItem>
                        </NavDropdown>
                    }
                </Nav>
            </Navbar>
            <Container fluid>
                <Route exact path='/' component={HomePage} {...props} />
                <Route path='/login' component={LoginPage} {...props} />
                <Route path='/createaccount' component={CreateAccountPage} {...props} />
            </Container>
        </div>)
}

export default Routes;