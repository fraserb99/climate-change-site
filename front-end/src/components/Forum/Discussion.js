import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const Discussion = ({discussion, ...props}) => {


    return (
        <Row className='post-row'>
            <Col lg={12}>
                <div className='forum-post' >
                    <Row>
                        <img src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_960_720.png' className='post-user' />
                        <Col lg={9} className='post-message'>
                            <a href={`discussions/${discussion.discussionId}`}><h3>{discussion.name}</h3></a>
                            <span>{discussion.description}</span>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}