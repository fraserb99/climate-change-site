import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const HomePage = () => (
    <Row className='page-header-row'>
        <Col lg={3} sm={12} className='page-header'>
            <h1 style={{verticalAlign: 'middle'}}>Home Page</h1>
        </Col>
    </Row>
)