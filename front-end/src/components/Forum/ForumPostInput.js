import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Formik, Form } from 'formik';
import { TextRow } from "../Form/TextRow";

export const ForumPostInput = ({handleSubmit, postUser, hideInput, ...props}) => {



    return (
    <Row className='post-row'>
        <Col lg={12}>
            <div className='forum-post' >
                <img src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_960_720.png' className='post-user' />
                <Col lg={10} className='post-message'>
                    <Formik
                        initialValues={{message: (postUser ? `@${postUser.username} ` : '')}}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <TextRow as='textarea' name='message' placeholder='Reply...' rows={4}/>
                                <Col lg={{span: 3, offset: 8}} className='post-btn-col'>
                                    <Row className='post-btn-row'>
                                        <Button type='submit' className='post-btn'>Post</Button>
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