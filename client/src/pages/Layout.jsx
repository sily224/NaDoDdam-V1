import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useState} from 'react';

const Container = styled.main`
  padding: 0 5%;
  margin: 2% 0;
`;

const Layout = () => {
  const [globalState, setGlobalState] = useState({
    contents : [],
    currentIndex : '0'
  });

  return (
    <>
      <Header setGlobalState={setGlobalState} />
      <Container>
        <Outlet context={[globalState, setGlobalState]}/>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;