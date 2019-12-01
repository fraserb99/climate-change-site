import React, { useCallback, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { TextRow } from '../../components/Form/TextRow';
import { SelectRow } from '../../components/Form/SelectRow';
import { JourneyTypeInput } from './JourneyTypeInput';
import MapModal from './MapModal';

export const NewJourneyModal = ({show, setShowModal, ...props}) => {
    const handleSubmit = useCallback((values) => {
        alert(JSON.stringify(values));
    });
    const [showMap, setShowMap] = useState(false);

    const typeOptions = [
        {
            label: 'Car',
            value: 'car'
        }, {
            label: 'Bike',
            value: 'bike'
        }, {
            label: 'Plane',
            value: 'plane'
        }, {
            label: 'Walk',
            value: 'walk'
        }
    ];


    return (
        <Formik
            initialValues={{
                type: '',
                distance: '',
                start: '',
                end: ''
            }}
            onSubmit={handleSubmit}
        >
            {({values, setFieldValue, setFieldError}) =>
            <Modal show={show} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Journey</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SelectRow label='Type: ' name='type' options={typeOptions} />
                    <JourneyTypeInput type={values.type} values={values} setShowMap={setShowMap} />
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit'>Save</Button>
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