import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { TextRow } from '../../components/Form/TextRow';
import { SelectRow } from '../../components/Form/SelectRow';
import { getMakeOpts } from './actions';

const co2PerMile = 0.411;

const BikeInput = ({setShowMap}) => (
    <div>
        <TextRow name='distance' label='Distance:' />
        <Row>
            <Col lg={{span: 8, offset: 3}}>
                or <br />
                <Row>
                    <Col lg={12}>
                        <Button onClick={() => setShowMap(true)}>Show Map</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
)

const CarInput = ({values, setShowMap}) => {

    return (
        <div>
            <TextRow name='distance' label='Distance (miles): ' />
            <Row>
                <Col lg={{span: 8, offset: 3}}>
                    or <br />
                    <Row>
                        <Col lg={12}>
                            <Button onClick={() => setShowMap(true)}>Show Map</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export const JourneyTypeInput = ({type, setFieldValue, ...props}) => {
    const distance = props.values.distance;

    useEffect(() => {
        const carbon = distance * co2PerMile;
        setFieldValue('carbon', carbon);
    }, [distance])

    return (
        <div>
            <CarInput {...props} />
        </div>
    )
}