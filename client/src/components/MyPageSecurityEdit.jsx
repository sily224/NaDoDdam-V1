import * as userApi from "../lib/userApi";
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {formSchema} from '../hooks/useForm';

import { logout } from '../utils/utils';
import { StyledButton, StyledUserInfo, StyledUserInfoWrap } from '../pages/MyPage';

import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from '../components/Modal';
import { showModal } from '../store/ModalSlice';

import styled from 'styled-components';
import { AiOutlineLock } from "react-icons/ai";
import { AiOutlineUserDelete } from "react-icons/ai";

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid lightgray;
  padding: 10px;
`

const StyledForm = styled.form`
 display: flex;
`

const MyPageSecurityEdit = ({userId}) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors }, // 제출중이라면 가입하기 버튼 disabled됨
	} = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

  const upDatePassword = async({oldpassword, password}) => {
    try {
      await userApi.passwordPatch(`//localhost:3500/api/myPasword/${userId}`, {
        currentPassword: oldpassword,
        password: password,
      }); 
    } catch (err) {
      console.log(err.response.data.Error)
    }
  }

  const deleteUser = async() => {
    try {
      await userApi.delete(`//localhost:3500/api/myInfo/${userId}`);
      logout();
    } catch (err) {
      console.log(err.response.data.Error)
    }
  }

  return (
    <>
      <StyledUserInfoWrap>
          <StyledUserInfo>
            <div><h4><AiOutlineLock />비밀번호</h4></div>
            <StyledForm onSubmit={handleSubmit((data) => upDatePassword(data))}>
              {modalOpen && 
                <ModalContainer>
                  <label>현재비밀번호</label>
                  <Input type="password" name="currentPassword" {...register('oldpassword')}/>
                  <label>새비밀번호</label>
                  <Input type="password"  name="newPassword" {...register('password')} />
                  {errors.password && (
                    <small role="alert">{errors.password.message}</small>
                  )}
                  <Input type="password" placeholder='비밀번호 확인' {...register('passwordConfirm')}/>
                  {errors.passwordConfirm && (
                  <small role="alert">{errors.passwordConfirm.message}</small>
                  )}
                  <button type="submit" disabled={!isValid}>저장</button>
                </ModalContainer>
              }
            </StyledForm>
            <StyledButton onClick={() => {
              dispatch(showModal())
            }}>
              비밀번호재설정
            </StyledButton>
          </StyledUserInfo>
      </StyledUserInfoWrap>
      <StyledUserInfoWrap>
          <StyledUserInfo>
            <div><h4><AiOutlineUserDelete/>회원탈퇴</h4></div>
            <StyledButton onClick={deleteUser}>회원탈퇴</StyledButton>
          </StyledUserInfo>
      </StyledUserInfoWrap>
      </>
    )
}

export default MyPageSecurityEdit;