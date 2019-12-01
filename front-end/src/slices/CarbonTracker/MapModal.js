import React, { useCallback, useState, useEffect } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import MapContainer from './MapContainer';
import { TextRow } from '../../components/Form/TextRow';
import { GOOGLE_KEY } from '../../infrastructure/api/config';
import { GoogleApiWrapper } from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const MapModal = ({show, setShowModal, values, google, setFieldValue, setFieldError, ...props}) => {
    const [startValid, setStartValid] = useState();
    const [endValid, setEndValid] = useState();
    const [startPos, setStartPos] = useState();
    const [endPos, setEndPos] = useState();
    const [route, setRoute] = useState();
    const [distance, setDistance] = useState();


    const handleStartCheck = useCallback((results, status) => {
        if (status === 'OK') {
            setStartValid(true);
            setStartPos(results[0].geometry);
            setFieldValue('start', results[0].formatted_address);
            setFieldError('start', 'Invalid address');
            return true;
        } else {
            setStartValid(false);
            return false;
        }
    })

    const handleEndCheck = useCallback((results, status) => {
        if (status === 'OK') {
            setEndValid(true);
            setEndPos(results[0].geometry);
            setFieldValue('end', results[0].formatted_address);
            setFieldError('end', 'Invalid address');
            return true;
        } else {
            setEndValid(false);
            return false;
        }
    })

    useEffect(() => {
        console.log(startPos);
        console.log(endPos)
        if (!startPos || !endPos) return;
        const directionService = new google.maps.DirectionsService();

        directionService.route({
            origin: startPos.location,
            destination: endPos.location,
            travelMode: 'DRIVING'
        }, (result, status) => {
            if (status === 'OK') {
                const directions = result.routes[0].overview_path
                    .map(poly => ({
                        lat: poly.lat(),
                        lng: poly.lng()
                    }))
                setRoute(directions);
                setDistance(result.routes[0].legs[0].distance.value / 1000)
            }
        })
    }, [startPos, endPos])

    const checkAddresses = useCallback(() => {
        const geocoder = new google.maps.Geocoder();
        console.log(geocoder)

        geocoder.geocode({address: values.start}, handleStartCheck)
        geocoder.geocode({address: values.end}, handleEndCheck)


    })

    const handleSaveRoute = useCallback(() => {
        alert(distance);
        setFieldValue('distance', distance)
        setShowModal(false);
    })
    
    return (
    <Modal show={show} onHide={() => setShowModal(false)} size='xl'>
        <Modal.Header>
            <Modal.Title>Map</Modal.Title>
        </Modal.Header>
        <Modal.Body className='map-modal-body'>
            <Row>
                <Col lg={5}>
                    <Row>
                        <Col lg={11}>
                            <TextRow name='start' label='Start Location: ' />
                        </Col>
                        <Col lg={1}>
                            <span>{startValid && <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', fontSize: '20px'}} />}</span>
                        </Col>
                    </Row>
                </Col>
                <Col lg={5}>
                    <Row>
                        <Col lg={11}>
                            <TextRow name='end' label='End Location: ' />
                        </Col>
                        <Col lg={1}>
                            {endValid && <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green'}} />}
                        </Col>
                    </Row>
                </Col>
                <Col lg={2}>
                    <Button onClick={checkAddresses}>Check</Button>
                </Col>
            </Row>
            {distance}
            <MapContainer 
                google={google} 
                route={route} 
                startPos={startPos}
                endPos={endPos}
                setDistance={setDistance}
                {...props} 
            />
        </Modal.Body>
        <Modal.Footer>
            <Button
                onClick={handleSaveRoute}
                disabled={!startValid || !endValid}
            >
                Save Distance
            </Button>
        </Modal.Footer>
    </Modal>
)}

export default GoogleApiWrapper({apiKey: GOOGLE_KEY})(MapModal)