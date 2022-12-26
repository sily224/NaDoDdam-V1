import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components'
import { StyledButton, StyledUserInfo, StyledUserInfoWrap } from '../pages/MyPage';
import * as userApi from "../lib/userApi";
import { useNavigate } from 'react-router-dom';
// 입력 폼, 유효성 검사 패키지
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {formSchema} from '../hooks/useForm';
import { logout } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './Modal';
import { showModal } from '../store/ModalSlice';
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

const StyledModal = styled.div`
    display: flex;
    flex-direction: column;
`

const MyPageProfileEdit = ({id, name, title, userId}) => {
  const [reName, setReName] = useState({});
  const [change, setChange] = useState(false);
  const textInput = useRef();
  const navigate = useNavigate()

  const setReplaceName = useCallback(() => {
    setReName({
      value: name,
    });
  },[name]);

  useEffect(() => {
    setReplaceName();
  },[setReplaceName]);
 
  const changeEditMode = (e) => {
    setChange(cur => !cur);
  };

  const upDateComponents = async() => {
    if(textInput.current.dataset.id === "email"){
      
    }
    try {
      setChange(cur => !cur);
      setReName({
      ...reName,
      value: textInput.current.value,
      });
     await userApi.patch(`//localhost:3500/api/myInfo/${userId}`, {
      [textInput.current.dataset.id]: textInput.current.value,
      }); 
    } catch(err) {
      console.log(err)
    }
    
    navigate('/mypage')
  }

  const DefaultView = () => {
    return (
      <StyledUserInfo>
        <div><span>{reName.value}</span></div>
        <div>
          <StyledButton onClick={changeEditMode}>수정</StyledButton> 
        </div>
      </StyledUserInfo>
    )
  };

  const RenderEditView = () => {
    return (
      <StyledUserInfo>
        <div>
          <Input 
            id={id}
            name={id} 
            type={id === "password" ? "password" : "text"} 
            defaultValue={reName.value}
            ref={textInput}
            data-id={id}
          />
        </div>
        <div>
          <StyledButton onClick={upDateComponents}>확인</StyledButton> 
          <StyledButton onClick={changeEditMode}>취소</StyledButton>
        </div>
      </StyledUserInfo>
    )
  };

  return(
    <StyledUserInfoWrap>
      <div><h4>{title}</h4></div>
      {change ? <RenderEditView/> : <DefaultView />}
    </StyledUserInfoWrap>  
  )
}

const MyPageSecurityEdit = ({userId}) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }, // 제출중이라면 가입하기 버튼 disabled됨
	} = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

  const upDatePassword = async({oldpassword, password}) => {
    try {
      await userApi.patch(`//localhost:3500/api/myPasword/${userId}`, {
        currentPassword: oldpassword,
        password: password,
      }); 
    } catch (err) {
      console.log(err.response.data.Error)
    }
  };

  const deleteUser = async() => {
    try {
      await userApi.delete(`//localhost:3500/api/myInfo/${userId}`);
      logout();
    } catch (err) {
      console.log(err.response.data.Error)
    }
  };

  return (
    <>
      <StyledUserInfoWrap>
          <StyledUserInfo>
            <div><h4><AiOutlineLock />비밀번호</h4></div>
            <StyledForm onSubmit={handleSubmit((data) => upDatePassword(data))}>
              {modalOpen && 
                <ModalContainer w="25%" h="60%">
                  <StyledModal>
                  <label>현재비밀번호</label>
                  <Input 
                    type="password" 
                    name="currentPassword" 
                    {...register('oldpassword')}/>
                  <label>새비밀번호</label>
                  <Input 
                    type="password" 
                    name="newPassword" 
                    {...register('password')} />
                  {errors.password && (
                    <small role="alert">{errors.password.message}</small>
                  )}
                  <Input 
                    type="password" 
                    name="newPasswordConfirm" 
                    placeholder='비밀번호 확인' 
                    {...register('passwordConfirm')}/>
                  {errors.passwordConfirm && (
                  <small role="alert">{errors.passwordConfirm.message}</small>
                  )}
                  <button type="submit" disabled={isSubmitting}>저장</button>
                  </StyledModal>
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

export{MyPageProfileEdit, MyPageSecurityEdit}
