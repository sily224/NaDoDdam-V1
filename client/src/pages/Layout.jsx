import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, {useState, useEffect} from 'react';
import Login from "../pages/login";
import Register from "../pages/register";

import {Provider} from 'react-redux';
import store from '../store/Store';


const Container = styled.main`
  min-height: 100vh;
  padding: 3% 5% 10% 5%;
  box-sizing: border-box;
  position: relative;
`;

const Layout = () => {
  const [options, setOptions] = useState({}); // 옵션 저장해서 Home 컴포넌트에 전달
  useEffect(()=>{
    console.log('layout에서의 옵션', options);  
  },[options])
  return (
    <>
      <Provider store={store}>
      <Header/>
      <Container>
        <Outlet/>
      </Container>
      </Provider>
      <Footer />
      <Login />
      <Register />
    </>
  );
};

export default Layout;

