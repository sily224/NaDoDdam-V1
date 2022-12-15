import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`
const StyledTitle = styled.span`
  font-size: 2rem;
  font-weight: bold;
  position: relative;

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
const StyledInfoSubmit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-direction: column;

  > input {
    border:1px solid black;
    border-radius: 10px;
    padding: 5%;
    margin-bottom: 4%;
  }

  > button {
    background: lightgray;
    border:none;
    border-radius:10px;
    padding: 5% 10%;
  }
`
const StyledButton = styled.button`
  border: none;
  position: relative;
  background: none;
  text-decoration: underline;
`

const MyPage = () => {
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

  const handleInfoChange = (e) => {
    const { value, name } = e.target; 
      setUserInfo({
        ...userInfo, 
        [name]: value 
      });
  };

  const [change, setChange] = useState(false)

  const handleInfoChangeBtn = () => {
    setChange(current => !current)
  }

  return (
    <Container>
      <StyledTitle>내 정보 관리</StyledTitle>
          <div>
            <StyledInfoTitle>이름</StyledInfoTitle>
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
          </div>
    </Container>
  )
}

export default MyPage;