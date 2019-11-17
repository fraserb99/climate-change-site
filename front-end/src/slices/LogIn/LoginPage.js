import React from 'react';
import { compose, withHandlers } from 'recompose';
import { Col, Row } from 'react-bootstrap';
import LogInForm from './LogInForm';
import './login.scss';
import { buildUrl } from '../../infrastructure/api/config';

const enhance = compose(
    withHandlers({
        handleSubmit: () => (values, { setSubmitting }) => {
            try {
                const response = fetch(buildUrl('models/login.php'), {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                    "username": values.username,
                    'password': values.password
                    })
                });

                if (!response.ok) {
                    console.log(response);
                    throw new Error('Error');
                }


            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        }
    })
)

const LogInPage = props => (
    <div className='login-form'>
        <Col lg={{ span: 4, offset: 4 }} md={6} className='login-container'>
            <LogInForm {...props} />
        </Col>
    </div>
)

export default enhance(LogInPage);