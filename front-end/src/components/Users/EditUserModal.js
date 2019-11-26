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
import { updateUser } from '../../slices/Users/actions';

export const EditUserModal = ({show, setShowModal, user, handleLogin}) => {
    const {oldUser, setUser} = useContext(UserContext);

    const handleSubmit = useCallback((values) => {
        return updateUser(values).then(async (res) => {
            if (!res.ok) {
                throw new Error('Failed to update user')
            }

            const body = await res.json();
            const jwt = body.jwt;
            const newUser = await getJWTUser(jwt);

            setUser(newUser);
            Cookies.set('jwt', jwt);
        })
    })

    return (
        <Formik
            initialValues={user}
            onSubmit={handleSubmit}
            // validate={validateLogin}
        >
            {({isSubmitting}) => {console.log(isSubmitting); return(
                <Modal show={show} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Account<br />
                        </Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <TextRow name='username' label='Username: ' />
                            <TextRow name='email' type='email' label='Email: ' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setShowModal(false)} variant='secondary' className='pull-left'>
                                Close
                            </Button>
                            <Button type='submit' disabled={isSubmitting}>
                                Save {isSubmitting && <FontAwesomeIcon icon={faSpinner} className='fa-spin' />}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>)}}
        </Formik>
    )
}