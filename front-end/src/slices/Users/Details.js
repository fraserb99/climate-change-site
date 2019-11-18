import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';
import { Row, Col } from 'react-bootstrap';
import { getUser } from './actions';

export const UserDetailsPage = (props) => {
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        getUser(user.id).then(async (response) => {
            if (!response.ok) {
                throw new Error();
            }

            const body = await response.json();
            console.log(body);
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
                    <h2>{user.username}</h2>
                    Email: {user.email}
                </div>
            </Col>
        </Row>
    )
}