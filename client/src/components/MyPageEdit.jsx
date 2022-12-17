import styled, {css} from 'styled-components';
import { useState, useEffect } from 'react';
import { StyledButton, StyledInfoTitle, StyledUserInfo } from '../pages/MyPage';

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

const MyPageEdit = ({id, name, title, onChangeValue, handleCancle, setname}) => {
  const [gname, setName] = useState({})

  useEffect(() => {
    let replaceName = '';

    if(id === 'tel') {
      replaceName =  name.slice(0, 3) + "*".repeat(name.length - 6) + name.slice(-4);
    }else if(id === 'password'){
      replaceName =  "*".repeat(name.length)
    }else{
      replaceName = name;
    }

    console.log(replaceName)
    
    setName({
      value: replaceName,
      isEditMode: false,
    })
  },[name])

  const [change, setChange] = useState(false);
 
  const changeEditMode = () => {
    setName({
      ...gname,
      isEditMode: true,
    })
  }

  console.log(gname.value)

  const DefaultView = () => {
    return (
      <div>
          <StyledUserInfo>
            <div>
               <span>{gname.value}</span>
            </div>
           <div>
              <StyledButton 
                onClick={changeEditMode}
                >
                수정
              </StyledButton> 
           </div>
            </StyledUserInfo>
      </div>
    )
  }

  const RenderEditView = () => {
    return (
      <StyledUserInfo>
      <form>
          <label></label>
            <input 
              id={setname}
              name={id} 
              type={id === "password" ? "password" : "text"} 
              defaultValue={gname.value}
            />
        </form>
        <StyledButton
        onClick={(e) => {
          setChange(cur => !cur);
          }}
        >확인</StyledButton> 
        <StyledButton type="reset" onClick={(e) => {
          setChange(cur => !cur);
          }}>취소</StyledButton>
      </StyledUserInfo>
    )
  }

  

  return(
    <StyledUserInfoWrap>
      <div><h4>{title}</h4></div>
      {gname.isEditMode ? <RenderEditView/> : <DefaultView />}
    </StyledUserInfoWrap>  
    )
   
}

export default MyPageEdit