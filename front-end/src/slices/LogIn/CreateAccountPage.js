import React, { useCallback, useContext } from 'react';
import { compose } from 'recompose';
import { Col, Row } from 'react-bootstrap';
import LogInForm from './LogInForm';
import './login.scss';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { createAccount } from './actions';

const LogInPage = props => {
    const {user, setUser} = useContext(UserContext);

    const handleSubmit = useCallback((values, { setSubmitting, setFieldError }) => {
        createAccount(values)
            .then(res => {
                if (!res.ok) {
                    throw new Error();
                }

                console.log('Success');
            }).catch((e) => {
                console.log(e);
                setFieldError('password', 'Failed to create account');
            });
    });

    return (
    <div className='login-form'>
        <Col lg={{ span: 4, offset: 4 }} md={6} className='login-container'>
            <LogInForm 
                {...props} 
                newAccount
                handleSubmit={handleSubmit}
            />
        </Col>
    </div>
)}

export default LogInPage;