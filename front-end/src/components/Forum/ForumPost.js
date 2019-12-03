import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ForumPostInput } from './ForumPostInput';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import toastr from 'toastr';
import { getPosts, createPost, likePost, unlikePost } from '../../slices/Forum/actions';

export const ForumPost = ({post, initShowChildren, ...props}) => {
    const [likes, setLikes] = useState(post.likes || 0);
    const [liked, setLiked] = useState(post.liked);
    const [showReply, setShowReply] = useState(false);
    const [showChildren, setShowChildren] = useState(initShowChildren || false)
    const {user, setUser} = useContext(UserContext);
    const discussionId = props.match.params.discussionId;
    
    const handleLiked = useCallback((like) => {
        if (!user) {
            props.setShowLoginModal(true);
            return;
        }
        var success = false;
        if (like) {
            success = handleLike(post.postId);
        } else {
            success = handleUnlike(post.postId);
        }
        if (success) {
            setLikes(likes + (like ? 1 : -1));
            setLiked(like);
        }
    })

    const handleSubmit = useCallback(async (values, {setSubmitting, setFieldError}) => {
        return createPost(values).then(() => {
            setShowReply(false);
            props.updatePosts();
            setShowChildren(true);
        }).catch((e) => {
            console.error(e);
            setFieldError('post', 'Unable to create post');
        })
    })

    const handleShowReply = useCallback(() => {
        if (user === null && showReply === false) {
            toastr.info('You must be logged in to use the forum');
            props.setShowLoginModal(true);
        } else {
            setShowReply(!showReply)
        }
    })

    const handleLike = useCallback(async (postId) => {
        await likePost(postId, user.id)
            .catch((e) => {
                return false;
            })
        return true;
    })

    const handleUnlike = useCallback(async (postId) => {
        const result = await unlikePost(postId, user.id)
            .catch((e) => {
                return false;
            });
        
        return true;
    })

    useEffect(() => {
        setLikes(post.likes);
        setLiked(post.liked);
    }, [post])

    return (
    <Row className='post-row'>
        <Col lg={12}>
            <div className='forum-post' >
                <Row>
                    <img src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_960_720.png' className='post-user' />
                    <Col lg={9} className='post-message'>
                        <small>
                            {post.username} - {post.time} 
                            {post.canDelete && 
                                <a onClick={() => console.log('clicked')}>
                                    <span className='delete-icon'> - <FontAwesomeIcon icon={faTrashAlt} /></span>
                                </a>}
                        </small>

                        {post.post}

                        <Row className='post-footer'>
                            <FontAwesomeIcon icon={faHeart} onClick={() => handleLiked(!liked)} className={liked ? 'liked' : 'not-liked'} />
                            <small>{'\xa0'}{likes ? likes : 0}{` likes`} - 
                                <a onClick={() => handleShowReply()} className='reply-btn'> {showReply ? 'Cancel Reply' : 'Reply'}</a>
                                {post.posts.length > 0 &&
                                    <a onClick={() => setShowChildren(!showChildren)} className='reply-btn'>
                                       {' - '}{showChildren ? 'Hide Replies' : `Show ${post.posts.length} Repl${post.posts.length > 1 ? 'ies' : 'y'}`}
                                    </a>
                                }
                            </small>
                        </Row>
                    </Col>
                </Row>
            </div>
            {showReply && <ForumPostInput handleSubmit={handleSubmit} post={post} hideInput={() => setShowReply(false)} discussionId={discussionId} />}
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