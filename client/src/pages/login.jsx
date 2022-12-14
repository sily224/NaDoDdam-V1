import React from "react";
import styled from "styled-components";
import Modal from "../components/Modal";

const ModalTitle = styled.h1`
  color: blue;
  text-align: center;
  font-size: 1.5rem;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10% 0;
`;

const Input = styled.input``;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  + button {
    margin-top: 2%;
  }
`;

const Line = styled.div`
  content: "  ";
  display: block;
  width: 100%;
  height: 0.5px;
  background-color: gray;
  margin: 5% 0;
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
`;
const SocialButton = styled.button`
  + button {
    margin-left: 1rem;
  }
`;

function Login() {
  return (
    <>
      <Modal>
        <ModalTitle>로그인</ModalTitle>
        <InputForm>
          <Input placeholder="이메일" />
          <Input placeholder="비밀번호" />
        </InputForm>
        <ButtonWrapper>
          <Button>로그인</Button>
          <Button>회원가입</Button>
        </ButtonWrapper>
        <Line />
        <SocialLogin>
          <SocialButton>카카오</SocialButton>
          <SocialButton>구글</SocialButton>
        </SocialLogin>
      </Modal>
    </>
  );
}

export default Login;
