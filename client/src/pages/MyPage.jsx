import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyPageProfileEdit from '../components/MyPageProfileEdit';
import MyPageSecurityEdit from '../components/MyPageSecurityEdit';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { AiOutlineExclamationCircle } from "react-icons/ai";


const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`

const StyledTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 3%;
  display: inline-block;

  &::after {
    content:'';
    width: 100%;
    height: 2px;
    background-color:lightgray;
    display: block;
    position: absolute;
  }
`
const StyledUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
const StyledUserInfoWrap = styled.div`
  position: relative;
  padding-bottom: 1%;
  &::after {
    content:'';
    width: 100%;
    height: 1px;
    background-color:lightgray;
    display: block;
    position: absolute;
    bottom: 0;
}
`
const StyledButton = styled.button`
  border: none;
  position: relative;
  background: none;
  text-decoration: underline;
  font-size: 1rem;
`

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({}); 

  const getUserInfo = async () => {
    const token = getToken();
    const res = await userApi.get("//localhost:3500/api/myInfo", {
      headers: {
        authorization: token,
      },
    });
    setUserInfo({
      id:res.data.id,
      name: res.data.name,
      phoneNum: res.data.phoneNum,
      email: res.data.email,
    })
  };
  
  useEffect(() => {
    getUserInfo();
  },[]);

  const {id, name, phoneNum, email} = userInfo;

  const list = [
    {
     id:"name",
     title: "이름",
     name: `${name}`,
    },
    {
      id:"phoneNum",
      title:"전화번호",
      name: `${phoneNum}`,
    },
    {
      id:"email",
      title:"이메일",
      name: `${email}`,
    },
  ]

  return (
    <Container>
      <StyledTitle>내 정보 관리</StyledTitle>
      <h4>기본정보<AiOutlineExclamationCircle/></h4>
      {list.map((item) => (
        <MyPageProfileEdit 
          key={item.id}
          id={item.id}
          name={item.name}
          title={item.title}
          userId={id}
        />
      ))}
      <h4>보안설정<AiOutlineExclamationCircle/></h4>
      <MyPageSecurityEdit
        userId={id}
      />
    </Container>
  )
}


export { MyPage, StyledButton, StyledUserInfo, StyledUserInfoWrap };