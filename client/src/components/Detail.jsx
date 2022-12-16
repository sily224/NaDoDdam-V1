import React,{useState,useContext,useMemo} from 'react';
import styled from 'styled-components';
import Calender from "./ReactCalender";
import Location from "./Location";
import Review from "./Review";
import { DetailContext } from "../pages/DetailPage"


const DetailHeader = ({title,location}) =>{
    return <div className="header">
        <h1 className="title">{title}</h1>
        <p>{location}</p>
        <img src="" alt={`${title}이미지`}/>
    </div>
};

const DetailGrade = ({grade})=>{
    return <p>{grade}점 </p>
};

const DetailDescription = ({description})=>{
    return <p>{description}</p>
};

const DetailTimeBtns = ({times, btnActive, funActive}) =>{
    return times.map( (time,idx)=>{
        return <div key= {`TimeButtonContainer-${idx}`}>
                <TimeButton 
                    key= {`TimeButton-${idx}`}
                    className={"btn" + (idx == btnActive ? " active" : "")} 
                    value ={idx} onClick={funActive}>{`${idx+1}타임  ${time}`}
                </TimeButton>
            </div>
    });
};

const DetailCompany = ({company}) => {
    return (
        <DetailCompanyContainer>
            <p>업체정보</p>    
            {
                Object.entries(company).map((values,idx) => {
                    return <p key={`idx${idx}-${values[0]}`}>{`${values[0]}`} : {`${values[1]}`}</p>
                })
            }
        </DetailCompanyContainer>
    );
};

const Detail = () => {
    // const [price, setPrice] = useState(0);
    const { detailData : data } = useContext(DetailContext);

    const [totalPrice, setTotalPrice] = useState(0);
    const [headCount, setHeadCount] = useState(1);
    const [timeBtnActive, setTimeBtnActive] = useState("");
    
    const handleHeadCount = (e) => {
        setHeadCount(e.target.value);
    };
    const handleTimeSelect = (e) => {
        console.log(e.target.value);
        setTimeBtnActive(e.target.value);
    };
    const handlePrice = () => {
        setTotalPrice(headCount * data.price);
    }
    // useEffect(() =>{
    //     setPrice(data.price);
    // },[]);

    // useEffect (() => {
    //     setTotalPrice(selected*price);
    // },[selected])
    // useMemo(() => handlePrice(), [headCount]);
    
    return (
        <>
            {
                data &&
    
                <DetailContainer key={`${data.title}-${new Date()}`}>
                        <DetailHeader title={data.title} location={data.location} />
                        <DetailContent>
                            <DetailInform>
                                <DetailGrade grade={data.grade} />
                                <DetailDescription description={data.description} />
                                <DetailPeriod>
                                    <div className="calender"><Calender /></div>
                                    <TimButtonContainer>
                                        <DetailTimeBtns times={data.times} btnActive={timeBtnActive} funActive={handleTimeSelect} />
                                    </TimButtonContainer>
                                </DetailPeriod>
                                <Review />
                                <Location />
                                <DetailCompany company={data.company} />
                                
                            </DetailInform>
                            
                            <Form>
                                <p>{data.price}원/명</p>
                                <select onChange={handleHeadCount} value={headCount}>
                                    {[...Array(10).keys()].map(n => <option key={`HeadCount-${n+1}`} value={n+1}  >{n+1}</option>)} 
                                </select>
                                <select>
                                    <option defaultValue="선택하세요">선택하세요</option>
                                    {data.times.map((time,idx) => <option  key={`${idx}-${time}`} value={time}>{time}</option>)}
                                </select>
                                <button type="submit">예약하기</button>
                                <p>총 합게 : {totalPrice}</p> 
                                {/* totalPrice */}
                            </Form>
                        </DetailContent>
                    </DetailContainer>
            }
        </>
    );
};


const DetailContainer = styled.div`
    display:flex;
    flex-direction:column;
    text-align: left;
    .header .title{
        display:flex;
        width:100%;
    }
`;
const DetailContent = styled.div`
    display:flex;
`;

const DetailPeriod = styled(DetailContent)`
    justify-content: flex-start;
    .calender:first-child{
        margin-right:3%;
    }
`;
const DetailInform = styled.div`
    width: 100%;
    margin-right : 3%;
`;
const Form = styled.form`
    height: 200px;
    border : 1px solid black;
    position: sticky;
    top: 20%;
`;
const DetailCompanyContainer = styled.div`
    border : 1px solid black;
`;
const TimButtonContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
`;
const TimeButton = styled.button`
    display:block;
    width : 100%;
    height : 90px;
    font-size : 1rem;
    background-color : white;
    border : 1px orange solid;
    &.active {
        background-color : orange;
        opacity: 0.5;
        color : white;
    }
`;

export default Detail;