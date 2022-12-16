// import pay from ".../public/pay.json";
import React, { useEffect, useState } from "react";
// import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RiErrorWarningLine, RiPictureInPictureLine } from "react-icons/ri";
import styled from "styled-components";
import StickyBox from "react-sticky-box";

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
      <hr />
      <p>결제 예정 금액</p>
      <p>{totalPrice}</p>
    </>
  );
};

//PayInfo
const PayInfo = () => {
  return (
    <>
      <h3>결제 수단</h3>
      <select name="cardOption">
        <option value="card">신용카드 또는 체크카드</option>
      </select>
      <p>정보제공 수집 및 제공 동의</p>
      <p>
        예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공, 취소/환불 규정에
        동의합니다.
      </p>
      <p>환불 정책 동의</p>
      <p>
        체험 특성상 7일 전부터 취소가 불가합니다.그 이후에는 취소 시점에 따라
        환불액이 결정됩니다.
      </p>
      <button>More</button>
      <hr />
      <p>주문 내용을 확인하였으며, 위 내용에 동의합니다.</p>
      <button>확인 및 결제</button>
    </>
  );
};

const RegisterInfo = ({ name, phoneNumber, email }) => {
  return (
    <>
      <h2>예약자정보</h2>
      <p>{name}</p>
      <button>수정</button>
      <p>{phoneNumber}</p>
      <button>수정</button>
      <p>{email}</p>
      <button>수정</button>
      <RiErrorWarningLine />
      <p>입력하신 예약자 정보로 결제 및 예약관련 정보가 발송됩니다.</p>
      <hr />
    </>
  );
};
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
        setName(res.data[0].name);
        setPhoneNumber(res.data[0].phoneNumber);
        setEmail(res.data[0].email);
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
      <div style={{ color: "red", display: "flex", alignItems: "flex-start" }}>
        <div>
          <RegervateInfo date={date} time={time} count={count}></RegervateInfo>
          <RegisterInfo
            name={name}
            phoneNumber={phoneNumber}
            email={email}
          ></RegisterInfo>
          <PayInfo></PayInfo>
        </div>
        <StickyBox offsetTop={20} offsetBottom={20}>
          <PayBox
            img={img}
            farmName={farmName}
            programName={programName}
            programPrice={programPrice}
            count={count}
            totalPrice={totalPrice}
          ></PayBox>
        </StickyBox>
      </div>
    </>
  );
};

export default Pay;

const Context = styled.div`
  color: red;
  display: "flex";
  alignitems: "flex-start";
`;
// style={{ display: "flex", alignItems: "flex-start" }}
