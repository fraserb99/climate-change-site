import React, { useContext, useCallback } from 'react';
import { compose, withHandlers, withContext } from 'recompose';
import { Col, Row } from 'react-bootstrap';
import LogInForm from './LogInForm';
import './login.scss';
import { buildUrl } from '../../infrastructure/api/config';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import Cookies from 'js-cookie';
import { getJWTUser } from '../../infrastructure/login/sessions';
import { logIn } from './actions';

const LogInPage = props => {
    
    const {user, setUser} = useContext(UserContext);
    
    const handleSubmit = useCallback(async (values, { setSubmitting, setFieldError }) => {
        try {
            setSubmitting(true);
            const response = await logIn(values);

            if (!response.ok) {
                throw new Error('Error');
            }

            const body = await response.json();
            const jwt = body.jwt;
            const newUser = await getJWTUser(jwt);

            setUser(newUser);
            Cookies.set('jwt', jwt);
            props.history.push('/');
        } catch (error) {
            setFieldError('password', 'Incorrect username or password');
        } finally {
            setSubmitting(false);
        }
    });

    return (
    <div className='login-form'>
        <Col lg={{ span: 4, offset: 4 }} md={6} className='login-container'>
            <LogInForm {...props} handleSubmit={handleSubmit} />
        </Col>
    </div>)
}

export default LogInPage;