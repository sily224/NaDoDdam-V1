import React, { useEffect, useState } from "react";
// import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RiErrorWarningLine, RiPictureInPictureLine } from "react-icons/ri";
import styled from "styled-components";
import StickyBox from "react-sticky-box";
import { redirect } from "react-router";

const Context = styled.div``;
const H1 = styled.h1``;

const H2 = styled.h2``;

const H3 = styled.h3``;

const Info = styled.p``;

const NameInfo = styled.p``;

const Button = styled.button``;

const Line = styled.div`
  content: "  ";
  display: block;
  width: 100%;
  height: 0.5px;
  background-color: blue;
  margin: 5% 0;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const Select = styled.select``;

const Option = styled.option``;

const P = styled.p``;

const PayBackground = styled.div`
  background: grey;
  width: 300px;
`;

const PayboxTop = styled.div`
  display: flex;
  flex-direction: row;
`;

const PayboxName = styled.div`
  display: flex;
  flex-direction: column;
`;
// 예약정보
const RegervateInfo = ({ date, time, count }) => {
  return (
    <>
      <H1>예약 및 결제</H1>
      <H2>예약 정보</H2>
      <H3>날짜</H3>
      <Info>{date}</Info>
      <H3>시간</H3>
      <Info>{time}</Info>
      <H3>인원</H3>
      <Info>{count}</Info>
      <Button>예약정보수정</Button>
      <Line />
    </>
  );
};

//SideBar
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
      <PayboxTop>
        <Image src={img}></Image>
        <PayboxName>
          <NameInfo>{farmName}</NameInfo>
          <NameInfo>{programName}</NameInfo>
        </PayboxName>
      </PayboxTop>
      <H3>요금 세부정보</H3>
      <NameInfo>1인 체험권</NameInfo>
      <Info>
        {programPrice}원 X{count}
      </Info>
      <Info>{totalPrice}</Info>
      <Line />
      <Info>결제 예정 금액</Info>
      <Info>{totalPrice}</Info>
    </>
  );
};

// 예약자 정보
const RegisterInfo = ({ name, phoneNumber, email }) => {
  return (
    <>
      <H2>예약자정보</H2>
      <Info>{name}</Info>
      <Button>수정</Button>
      <Info>{phoneNumber}</Info>
      <Button>수정</Button>
      <Info>{email}</Info>
      <Button>수정</Button>
      <RiErrorWarningLine />
      <P>입력하신 예약자 정보로 결제 및 예약관련 정보가 발송됩니다.</P>
      <Line />
    </>
  );
};

//결제 수단
const PayInfo = () => {
  return (
    <>
      <H3>결제 수단</H3>
      <Select name="cardOption">
        <Option value="card">신용카드 또는 체크카드</Option>
      </Select>
      <H3>정보제공 수집 및 제공 동의</H3>
      <P>
        예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공, 취소/환불 규정에
        동의합니다.
      </P>
      <H3>환불 정책 동의</H3>
      <P>
        체험 특성상 7일 전부터 취소가 불가합니다.그 이후에는 취소 시점에 따라
        환불액이 결정됩니다.
      </P>
      <Button>More</Button>
      <Line />
      <P>주문 내용을 확인하였으며, 위 내용에 동의합니다.</P>
      <Button>확인 및 결제</Button>
    </>
  );
};

const Payment = () => {
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
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Context>
          <RegervateInfo date={date} time={time} count={count}></RegervateInfo>
          <RegisterInfo
            name={name}
            phoneNumber={phoneNumber}
            email={email}
          ></RegisterInfo>
          <PayInfo></PayInfo>
        </Context>
        <StickyBox offsetTop={20} offsetBottom={20}>
          <PayBackground>
            <PayBox
              img={img}
              farmName={farmName}
              programName={programName}
              programPrice={programPrice}
              count={count}
              totalPrice={totalPrice}
            ></PayBox>
          </PayBackground>
        </StickyBox>
      </div>
    </>
  );
};

export default Payment;
