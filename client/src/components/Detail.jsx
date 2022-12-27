import React, { useContext } from 'react';
import styled from 'styled-components';
import Calender from './ReactCalender';
import Location from './Location';
import Review from './Review';
import TimeBtns from './TimeBtns';
import { DetailContext } from '../pages/DetailPage';
import FloatingForm from './FloatingForm';
import Carousel from 'react-bootstrap/Carousel'
import {StyledTitle, StyledParagraph, StyledSubTitle,ContentContainer} from '../styles/Styled'

const DisplayFlex = styled.div`
    display:flex;
    flex-direction:column;
`;

const DetailContainer = styled(DisplayFlex)`
    width:100%;
    text-align: left;
`;

const Header = styled(DisplayFlex)`
    display: block;
    width : 100%;
`;

const Title = styled(StyledTitle)`
    margin-bottom: 1%;
`;
const Address = styled(StyledParagraph)`
    margin:  1% 0 2%;
`;
const DetailContent = styled.div`
    display: flex;
`;

const DetailPeriod = styled.div`
    display: flex;
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

const TimButtonContainer = styled(DisplayFlex)`
    justify-content:center;
    width : 30%;
    margin-left : 3%;
`;
const CarouselImg = styled.img`
    height: 450px;
`;


const DetailHeader = ({ name, address }) => {
    return (
        <Header>
            <Title>{name}</Title>
            <Address>{address}</Address>
        </Header>
    );
};

const DetailDescription = ({ description }) => {
    return (
        <ContentContainer>
            <StyledSubTitle>체험소개</StyledSubTitle>
            <div>
                <StyledParagraph>{description}</StyledParagraph>
            </div>
        </ContentContainer>
    )
};

const DetailCompany = ({farm,farmer}) => {
    return (
        <>
            <StyledSubTitle>농장정보</StyledSubTitle>
            <div>
                <StyledParagraph>농장정보</StyledParagraph>
                <StyledParagraph>농장명 : {farm.name}</StyledParagraph>
                <StyledParagraph>농장상품 : {farm.type}</StyledParagraph>
                <StyledParagraph>농장주 : {farm.owner}</StyledParagraph>
                <StyledParagraph>E-mail : {farmer.email}</StyledParagraph>
                <StyledParagraph>전화번호: {farmer.phoneNum}</StyledParagraph>
            </div>
        </>
    );
};
const DetailImg = ({imgUrl}) =>{
    return (
        <Carousel slide={false}>
            <Carousel.Item>
            <CarouselImg
            className='d-block w-100'
            src={imgUrl}
            alt='First slide'
            />
        </Carousel.Item>
        <Carousel.Item>
            <CarouselImg
            className='d-block w-100'
            src={imgUrl}
            alt='Second slide'
            />

        </Carousel.Item>
        <Carousel.Item>
            <CarouselImg
            className='d-block w-100'
            src={imgUrl}
            alt='Third slide'
            />
        </Carousel.Item>`
    </Carousel>
    )
}
const DetailSchedule = () =>{
    return (
        <ContentContainer>
            <StyledSubTitle>체험일정</StyledSubTitle>
            <DetailPeriod>
                <Calender />
                <TimButtonContainer>
                    <TimeBtns />
                </TimButtonContainer>
            </DetailPeriod>
        </ContentContainer>
    )
}

const Detail = () => {
    const { farmData : farm, farmerData : farmer } = useContext(DetailContext);

    return (
        <>
            {
                farm &&
                <DetailContainer key={`${farm.name}-${new Date()}`}>
                    <DetailHeader name={farm.name} address={farm.address} />
                    <DetailImg imgUrl={farm.url}></DetailImg>
                    <DetailContent>
                        <DetailInform>
                            <DetailDescription description={farm.description} />
                            <DetailSchedule />
                            <Review />
                            <Location />
                            <DetailCompany farm={farm} farmer={farmer}/>
                        </DetailInform>
                        <FloatingFormDiv><FloatingForm /></FloatingFormDiv>
                    
                    </DetailContent>

                </DetailContainer>
            }
        </>
    );
};

export default Detail;