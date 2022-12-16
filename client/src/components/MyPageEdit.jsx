import styled, {css} from 'styled-components';
import { useState } from 'react';

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
const MyPageEdit = ({id, name, title, onChangeValue}) => {
  const [change, setChange] = useState(false)
  let replaceName = '';

  if(id === 'tel') {
    replaceName =  name.slice(0, 4) + "*".repeat(name.length - 8) + name.slice(-5);
  }else if(id === 'password'){
     replaceName =  "*".repeat(name.length)
  }else{
    replaceName = name;
  }

  return(
    <StyledUserInfoWrap>
      <div>
        <div><h4>{title}</h4></div>
          <div>
            <span>{replaceName}</span>
            {!change ? 
              <button 
                onClick={() => setChange(cur => !cur)}
              >
                수정
              </button> 
              : 
              <>
                <button>확인</button> 
                <button>취소</button>
              </>
            }
            </div>
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