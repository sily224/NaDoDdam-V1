import { Link } from 'react-router-dom';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { HiUserCircle, HiMenu } from "react-icons/hi";

const StyledHeader = styled.header`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:space-between;
  align-items:center;
  padding: 1.2% 2.1%;
  box-sizing:border-box;
  border-bottom: 1px solid lightgray;
`;

const StyledSearchBar = styled.div`
    border-radius: 20px;
    height: 40px;
    width: 300px;
    position: relative;
    border: 1px solid #c3c2c2;

  > svg {
    position: absolute;
    top:6px;
    right:5px;
  }
`
const StyledProfile = styled.div`
  border-radius: 20px;
  border: 1px solid #c3c2c2;
  padding: 3px;
  ${props => props.toggle && css`
    box-shadow: 0 2px 4px rgba(0,0,0,0.18);
    transition: box-shadow 0.2s ease;
 `}
   button {
    border: none;
    background: transparent;
    display:flex;
    align-items:center;
  }

  svg + svg {
    padding-left: 3px;
  }
`

const StyledMenu = styled.div`
 display: none;
 ${props => props.toggle && css`
    display: block;
 `}
 position: absolute;
 top: 10%;
 right: 2.1%;
 background: #fff;
 border-radius: 10px;
 border: 1px solid #c3c2c2;
 box-shadow: 0 2px 4px rgba(0,0,0,0.18);
 width: 15%;
`



const Header = () => {
  const [toggleMenu, setToogleMene] = useState(false);

  const handleToggleMenu = () => {
    setToogleMene(prev => !prev);
  }

  return (
    <StyledHeader>
        <img src="" alt="logo" />
    <StyledSearchBar><AiOutlineSearch size="25px"/></StyledSearchBar>
    <div>
    <StyledProfile toggle={toggleMenu}>
      <button onClick={handleToggleMenu}>
        <HiMenu size="25px"/>
        <HiUserCircle size="30px"/>
      </button>
    </StyledProfile>
    <StyledMenu toggle={toggleMenu}>
        <Link to="/login">
          로그인
        </Link>
        <li>
          회원가입
        </li>
    </StyledMenu>
    
    </div>
    </StyledHeader>
  )
}

export default Header;