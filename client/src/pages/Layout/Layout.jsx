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
