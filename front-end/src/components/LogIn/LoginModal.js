import React, { useCallback, useContext } from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextRow } from '../Form/TextRow';
import { validateLogin } from '../../slices/LogIn/validators';
import { logIn } from '../../slices/LogIn/actions';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { getJWTUser } from '../../infrastructure/login/sessions';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LogInModal = ({show, setShowModal}) => {

    const {user, setUser} = useContext(UserContext);

    const handleLogin = useCallback((values, {setSubmitting, resetForm, setFieldError}) => {
        return logIn(values).then(async (res) => {
            
            if (!res.ok) {
                throw new Error('Invalid username or password');
            }

            const body = await res.json();
            const jwt = body.jwt;
            const newUser = await getJWTUser(jwt);

            setUser(newUser);
            Cookies.set('jwt', jwt);
            setShowModal(false);
            resetForm();
        }).catch((e) => {
            console.log(e);
            setFieldError('password', e.message)
        }).finally(() => {
            setSubmitting(false);
        })
    })

    return (
        <Formik
            initialValues={{username: '', password: ''}}
            onSubmit={handleLogin}
            validate={validateLogin}
        >
            {({isSubmitting, submitForm}) => {console.log(isSubmitting); return(
                <Modal show={show} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Log In<br />
                            <small className='modal-details'>You must be logged in to perform this action</small>
                        </Modal.Title>
                        
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <TextRow name='username' label='Username: ' />
                            <TextRow name='password' type='password' label='Password: ' />
                            
                            <small>
                                Don't have an account yet? <a href='/createaccount'>Create one</a>
                            </small>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setShowModal(false)} variant='secondary' className='pull-left'>
                                Close
                            </Button>
                            <Button type='submit' disabled={isSubmitting}>
                                Log In {isSubmitting && <FontAwesomeIcon icon={faSpinner} className='fa-spin' />}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>)}}
        </Formik>
    )
}