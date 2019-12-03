import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { getLeaderboard } from '../../slices/CarbonTracker/actions';

export const CO2Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState();

    const fetchLeaderboard = useCallback(async () => {
        var board = await getLeaderboard();
        board = board.map(row => ({
            ...row,
            netCO2: parseFloat(row.netCO2)
        }));

        board = board.sort((a, b) => a.netCO2 - b.netCO2);
        board = board.slice(0, 4);
        
        setLeaderboard(board);
    })

    useEffect(() => {
        fetchLeaderboard();
    }, [])

    const displayBoard = useCallback((board) => {
        const i = 0;

    })

    return (
        <Row>
            <Col lg={12}>
                <div>
                    <Table size='sm' variant='dark' striped>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Net CO2 (kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard && leaderboard.map(row => (
                                <tr>
                                    <td>{row.username}</td>
                                    <td>{row.netCO2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
    )
}