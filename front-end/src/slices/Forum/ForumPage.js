import React, { useState, useEffect, useCallback, useContext } from 'react';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Row, Col, Button } from 'react-bootstrap';
import { ForumPost } from '../../components/Forum/ForumPost';
import { LogInModal } from '../../components/LogIn/LoginModal';
import { getPosts, getDiscussions, createPost } from './actions';
import { formatPosts } from './selectors';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { ForumPostInput } from '../../components/Forum/ForumPostInput';

export const ForumPage = ({...props}) => {
    const [posts, setPosts] = useState();
    const [discussion, setDiscussion] = useState();
    console.log(props);
    const {user, setUser} = useContext(UserContext);
    const discussionId = props.match.params.discussionId;
    const [showAddPost, setShowAddPost] = useState(false);

    const updatePosts = useCallback(async () => {
        const result = await getPosts(discussionId);
        const formatted = formatPosts(result, '0', user.id);
        console.log(formatted);
        setPosts(formatted);
    })

    const fetchDisc = async () => {
        const disc = await getDiscussions();
        setDiscussion(disc.find(x => x.id === discussionId));
    }

    useEffect(() => {
        updatePosts();
        fetchDisc();
    }, []);

    const handleSubmit = useCallback(async (values, {setSubmitting, setFieldError}) => {
        return createPost(values).then(() => {
            setShowAddPost(false);
            updatePosts();
        }).catch((e) => {
            console.error(e);
            setFieldError('post', 'Unable to create post');
        })
    })

    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
    <Row>
        <LeftSideBar title='Discussions' />
        
        <Col lg={{span: 9, offset: 0}} className='home-content'>
                <div className='home-body'>
                    <Col lg={12}>
                        {discussion && 
                        <Row className='posts-header'>
                            <h2>
                                {discussion.name}
                                <Button onClick={() => {
                                    setShowAddPost(!showAddPost);
                                    if (!showAddPost) {
                                        window.scrollTo(0, 0);
                                    }
                                }}>
                                    {showAddPost ? 'Cancel Post' : 'Add Post'}
                                </Button>
                            </h2>
                        </Row>}
                        <div className='posts-content'>
                        {showAddPost && 
                            <ForumPostInput 
                                post={{postId: 0}} 
                                discussionId={discussion.id} 
                                hideInput={setShowAddPost} 
                                handleSubmit={handleSubmit} 
                            />
                        }
                        {posts && posts.map(post => (
                            <ForumPost post={post} setShowLoginModal={setShowLoginModal} initShowChildren updatePosts={updatePosts} {...props} />
                        ))}
                        </div>
                    </Col>
                </div>
        </Col>
        <LogInModal show={showLoginModal} setShowModal={setShowLoginModal} />
    </Row>
    )
}