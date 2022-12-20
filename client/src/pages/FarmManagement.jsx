import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Container = styled.div`
    display: flex;
`;
const Nav = styled.div`
    flex: 1;
    justify-content: flex-start;
    margin-right: 3%;
`;
const Table= styled.table`
    flex: 5;
    width: 100%;
    border: 1px solid black;
    border-collapse : collapse;
`;
const Thead = styled.thead``;
const Tr = styled.tr`border : 1px solid black; padding: 10px;`;
const Td = styled.td`border : 1px solid black; padding: 10px;`;

const FarmManagement = ()=>{
    
    const [reservation, setReservation] = useState(null);
    const fetchData = async () => {
        try {
            await axios.get('/reservation.json').then((res) => {
                console.log(res.data);
                setReservation(res.data);
            });
        }
        catch(e){
            console.log(e);
        }
    };

    useEffect (() => {
        fetchData();
    }, []);


    return (
        <>
        { reservation && ( 
        <div>
        <h1>농장관리</h1>
        <Container>
            <Nav>
                <h2>농장정보 관리</h2>
                <h2>체험시간표관리</h2>
                <h2>예약관리</h2>
                <h2>후기관리</h2>
            </Nav>
            <Table>
                <Thead>
                    <Tr>
                        <Td scope='col'>예약번호</Td>
                        <Td scope='col'>예약자</Td>
                        <Td scope='col'>예약정보</Td>
                        <Td scope='col'>결제</Td>
                        <Td scope='col'>예약상태</Td>
                    </Tr>
                </Thead>
                <tbody>
                    { 
                        reservation.map(data =>{
                            const {id, user, content, pay, status} = data;
                            return (
                                <Tr>
                                    <Td>{id}</Td>
                                    <Td>{user.name}<br/>{user.userId}<br/>{user.phone}</Td>
                                    <Td>{content.date}<br/>{content.headCount}명</Td>
                                    <Td>{pay.cost.toLocaleString('ko-KR')}원<br/>{pay.method}</Td>
                                    <Td>예약상태</Td>
                                </Tr>
                            )

                        })
                    }

                </tbody>
            </Table>
        </Container>
        </div>)}
        </>
    )
}

export default FarmManagement;