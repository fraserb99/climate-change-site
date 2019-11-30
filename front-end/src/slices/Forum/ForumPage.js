import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Row, Col, Button } from 'react-bootstrap';
import { ForumPost } from '../../components/Forum/ForumPost';
import { LogInModal } from '../../components/LogIn/LoginModal';
import { getPosts, getDiscussions, createPost, getLikes } from './actions';
import { formatPosts, newestComparator, sortPosts } from './selectors';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { ForumPostInput } from '../../components/Forum/ForumPostInput';
import Select from 'react-select';

const customStyles = {
    menu: () => ({
        width: '140px'
    })
}


export const ForumPage = ({...props}) => {
    const [posts, setPosts] = useState();
    const [renderPosts, setRenderPosts] = useState();
    const [discussion, setDiscussion] = useState();
    const [likes, setLikes] = useState();

    const {user, setUser} = useContext(UserContext);
    const discussionId = props.match.params.discussionId;
    const [showAddPost, setShowAddPost] = useState(false);

    const updatePosts = useCallback(async () => {
        const result = await getPosts(discussionId);
        const initPosts = result.sort(newestComparator(true));
        setPosts(initPosts);
    })

    const fetchDisc = useCallback(async () => {
        const disc = await getDiscussions();
        setDiscussion(disc.find(x => x.id === discussionId));
    })

    const fetchLikes = useCallback(async () => {
        if (user) {
            const l = await getLikes();
            setLikes(l);
        }
    })

    useEffect(() => {
        updatePosts();
        fetchDisc();
        fetchLikes();
    }, []);

    useEffect(() => {
        if (!posts || !likes) return;
        var formatted = formatPosts(posts, '0', user.id, likes);
        console.log(formatted);
        setRenderPosts(formatted);
    }, [posts, likes])

    const handleSubmit = useCallback(async (values, {setSubmitting, setFieldError}) => {
        return createPost(values).then(() => {
            setShowAddPost(false);
            updatePosts();
        }).catch((e) => {
            console.error(e);
            setFieldError('post', 'Unable to create post');
        })
    })

    const sortOptions = [{
            label: 'Newest First',
            value: 'newest'
        }, {
            label: 'Most Popular',
            value: 'popular',
        }, {
            label: 'Oldest First',
            value: 'oldest'
        }, 
    ]

    const handleSortChange = useCallback(({value}) => {
        if (value === 'newest') {
            const newPosts = sortPosts([...renderPosts], newestComparator(true));
            setRenderPosts(newPosts);
        } else if (value === 'oldest') {
            const newPosts = sortPosts([...renderPosts], newestComparator(false));
            setRenderPosts(newPosts);
        } else if (value === 'popular') {
            const newPosts = sortPosts([...renderPosts],
                (a, b) => b.likes - a.likes);
            setRenderPosts(newPosts);
        }
    })

    const [showLoginModal, setShowLoginModal] = useState(false);
    console.log(renderPosts);
    return (
    <Row noGutters>
        <LeftSideBar title='Discussions' />
        
        <Col lg={{span: 9, offset: 0}} className='home-content'>
                <div className='home-body'>
                    <Col lg={12} >
                        {discussion && 
                        <Row className='posts-header' noGutters>
                            <Col lg={12}>
                                <Col lg={3} className='header-title'>
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
                                </Col>
                                <Col lg={2} className='sort-menu'>
                                    {'Sort: '}
                                    <Select
                                        isSearchable={false}
                                        defaultValue={{label:'Newest First', value:'newest'}}
                                        onChange={handleSortChange}
                                        options={sortOptions}
                                    />
                                </Col>
                            </Col>
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
                        {renderPosts && renderPosts.map(post => (
                            <ForumPost 
                                post={post} 
                                setShowLoginModal={setShowLoginModal} 
                                initShowChildren 
                                updatePosts={updatePosts} 
                                {...props} 
                            />
                        ))}
                        </div>
                    </Col>
                </div>
        </Col>
        <LogInModal show={showLoginModal} setShowModal={setShowLoginModal} />
    </Row>
    )
}