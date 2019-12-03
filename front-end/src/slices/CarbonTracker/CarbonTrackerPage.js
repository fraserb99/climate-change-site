import React, { useState, useEffect, useCallback } from 'react';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Col, Button, Row, Table } from 'react-bootstrap';
import { NewJourneyModal } from './NewJourneyModal';
import { getJourneys } from './actions';
import { CO2Stats } from '../../components/Journey/CO2Stats';

export const CarbonTrackerPage = props => {
    const [showModal, setShowModal] = useState(false);
    const [journeys, setJourneys] = useState();

    const fetchJourneys = useCallback(async () => {
        const j = await getJourneys();
        setJourneys(j);
    })

    useEffect(() => {
        fetchJourneys();
    }, []);

    return ( 
        <Row>
            <LeftSideBar title='CO2 Tracker'>
                <CO2Stats journeys={journeys} />
            </LeftSideBar>

            <Col lg={9} className='page-content'>
                <div className='page-body'>
                    <Table variant='dark' className='carbon-table'>
                        <thead>
                            <tr>
                                <div className='table-title'>
                                    Journeys
                                    <Button onClick={() => setShowModal(true)}>
                                        New Journey
                                    </Button>
                                </div>
                            </tr>
                            <tr>
                                <th>Journey Type</th>
                                <th>Distance</th>
                                <th>CO2 (kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {journeys && journeys.map(journey => (
                                <tr className={journey.type === 'car' ? 'carbon-plus' : 'carbon-minus'}>
                                    <td>{journey.type}</td>
                                    <td>{journey.distance}</td>
                                    <td>{journey.carbon}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Col>
            <NewJourneyModal 
                show={showModal} 
                setShowModal={setShowModal} 
                journeys={journeys} 
                setJourneys={setJourneys} 
            />
        </Row>
    )
}