import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Row, Col, Button } from 'react-bootstrap';
import { getUser } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCross, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { EditUserModal } from '../../components/Users/EditUserModal';

export const UserDetailsPage = (props) => {
    const {user, setUser} = useContext(UserContext);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        getUser(user.id).then(async (response) => {
            if (!response.ok) {
                throw new Error();
            }

            const body = await response.json();
            setUser(body.user);
        }).catch((e) => {
            console.log(e);
        })
    }, []);

    return (
        <Row>
            <LeftSideBar title='User Details'>
                    Test
            </LeftSideBar>

            <Col lg={{span: 9, offset: 0}} className='home-content'>
                <div className='home-body'>
                    <div className='user-details'>
                        <h2>
                            {user.username}
                            <Button variant='info' className='details-btn' onClick={() => setEdit(true)}>
                                <FontAwesomeIcon icon={faPencilAlt} /> Edit
                            </Button>
                            <Button variant='danger' className='details-btn'>
                                <FontAwesomeIcon icon={faUserMinus} /> Delete
                            </Button>
                        </h2>
                        Email: {user.email}
                    </div>
                </div>
            </Col>
            {user.email && <EditUserModal show={edit} setShowModal={setEdit} user={user} />}
        </Row>
    )
}