import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const CO2Stats = ({journeys, ...props}) => {
    const total = journeys && journeys.reduce((count, journey) => {
        const carbon = parseFloat(journey.carbon);

        if (journey.type === 'car') {
            return count + carbon;
        } else {
            return count - carbon;
        }
    }, 0)

    return (
        <Row>
            <Col lg={12}>
                <div className='stats'>
                    <tr>
                        <td>Net CO2: </td>
                        <td><span className={total > 0 ? 'pos' : 'neg'}>{total && total.toFixed(2)}</span></td>
                    </tr>
                    <tr>
                        <td>Total Journeys: </td>
                        <td>{journeys && journeys.length}</td>
                    </tr>
                </div>
            </Col>
        </Row>
    )
}