import React, { useState } from 'react';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Col, Button, Row } from 'react-bootstrap';
import { NewJourneyModal } from './NewJourneyModal';

export const CarbonTrackerPage = props => {
    const [showModal, setShowModal] = useState(false);

    return ( 
        <Row>
            <LeftSideBar title='CO2 Tracker' />

            <Col lg={9} className='home-content'>
                <div className='page-body'>
                    <Button onClick={() => setShowModal(true)}>
                        Show Modal
                    </Button>
                </div>
            </Col>
            <NewJourneyModal show={showModal} setShowModal={setShowModal} />
        </Row>
    )
}