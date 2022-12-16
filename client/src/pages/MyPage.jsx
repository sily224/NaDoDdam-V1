import { useState } from 'react';
import styled, {css} from 'styled-components';
import MyPageEdit from '../components/MyPageEdit';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`

const StyledTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 6%;
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
const StyledInfoTitle = styled.span`
  font-weight: 700;
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
// const StyledInfoSubmit = styled.form`
//   ${props=>props.action && css`
//   display: flex;
//   justify-content: space-between;
//   align-items: baseline;
//   flex-direction: column;

//   > input {
//     border:1px solid black;
//     border-radius: 10px;
//     padding: 5%;
//     margin-bottom: 4%;
//   }

//   > button {
//     background: lightgray;
//     border:none;
//     border-radius:10px;
//     padding: 5% 10%;
//   }
//   `}
//   display: none;
// `
const StyledButton = styled.button`
  border: none;
  position: relative;
  background: none;
  text-decoration: underline;
  &:action {
    background: #000;
  }
`

const MyPage = () => {
  const token = localStorage.getItem('token');

  const user = {
    name : '홍길동',
    tel: '010-1234-5678',
    email: '1234@test.com',
    password: '123456',
  }

  const [userInfo, setUserInfo] = useState({
    name: `${user.name}`,
    tel: `${user.tel}`,
    email: `${user.email}`,
    password: `${user.password}`
  }); 

  const {name, tel, email, password} = userInfo;

  const list = [
    {
     id:"name",
     title: "이름",
     name: `${name}`,
     isClicked: false,
    },
    {
      id:"tel",
      title:"전화번호",
      name: `${tel}`,
      isClicked: false,
    },
    {
      id:"email",
      title:"이메일",
      name: `${email}`,
      isClicked: false,
    },
    {
      id:"password",
      title:"비밀번호",
      name: `${password}`,
      isClicked: false,
    }
  ]

  
  const handleInfoChange = (e) => {
    const { value, name } = e.target;
    console.log(e.target)
      setUserInfo({
        ...userInfo, 
        [name]: value 
      });
  };

  const handleCancle = (e) => {
    setUserInfo({
      ...userInfo
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
              onChangeValue={handleInfoChange}
              onClickCancle={handleCancle}
           />
          ))}
          <div>
            <StyledInfoTitle>회원탈퇴</StyledInfoTitle>
            <StyledUserInfo>
              <StyledButton>회원탈퇴</StyledButton>
            </StyledUserInfo>
          </div>
    </Container>
  )
}

export { MyPage, StyledButton, StyledInfoTitle, StyledUserInfo };