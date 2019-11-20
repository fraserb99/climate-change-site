import React, { useState } from 'react';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Row, Col } from 'react-bootstrap';
import { ForumPost } from '../../components/Forum/ForumPost';
import { LogInModal } from '../../components/LogIn/LoginModal';
import { Discussion } from '../../components/Forum/Discussion';

export const DiscussionPage = ({...props}) => {
    const discussions = [
        {
            discussionId: 1,
            name: 'Treehugging',
            description: 'A place to talk about trees'
        }, {
            discussionId: 2,
            name: 'Fish',
            description: 'A place to talk about fish'
        }]

    return (
    <Row>
        <LeftSideBar title='Forum' />
        
        <Col lg={{span: 9, offset: 0}} className='home-content'>
                <div className='home-body'>
                    <Col lg={12}>
                        {discussions.map(discussion => (
                            <Discussion discussion={discussion} {...props} />
                        ))}
                    </Col>
                </div>
        </Col>
    </Row>
    )
}