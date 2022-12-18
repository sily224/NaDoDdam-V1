<<<<<<< HEAD:client/src/pages/Layout/Layout.jsx
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";
import Register from "../register";
import Login from "../login";

const Container = styled.main`
  padding: 0 5%;
  margin: 2% 0;
`;
=======
import {Outlet} from 'react-router-dom'
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Container = styled.main`
  min-height: 100vh;
  padding: 3% 5% 10% 5%;
  box-sizing: border-box;
  position: relative;
`
>>>>>>> 4818e69f0a85527dd21350acca9288a53b351582:client/src/pages/Layout.jsx

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
      <Login />
      <Register />
    </>
  );
};

export default Layout;
