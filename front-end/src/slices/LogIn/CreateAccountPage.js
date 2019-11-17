import React from 'react';
import { compose } from 'recompose';
import { Col, Row } from 'react-bootstrap';
import LogInForm from './LogInForm';
import './login.scss';

const enhance = compose(

)

const LogInPage = props => (
    <div className='login-form'>
        <Col lg={{ span: 4, offset: 4 }} md={6} className='login-container'>
            <LogInForm 
                {...props} 
                newAccount
            />
        </Col>
    </div>
)

export default enhance(LogInPage);