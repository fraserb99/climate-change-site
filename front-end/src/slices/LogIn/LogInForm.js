import React from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextRow } from '../../components/Form/TextRow';
import { validateLogin } from './validators';

const LogInForm = ({isSubmitting, newAccount, handleSubmit, ...props}) => (
    <Formik
        initialValues={{username: '', password: ''}}
        validate={validateLogin}
        onSubmit={handleSubmit}
    >
        <Row className='justify-content-md-center login-form' >
            <Col xl={8} lg={12} className='login-window'>
                <Form>
                    <h2>{newAccount ? 'Create Account' : 'Log In' }</h2>
                    <TextRow name='username' label='Username:' placeholder='Enter username' />
                    <TextRow type='password' name='password' label='Password:' placeholder='Enter password' />
                    <Row className='justify-content-md-center submit-row' >
                        <Button type='submit' disabled={isSubmitting}>
                            {newAccount ? 'Create Account' : 'Log In'}
                        </Button>
                    </Row>
                </Form>
                    <small className='login-links'>
                        {newAccount ? 
                            <a href='/login'>Log In</a> 
                            :
                            <a href='/createaccount'>Create Account</a> 
                        }
                        {' '}| <a href='forgotpassword'>Forgotten Password?</a>
                    </small>
            </Col>
        </Row>
    </Formik>
)

export default LogInForm;