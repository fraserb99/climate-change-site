import React, { useContext } from 'react';
import { compose, withHandlers } from 'recompose';
import { Col, Row } from 'react-bootstrap';
import LogInForm from './LogInForm';
import './login.scss';
import { buildUrl } from '../../infrastructure/api/config';
import { UserContext } from '../../infrastructure/contexts/UserContext';

const enhance = compose(
    withHandlers({
        handleSubmit: ({setUser}) => async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                const response = await fetch(buildUrl('models/login.php'), {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                    "username": values.username,
                    'password': values.password
                    }),
                    headers: {'Content-Type':'application/json; charset=UTF-8'},
                });

                if (!response.ok) {
                    throw new Error('Error');
                }
                console.log(response);
                const newUser = response.json;
                console.log(newUser);
                setUser(newUser);
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        }
    })
)

const LogInPage = props => {
    const {user, setUser} = useContext(UserContext);
    return (
    <div className='login-form'>
        <Col lg={{ span: 4, offset: 4 }} md={6} className='login-container'>
            <LogInForm {...props} user={user} setUser={setUser} />
        </Col>
    </div>)
}

export default enhance(LogInPage);