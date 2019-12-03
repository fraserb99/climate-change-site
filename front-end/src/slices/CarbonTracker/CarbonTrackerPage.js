import React, { useState, useEffect, useCallback, useContext } from 'react';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Col, Button, Row, Table } from 'react-bootstrap';
import { NewJourneyModal } from './NewJourneyModal';
import { getJourneys, deleteJourney } from './actions';
import { CO2Stats } from '../../components/Journey/CO2Stats';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteJourneyModal } from './DeleteJourneyModal';
import { CO2Leaderboard } from '../../components/Journey/CO2Leaderboard';

export const CarbonTrackerPage = props => {
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [journeys, setJourneys] = useState();
    const {user, setUser} = useContext(UserContext);
    const [toDelete, setDeleteJourney] = useState();

    const fetchJourneys = useCallback(async () => {
        if (!user) return;
        const j = await getJourneys();
        setJourneys(j);
    })

    useEffect(() => {
        fetchJourneys();
    }, []);

    const handleShowDelete = useCallback((journey) => {
        setDeleteJourney(journey);
        setShowDelete(true);
    })

    const handleDelete = useCallback((values) => {

        return deleteJourney(values)
            .then(() => {
                setJourneys(journeys.filter(x => x.id !== values.journeyId))
            })
    })

    return ( 
        <Row>
            <LeftSideBar title='CO2 Tracker'>
                <CO2Stats journeys={journeys} />
                <CO2Leaderboard />
            </LeftSideBar>

            <Col lg={9} className='page-content'>
                <div className='page-body'>
                    <Table variant='dark' className='carbon-table'>
                        <thead>
                            <tr>
                                <td colSpan={3}>
                                    <div className='table-title'>
                                        Journeys
                                        <Button onClick={() => setShowModal(true)}>
                                            New Journey
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Journey Type</th>
                                <th>Distance (miles)</th>
                                <th>CO2 (kg)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {journeys && journeys.map(journey => (
                                <tr className={journey.type === 'car' ? 'carbon-plus' : 'carbon-minus'}>
                                    <td>{journey.type}</td>
                                    <td>{parseFloat(journey.distance).toFixed(2)}</td>
                                    <td>{parseFloat(journey.carbon).toFixed(2)}</td>
                                    <td><Button variant='outline-danger' className='journey-delete' onClick={() => handleShowDelete(journey)}>
                                            Delete <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </td>
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
            <DeleteJourneyModal 
                show={showDelete} 
                setShowModal={setShowDelete} 
                journey={toDelete}
                handleSubmit={handleDelete}
            />
        </Row>
    )
}