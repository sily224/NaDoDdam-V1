import React, { useContext } from 'react';
import styled from 'styled-components';
import Calender from './ReactCalender';
import Location from './Location';
import Review from './Review';
import TimeBtns from './TimeBtns';
import { DetailContext } from '../pages/DetailPage';
import FloatingForm from './FloatingForm';


const DisplayFlex = styled.div`
    display:flex;
    flex-direction:column;
`;

const DetailContainer = styled(DisplayFlex)`
    width:100%;
    text-align: left;
`;

const Header = styled(DisplayFlex)`
    width:100%;
`;

const Title = styled.h1`
    display: block;
    width : 100%;
`;

const DetailContent = styled.div`
    display: flex;
`;

const DetailPeriod = styled(DetailContent)`
    justify-content: flex-start;
`;
const DetailInform = styled.div`
    display: block;
    width: 100%;
    flex: 3.5;
`;
const FloatingFormDiv = styled.div`
    display : felx;
    justify-content : flex-end;
    flex: 1;
`;
const DetailCompanyContainer = styled.div`
    border : 1px solid black;
`;
const TimButtonContainer = styled(DisplayFlex)`
    justify-content:center;
    margin-left : 3%;
`;



const DetailHeader = ({ name, address }) => {
    return (
        <Header>
            <Title>{name}</Title>
            <p>{address}</p>
            <img src='' alt={`${name}이미지`} />
        </Header>
    );
};

const DetailGrade = ({ grade }) => {
    return <p>{grade}점 </p>
};

const DetailDescription = ({ description }) => {
    return <p>{description}</p>
};


const DetailCompany = ({farm,farmer}) => {
    return (
        <DetailCompanyContainer>
            <p>농장정보</p>
            <p>농장명 : {farm.name}</p>
            <p>농장상품 : {farm.type}</p>
            <p>농장주 : {farm.owner}</p>
            <p>E-mail : {farmer.email}</p>
            <p>전화번호: {farmer.phoneNum}</p>
        </DetailCompanyContainer>
    );
};



const Detail = () => {
    const { farmData : farm, farmerData : farmer } = useContext(DetailContext);
    
    return (
        <>
            {
                farm &&
                <DetailContainer key={`${farm.name}-${new Date()}`}>
                    <DetailHeader name={farm.name} address={farm.address} />
                    
                    <DetailContent>
                        <DetailInform>
                            {/* <DetailGrade grade={data.grade} /> */}
                            <DetailDescription description={farm.description} />
                            {/* <DetailPeriod>
                                <Calender />
                                <TimButtonContainer>
                                    <TimeBtns />
                                </TimButtonContainer>
                            </DetailPeriod> */}
                            <Review />
                            <Location />
                            <DetailCompany farm={farm} farmer={farmer}/>
                        </DetailInform>
                        {/* <FloatingFormDiv><FloatingForm /></FloatingFormDiv> */}
                    
                    </DetailContent>

                </DetailContainer>
            }
        </>
    );
};

export default Detail;