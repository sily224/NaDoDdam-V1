// import pay from ".../public/pay.json";
import { useEffect, useState } from "react";
// import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

//RegervateInfo
const RegervateInfo = ({ date, time, count }) => {
  return (
    <>
      <h1>예약 및 결제</h1>
      <h2>예약 정보</h2>
      <h3>날짜</h3>
      <p>{date}</p>
      <h3>시간</h3>
      <p>{time}</p>
      <h3>인원</h3>
      <p>{count}</p>
      <button>예약정보수정</button>
      <hr />
    </>
  );
};

//PayBox
const PayBox = ({
  img,
  farmName,
  programName,
  programPrice,
  count,
  totalPrice,
}) => {
  // console.log(`programPrice`, typeof programPrice); number
  // console.log(`count`, typeof count); number

  // const [totalPrice, setTotalPrice] = useState("");
  // const [totalPriceNum, setTotalPriceNum] = useState("");
  // setTotalPrice({ programPrice } * { count });
  // setTotalPriceNum(Number(programName) * Number(count));
  // console.log(`typeof totalPrice`, typeof totalPrice);
  // console.log(`totalPrice`, totalPrice);
  // console.log(`typeof totalPriceNum`, typeof totalPriceNum);
  // console.log(`totalPriceNum`, totalPriceNum);

  // console.log(typeof programName);
  // const programName1 = Number(programName);
  // console.log(typeof programName1);
  // console.log(programName1);
  // console.log(totalPrice1);
  return (
    <>
      <img src={img}></img>
      <p>{farmName}</p>
      <p>{programName}</p>
      <p>요금 세부정보</p>
      <p>1인 체험권</p>
      <p>
        {programPrice}원 X{count}
      </p>
      <p>{totalPrice}</p>
      <p>결제 예정 금액</p>
      <p>{totalPrice}</p>
    </>
  );
};

//PayInfo
const PayInfo = () => {
  return (
    <>
      <h3 title="결제" />
      <button>결제하기</button>
    </>
  );
};
// const Customer = (name, phoneNumber, email) => {
//   return (
//     <>
//       <form>
//         <h2>예약자정보</h2>
//         <input type="text" value={name} />
//         <input type="text" value={phoneNumber} onChange={NameHandler} />
//         <input type="text" value={email} />
//       </form>
//     </>
//   );
// };
// const NameHandler = (e) => {
//   return setName(e.target.value);
// };

const Pay = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [farmName, setFarmName] = useState("");
  const [programName, setProgramName] = useState("");
  const [img, setImg] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [count, setCount] = useState("");
  const [programPrice, setProgramPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("12");

  const GetPayData = async () => {
    try {
      await axios.get("/pay.json").then((res) => {
        console.log(res.data);
        setDate(res.data[0].date);
        setTime(res.data[0].time);
        setCount(res.data[0].count);
        setImg(res.data[0].img);
        setFarmName(res.data[0].farmName);
        setProgramName(res.data[0].programName);
        setProgramPrice(res.data[0].programPrice);
        setCount(res.data[0].count);
        const firstTotalPrice = programPrice * count;
        setTotalPrice(firstTotalPrice);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    GetPayData();
  }, []);
  return (
    <>
      {/* <Customer
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        onchang={CustomerHandler}
      ></Customer> */}
      <RegervateInfo date={date} time={time} count={count}></RegervateInfo>
      <PayBox
        img={img}
        farmName={farmName}
        programName={programName}
        programPrice={programPrice}
        count={count}
        totalPrice={totalPrice}
      ></PayBox>
      <PayInfo></PayInfo>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Pay;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;

// `;
