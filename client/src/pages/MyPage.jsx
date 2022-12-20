import { useState } from 'react';
import styled from 'styled-components';
import MyPageEdit from '../components/MyPageEdit';
import * as userApi from "../lib/userApi";
import { useEffect } from 'react';
import { getToken } from '../utils/utils';

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
  padding-bottom: 2%;
  &::after {
    content:'';
    width: 100%;
    height: 2px;
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
  const [change, setChange] = useState(false);
  const [pwd, setPwd] = useState({
    currentPassword: '',
    newPassword: '',
  })

  const onChange = (e) => {
    const {name, value} = e.target
    setPwd({
      ...pwd,
      [name]: value,
    })
  }
  
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

  const upDatePassword = async(e) => {
    e.preventDefault();
    await userApi.passwordPatch(`//localhost:3500/myPasword/${id}`, {
      currentPassword: pwd.newPassword, 
      data: pwd.currentPassword
    }); 
  }
  

  return (
    <Container>
      <StyledTitle>내 정보 관리</StyledTitle>
      {list.map((item) => (
        <MyPageEdit 
          key={item.id}
          id={item.id}
          name={item.name}
          title={item.title}
          userId={id}
        />
      ))}
      <StyledUserInfoWrap>
        <div><h4>비밀번호</h4></div>
          <StyledUserInfo>
            {!change ? <span></span> : (<form onSubmit={upDatePassword}>
              <label>현재비밀번호</label>
              <input type="password" name="currentPassword" onChange={onChange}></input>
              <label>새비밀번호</label>
              <input type="password"  name="newPassword" onChange={onChange}></input>
              <input type="password" placeholder='비밀번호 확인'></input>
              <button type="submit">저장</button>
              </form>
            )}
              <StyledButton onClick={(e) => {
                setChange(prev => !prev)
                }}>{!change ? '비밀번호재설정' : '취소'}</StyledButton>
          </StyledUserInfo>
      </StyledUserInfoWrap>
      <StyledUserInfoWrap>
        <div><h4>회원탈퇴</h4></div>
          <StyledUserInfo>
            <span>탈퇴 시 복구 할 수 없습니다.</span>
              <StyledButton>회원탈퇴</StyledButton>
          </StyledUserInfo>
      </StyledUserInfoWrap>
    </Container>
  )
}


export { MyPage, StyledButton, StyledUserInfo, StyledUserInfoWrap };