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
const StyledInfoTitle = styled.p`
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
           />
          ))}
            {/* {list.map(item => {
              return (<div key={item.id}>
                <StyledInfoTitle>{item.title}</StyledInfoTitle>
                <StyledUserInfo>
                  {!change ? <span>{item.name}</span> : (
                    <StyledInfoSubmit>
                      <input name={item.id} type={item.id === "password" ? "password" : "type"} value={item.name} onChange={handleInfoChange} />
                      <button>저장하기</button>
                    </StyledInfoSubmit>
                  )}
                {!change ? <StyledButton type="button" onClick={(e)=>console.log(e.target)}>수정</StyledButton> : <StyledButton>취소</StyledButton>}
              </StyledUserInfo>
              </div>)
            })} */}
            {/* <StyledInfoTitle>이름</StyledInfoTitle>
              <StyledUserInfo>
                <StyledInfoSubmit>
                  {!change ? `${name}` : (
                    <>
                      <input name="name" type="text" value={name} onChange={handleInfoChange} />
                      <button>저장하기</button>
                    </>
                  )}
                </StyledInfoSubmit>
                <StyledButton onClick={handleInfoChangeBtn}>{!change ? '수정' : '취소'}</StyledButton>
              </StyledUserInfo>
          </div>
          <div>
              <StyledInfoTitle>전화번호</StyledInfoTitle>
              <StyledUserInfo>
                <StyledInfoSubmit>
                  {!change ? `${tel}` : (
                    <>
                      <input name="tel" type="text" value={tel} onChange={handleInfoChange} />
                      <button>저장하기</button>
                    </>
                  )}
                </StyledInfoSubmit>
                <StyledButton onClick={handleInfoChangeBtn}>{!change ? '수정' : '취소'}</StyledButton>
              </StyledUserInfo>
          </div>
          <div>
            <StyledInfoTitle>이메일</StyledInfoTitle>
            <StyledUserInfo>
              <StyledInfoSubmit>
                {!change ? `${email}` : (
                  <>
                    <input name="email" type="text" value={email} onChange={handleInfoChange} />
                    <button>저장하기</button>
                  </>
                )}
              </StyledInfoSubmit>
              <StyledButton onClick={handleInfoChangeBtn}>{!change ? '수정' : '취소'}</StyledButton>
            </StyledUserInfo>
          </div>
          <div>
            <StyledInfoTitle>비밀번호</StyledInfoTitle>
            <StyledUserInfo>
              <StyledInfoSubmit>
                {!change ? `${password}` : (
                  <>
                    <input name="password" type="text" value={password} onChange={handleInfoChange} />
                    <button>저장하기</button>
                  </>
                )}
              </StyledInfoSubmit>
              <StyledButton onClick={handleInfoChangeBtn}>{!change ? '비밀번호 재설정' : '취소'}</StyledButton>
            </StyledUserInfo>
          </div> */}
          <div>
            <StyledInfoTitle>회원탈퇴</StyledInfoTitle>
            <StyledUserInfo>
              <StyledButton>회원탈퇴</StyledButton>
            </StyledUserInfo>
          </div>
    </Container>
  )
}

export default MyPage;