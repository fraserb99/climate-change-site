import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const LeftSideBar = ({ title, children }) => (
    <Col lg={3} sm={0} className='details-left'>
        <div className='page-header'>
            <h1>{title}</h1>
        </div>
        <Col lg={12} className='side-bar'>
            {children}
        </Col>
    </Col>
)