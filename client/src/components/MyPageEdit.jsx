import styled, {css} from 'styled-components';
import { useState } from 'react';
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

const MyPageEdit = ({id, name, title, onChangeValue,handleCancle}) => {
  let replaceName = '';

  if(id === 'tel') {
    replaceName =  name.slice(0, 3) + "*".repeat(name.length - 6) + name.slice(-4);
  }else if(id === 'password'){
     replaceName =  "*".repeat(name.length)
  }else{
    replaceName = name;
  }

  const [change, setChange] = useState(false);
  const [gname, setName] = useState(replaceName);
  const handleCancleButton = () => {
    setChange(cur => !cur)
  }

  return(
    <StyledUserInfoWrap>
      <div>
        <div><h4>{title}</h4></div>
          <StyledUserInfo>
            <div>
               <span style={{display:`${!change ? "block" : "none"}`}}>{replaceName}</span>
            </div>
           <div>
             {!change ? 
              <StyledButton 
                onClick={() => setChange(cur => !cur)}>
                수정
              </StyledButton> 
              : 
              <>
                <StyledButton
                onClick={(e) => {
                  setChange(cur => !cur);
                  }}
                >확인</StyledButton> 
                <StyledButton 
                  onClick={(e) => {
                  setChange(cur => !cur);
                  }}>취소</StyledButton>
              </>
            }
           </div>
            </StyledUserInfo>
        </div>
        {!change ? null : (
          <form>
            <label></label>
            <input 
              name={id} 
              type={id === "password" ? "password" : "type"} 
              value={name} 
              onChange={(e) => onChangeValue(e)}
            />
        </form> 
        )}
    </StyledUserInfoWrap>  
    )
   
}

export default MyPageEdit