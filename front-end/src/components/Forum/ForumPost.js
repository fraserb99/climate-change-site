import React, { useState, useCallback, useContext } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ForumPostInput } from './ForumPostInput';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import toastr from 'toastr';

export const ForumPost = ({post, initShowChildren, ...props}) => {
    const [likes, setLikes] = useState(post.likes || 0);
    const [liked, setLiked] = useState();
    const [showReply, setShowReply] = useState(false);
    const [showChildren, setShowChildren] = useState(initShowChildren || false)
    const {user, setUser} = useContext(UserContext);
    
    const handleLiked = useCallback((like) => {
        setLikes(likes + (like ? 1 : -1));
        setLiked(like);
    })

    const handleSubmit = useCallback((values, {setSubmitting}) => {
        alert(values.message);
    })

    const handleShowReply = useCallback(() => {
        if (user === null && showReply === false) {
            toastr.info('You must be logged in to use the forum');
            props.setShowLoginModal(true);
            //props.setAfterLogin(setShowReply(true));
        } else {
            setShowReply(!showReply)
        }
    })

    return (
    <Row className='post-row'>
        <Col lg={12}>
            <div className='forum-post' >
                <Row>
                    <img src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_960_720.png' className='post-user' />
                    <Col lg={9} className='post-message'>
                        <small>{post.user.username} - {post.date}</small>
                        {post.message}
                        <Row className='post-footer'>
                            <FontAwesomeIcon icon={faHeart} onClick={() => handleLiked(!liked)} className={liked ? 'liked' : 'not-liked'} />
                            <small>{'\xa0'}{likes ? likes : 0}{` likes`} - 
                                <a onClick={() => handleShowReply()} className='reply-btn'> {showReply ? 'Cancel Reply' : 'Reply'}</a>
                                {post.posts &&
                                    <a onClick={() => setShowChildren(!showChildren)} className='reply-btn'>
                                       {' - '}{showChildren ? 'Hide Replies' : 'Show Replies'}
                                    </a>
                                }
                            </small>
                        </Row>
                    </Col>
                </Row>
            </div>
            {showReply && <ForumPostInput handleSubmit={handleSubmit} postUser={post.user} hideInput={() => setShowReply(false)} />}
            <Collapse in={showChildren}>
                <div>
                {post.posts && post.posts.map((post) => (
                    <ForumPost post={post} {...props} />
                ))}
                </div>
            </Collapse>
        </Col>
    </Row>
)}