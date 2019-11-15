import React from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextRow } from '../../components/Form/TextRow';
import { validateLogin } from './validators';

const LogInForm = (props) => (
    <Formik
        initialValues={{username: '', password: ''}}
        validate={validateLogin}
        onSubmit={(values, {setSubmitting}) => {
            console.log(values);
            alert('Submitted');
            setSubmitting(true);
        }}
    >
        <Row className='justify-content-md-center login-form' >
            <Col xl={8} lg={12} className='login-window'>
                <Form>
                    <h2>Log In</h2>
                    <TextRow name='username' label='Username:' />
                    <TextRow type='password' name='password' label='Password:' />
                    <Row className='justify-content-md-center submit-row' >
                        <Button type='submit' disabled={props.isSubmitting}>
                            Log In
                        </Button>
                    </Row>
                </Form>
            </Col>
        </Row>
    </Formik>
)

export default LogInForm;