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

const InputFormText = styled.span``;

const Input = styled.input``;

const RegisterBtn = styled.button`
  width: 100%;
`;

const LoginBtn = styled.button``;

function Register() {
  return (
    <>
      <Modal>
        <ModalTitle>회원가입</ModalTitle>
        <InputForm>
          <InputFormText>이메일</InputFormText>
          <Input />
          <InputFormText>비밀번호</InputFormText>
          <Input placeholder="영문, 숫자, 특수문자 조합 최소 8자" />
          <Input placeholder="비밀번호 확인" />
          <InputFormText>이름</InputFormText>
          <Input />
          <InputFormText>전화번호</InputFormText>
          <Input placeholder="숫자만 입력해주세요" />
        </InputForm>
        <RegisterBtn>가입하기</RegisterBtn>
        <LoginBtn>로그인하기</LoginBtn>
      </Modal>
    </>
  );
}

export default Register;
