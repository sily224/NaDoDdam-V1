// import pay from ".../public/pay.json";
import { useEffect, useState } from "react";
// import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const PageTittle = ({ title }) => {
  return <h1>{title}</h1>;
};
const RegervateTittle = ({ title }) => {
  return <h2>{title}</h2>;
};
const Date = ({ title, date, button }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{date}</p>
      <button>{button}</button>
    </>
  );
};
const Time = ({ title, time, button }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{time}</p>
      <button>{button}</button>
    </>
  );
};
const Count = ({ title, count, button }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{count}</p>
      <button>{button}</button>
    </>
  );
};
const RegervateInfo = ({ date, time, count }) => {
  return (
    <>
      <PageTittle title="예약 및 결제" />
      <RegervateTittle title="예약 정보" />
      <Date title="날짜" date={date} button="수정"></Date>
      <Time title="시간" time={time} button="수정"></Time>
      <Count title="인원" count={count} button="수정"></Count>
      <hr />
    </>
  );
};
const PayTittle = ({ title }) => {
  return <h3>{title}</h3>;
};
const PayBox = ({ img, farmName, programName, programPrice, count }) => {
  // const totalPrice = { programPrice } * { count };
  const totalPrice = Number(programName) * Number(count);
  // console.log(typeof programName);
  const programName1 = Number(programName);
  console.log(typeof programName1);
  console.log(programName1);
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
const PayButton = () => {
  return (
    <>
      <button>결제하기</button>
    </>
  );
};
const PayInfo = () => {
  return (
    <>
      <PayTittle title="결제" />
      <PayButton />
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

  const GetPayData = async () => {
    const payData = await axios.get("http://localhost:3000/pay.json");
    setDate(payData.data[0].date);
    setTime(payData.data[0].time);
    setCount(payData.data[0].count);
    setImg(payData.data[0].img);
    setFarmName(payData.data[0].farmName);
    setProgramName(payData.data[0].programName);
    setProgramPrice(payData.data[0].programPrice);
    setCount(payData.data[0].count);
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
