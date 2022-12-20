import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, {useState, useEffect} from 'react';

const Container = styled.main`
  padding: 0 5%;
  margin: 2% 0;
`;

const Layout = () => {
  // const [globalState, setGlobalState] = useState({
  //   contents : [],
  //   // currentIndex : '0',
  //   page : 0,
  //   options : {},
  // });

  const [options, setOptions] = useState({}); // 옵션 저장해서 Home 컴포넌트에 전달

  useEffect(()=>{
    console.log('layout에서의 옵션', options);  
  },[options])

  return (
    <>
      <Header options={options} setOptions={setOptions} />
      <Container>
        <Outlet context={[options, setOptions]}/>
      </Container>
      <Footer />
    </>
  );
};

export default React.memo(Layout);