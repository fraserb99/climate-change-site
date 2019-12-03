import React, { useCallback, useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, withFormik } from 'formik';
import { TextRow } from '../../components/Form/TextRow';
import { SelectRow } from '../../components/Form/SelectRow';
import { JourneyTypeInput } from './JourneyTypeInput';
import MapModal from './MapModal';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { createJourney } from './actions';

export const NewJourneyModal = ({show, setShowModal, journeys, setJourneys, ...props}) => {
    const handleSubmit = useCallback((values) => {
        const submitVals = {
            userId: values.userId,
            type: values.type,
            distance: values.distance,
            carbon: values.carbon
        }

        return createJourney(submitVals)
            .then(journey => {
                setJourneys([...journeys, journey]);
                setShowModal(false);
            });
    });
    const [showMap, setShowMap] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const typeOptions = [
        {
            label: 'Car',
            value: 'car'
        }, {
            label: 'Bike',
            value: 'bike'
        }, {
            label: 'Walk',
            value: 'walk'
        }
    ];


    return (
        <Formik
            initialValues={{
                userId: user.id,
                type: '',
                distance: '',
                start: '',
                end: '',
                carbon: 0
            }}
            onSubmit={handleSubmit}
        >
            {({values, setFieldValue, setFieldError, submitForm, resetForm}) =>
            <Modal show={show} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Journey</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SelectRow label='Type: ' name='type' options={typeOptions} />
                    <JourneyTypeInput type={values.type} values={values} setShowMap={setShowMap} setFieldValue={setFieldValue} />
                    <TextRow name='carbon' label='CO2 (kg): ' disabled />
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' onClick={() => submitForm().then(() => resetForm())}>Save</Button>
                </Modal.Footer>
                <MapModal 
                    show={showMap} 
                    setShowModal={setShowMap} 
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldError={setFieldError}
                />
            </Modal>}
        </Formik>
    )
}