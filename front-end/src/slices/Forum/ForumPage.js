import React, { useState } from 'react';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Row, Col } from 'react-bootstrap';
import { ForumPost } from '../../components/Forum/ForumPost';
import { LogInModal } from '../../components/LogIn/LoginModal';

export const ForumPage = ({...props}) => {
    const posts = [{
        user: {
            username: 'Fraser'
        },
        message: 'This is the first post',
        posts: [
            {
                user: {
                    username: 'Ross',
                },
                message: 'Oi',
                date: '12/11/19',
                posts: [{
                    user: {
                        username: 'Robbie'
                    },
                    message: 'This is the second post',
                    date: '12-11-19'
                }, {
                    user: {
                        username: 'Ross'
                    },
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi Nulla aliquet enim tortor at. Metus dictum at tempor commodo',
                    date: '15/11/19'
                }]
            }
        ],
        date: '11/11/19',
        likes: 13
    }, {
        user: {
            username: 'Robbie'
        },
        message: 'This is the second post',
        date: '12-11-19'
    }, {
        user: {
            username: 'Ross'
        },
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi Nulla aliquet enim tortor at. Metus dictum at tempor commodo',
        date: '15/11/19'
    }]
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
    <Row>
        <LeftSideBar title='Forum' />
        
        <Col lg={{span: 9, offset: 0}} className='home-content'>
                <div className='home-body'>
                    <Col lg={12}>
                        {posts.map(post => (
                            <ForumPost post={post} setShowLoginModal={setShowLoginModal} initShowChildren {...props} />
                        ))}
                    </Col>
                </div>
        </Col>
        <LogInModal show={showLoginModal} setShowModal={setShowLoginModal} />
    </Row>
    )
}