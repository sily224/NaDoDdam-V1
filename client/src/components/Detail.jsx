<<<<<<< HEAD
import React,{useState,useEffect,useContext,useMemo} from 'react';
=======
import React,{useState,useContext,useMemo} from 'react';
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
import styled from 'styled-components';
import Calender from "./ReactCalender";
import Location from "./Location";
import Review from "./Review";
<<<<<<< HEAD
import TimeBtns from "./TimeBtns";
=======
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
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

<<<<<<< HEAD
=======
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
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c

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

<<<<<<< HEAD
const FloatingForm = ({price,times,handleHeadCount,headCount,totalPrice}) =>{
    return(
        <Form>
            <p>{price}원/명</p>
            <select onChange={handleHeadCount} value={headCount}>
                {[...Array(10).keys()].map(n => <option key={`HeadCount-${n+1}`} value={n+1} >{n+1}</option>)} 
            </select>
            <select>
                <option defaultValue="선택하세요">선택하세요</option>
                {times.map((time,idx) => <option  key={`${idx}-${time}`} value={time}>{time}</option>)}
            </select>
            <button type="submit">예약하기</button>
            <p>총 합게 : { totalPrice || price }</p> 
        </Form>
    );
}

const Detail = () => {
    const {detailData : data} = useContext(DetailContext);
    const [headCount, setHeadCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(undefined);

    const handleHeadCount = (e) => {
        const price = data.price;
        setHeadCount(e.target.value);
        setTotalPrice(e.target.value*price);
    };

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
                                <div className="calender"><Calender period={data.period}/></div>
                                <TimButtonContainer>
                                    <TimeBtns  />
                                </TimButtonContainer>
                            </DetailPeriod>
                            <Review />
                            <Location />
                            <DetailCompany company={data.company} />
                            
                        </DetailInform>
                        
                        <FloatingForm price={data.price} times={data.times} handleHeadCount={handleHeadCount} headCount={headCount} totalPrice={totalPrice} />
                    </DetailContent>
                </DetailContainer>
            } 
=======
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
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
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
<<<<<<< HEAD

=======
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
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c

export default Detail;