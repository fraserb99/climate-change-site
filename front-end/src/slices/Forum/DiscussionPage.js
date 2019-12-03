import React, { useState, useEffect, useCallback, useContext } from 'react';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Row, Col, Button } from 'react-bootstrap';
import { ForumPost } from '../../components/Forum/ForumPost';
import { LogInModal } from '../../components/LogIn/LoginModal';
import { Discussion } from '../../components/Forum/Discussion';
import { getDiscussions, createDiscussion } from './actions';
import { NewDiscussionModal } from '../../components/Forum/NewDiscussionModal';
import { UserContext } from '../../infrastructure/contexts/UserContext';

export const DiscussionPage = ({...props}) => {
    const [loading, setLoading] = useState(false);

    const [discussions, setDiscussions] = useState(null);
    const [show, setShowModal] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const fetchDisc = useCallback(async () => {
        const disc = await getDiscussions();

        setDiscussions(disc);
    })

    useEffect(() => {
        fetchDisc();
    }, [])

    const handleNewDisc = useCallback(async (values) => {
        return await createDiscussion(values)
            .then(() => {
                fetchDisc();
                setShowModal(false);
            });
    })

    return (
    <Row>
        <LeftSideBar title='Discussions' />
        
        <Col lg={{span: 9, offset: 0}} className='home-content'>
                <div className='page-body'>
                    <Row className='posts-header'>
                        <h2>
                            Discussions
                            {user ? 
                            <Button onClick={() => 
                                setShowModal(true)
                            }>
                                New Discussion
                            </Button>
                            :
                            (<small> | Log in to add discussions</small>)}
                        </h2>
                    </Row>
                    <div className='posts-content'>
                        <Col lg={12}>
                            {discussions && discussions.map(discussion => (
                                <Discussion discussion={discussion} {...props} />
                            ))}
                        </Col>
                    </div>
                </div>
        </Col>
        <NewDiscussionModal
            show={show} 
            setShowModal={setShowModal} 
            handleSubmit={handleNewDisc}
        />
    </Row>
    )
}