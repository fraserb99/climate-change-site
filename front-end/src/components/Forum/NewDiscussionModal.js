import React, { useContext } from 'react';
import { Modal, Col, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextRow } from '../Form/TextRow';
import { UserContext } from '../../infrastructure/contexts/UserContext';

export const NewDiscussionModal = ({show, setShowModal, handleSubmit, ...props}) => {
    const {user, setUser} = useContext(UserContext);

    return (
        <Formik
            initialValues={{discussion: '', userId: user && user.id}}
            onSubmit={handleSubmit}
        >
            {({isSubmitting}) => (
            <Modal show={show} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Discussion</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Col lg={12}>
                            <TextRow name='discussion' label='Title: ' />
                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' disabled={isSubmitting}>Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>)}
        </Formik>
    )
}