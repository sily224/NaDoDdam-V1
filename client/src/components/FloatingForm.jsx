import {useState,useContext} from 'react';
import { DetailContext } from "../pages/DetailPage"
import styled from 'styled-components';

const FloatingForm = () =>{
    const [headCount, setHeadCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(undefined);

    const handleHeadCount = (e) => {
        const price = data.price;
        setHeadCount(e.target.value);
        setTotalPrice(e.target.value*price);
    };

    const {detailData:data} = useContext(DetailContext);
    const {price, times} = data;

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
};

const Form = styled.form`
    height: 200px;
    border : 1px solid black;
    position: sticky;
    top: 20%;
`;
export default FloatingForm;