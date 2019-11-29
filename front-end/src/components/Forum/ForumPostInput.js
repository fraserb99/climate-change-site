import React, { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Formik, Form } from 'formik';
import { TextRow } from "../Form/TextRow";
import { UserContext } from "../../infrastructure/contexts/UserContext";

export const ForumPostInput = ({handleSubmit, post, hideInput, ...props}) => {

    const {user, setUser} = useContext(UserContext);

    return (
    <Row className='post-row'>
        <Col lg={12} className='post-input'>
            <div className='forum-post' >
                <img src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_960_720.png' className='post-user' />
                <Col lg={10} className='post-message'>
                    <Formik
                        initialValues={{
                            post: (post.username ? `@${post.username} ` : ''),
                            parentId: post.postId,
                            userId: user.id,
                            discussionId: props.discussionId
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <TextRow as='textarea' name='post' placeholder='Share your thoughts...' rows={4}/>
                                <Col lg={{span: 3, offset: 8}} className='post-btn-col'>
                                    <Row className='post-btn-row'>
                                        <Button type='submit' className='post-btn' disabled={isSubmitting}>Post</Button>
                                        <Button variant='secondary' className='post-btn' onClick={hideInput}>Cancel</Button>
                                    </Row>
                                </Col>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </div>
        </Col>
    </Row>
)}