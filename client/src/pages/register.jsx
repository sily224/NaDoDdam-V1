import React from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";

const ModalTitle = styled.h1`
  color: blue;
  text-align: center;
  font-size: 1.5rem;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10% 0;
`;

const Label = styled.label``;

const Input = styled.input``;

const RegisterBtn = styled.button`
  width: 100%;
`;

const LoginBtn = styled.button``;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }, // 제출중이라면 가입하기 버튼 disabled됨
  } = useForm();

  return (
    <>
      <Modal>
        <ModalTitle>회원가입</ModalTitle>
        <InputForm
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
        >
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" required {...register("email")} />
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            placeholder="영문, 숫자, 특수문자 조합 최소 8자"
            required
            {...register("password", {
              minLength: {
                value: 8,
                message: "최소 8자 이상의 비밀번호를 입력해주세요.",
              },
              maxLength: {
                value: 16,
                message: "16자 이하의 비밀번호만 사용가능합니다.",
              },
              pattern: {
                value: /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$/,
                message: "영문, 숫자, 특수문자를 혼용하여 입력해주세요.",
              },
            })}
          />
          <Input placeholder="비밀번호 확인" required />
          <Label
            htmlFor="name"
            {...register("name", {
              maxLength: {
                value: 15,
                message: "15자 이상의 이름은 입력할 수 없습니다.",
              },
            })}
          >
            이름
          </Label>
          <Input id="name" required />
          <Label htmlFor="phoneNumber">전화번호</Label>
          <Input
            id="phoneNumber"
            placeholder="숫자만 입력해주세요"
            required
            {...register("phoneNumber", {
              minLength: {
                value: 5,
                message: "올바른 전화번호를 입력해주세요",
              },
              maxLength: {
                value: 13,
                message: "올바른 전화번호를 입력해주세요",
              },
            })}
          />
          {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )}
          <RegisterBtn type="submit" disabled={isSubmitting}>
            가입하기
          </RegisterBtn>
        </InputForm>
        <LoginBtn>로그인하기</LoginBtn>
      </Modal>
    </>
  );
}

export default Register;
