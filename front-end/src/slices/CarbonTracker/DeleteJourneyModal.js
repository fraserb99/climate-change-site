import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';


export const DeleteJourneyModal = ({journey, show, setShowModal, handleSubmit, ...props}) => {

    return (
        <Modal show={show} onHide={() => setShowModal(false)} centered>
            <Formik
                initialValues={{journeyId: journey && journey.id}}
                onSubmit={handleSubmit}
            >
                {({submitForm}) => (
                <Form>
                    <Modal.Body>
                        Are you sure you want to delete this journey? {journey && journey.id}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => submitForm().then(() => setShowModal(false))} variant='danger'>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Form>)}
            </Formik>
        </Modal>
    )
}