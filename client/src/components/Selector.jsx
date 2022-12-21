import styled from "styled-components";
import React, {useEffect} from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import optionSlice from '../store/OptionSlice';
import { setLocation, setFruit } from "../store/OptionSlice";
import store from '../store/Store';

// 옵션 변경
const Selector = React.memo(({searchType, temp, setTemp, setOptions}) => {

  const dispatch = useDispatch();
  const option = useSelector(state=>state.option);
  
  useEffect(()=>{
    console.log(option);
  }, [option])

  const setOption = async (e) => {
    await setTemp({
      ...temp,
      [searchType]: e.target.id
    });

    
    setOptions(temp);
  };

  const getDataByLocation = async (e) => {
    await axios.get('mock_data/farms2.json').then(res=>{
      return res.data;
    }).then(res=>{
      const data = res.filter(x=>x.address.split(' ')[0] === e.target.id);

      // setGlobalState(
      //   {
      //     contents : data,
      //     currentIndex: data.length
      //   }
      // )
    })
  }

  const getDataByProduces = async (e) => {

    await axios.get('mock_data/farms2.json').then(res=>{
      return res.data;
    }).then(res=>{
      const data = res.filter(x=>x.produce === e.target.id);

      // setGlobalState(
      //   {
      //     contents: data,
      //     currentIndex: data.length
      //   }
      // )
    })
  }

  return (
    searchType === "location" && (
      <Container>
        {location.map((x, i) => (
          <Item to="/" key={i} id={x[1]} onClick={e=>{
            dispatch(setLocation(e.target.id));
          }}>{location[i][0]}</Item>
        ))}
      </Container>
    ) || searchType === "fruit" && (
      <Container>
        {produces.map((x, i)=>(
          <Item to="/" key={i} id={x} onClick={e=>dispatch(setFruit(e.target.id))}>{produces[i]}</Item>
        ))}
      </Container>
    )
  );
});

const location = [
  ["인천", 'Incheon'],
  ["서울", 'Seoul'],
  ["경기", 'Gyeonggi'],
  ["강원", 'Gangwon'],
  ["충남", 'Chungnam'],
  ["충북", 'Chungbuk'],
  ["대전", 'Daejeon'],
  ["경북", 'Gyeongbuk'],
  ["경남", 'Gyeongnam'],
  ["대구", 'Daegu'],
  ["울산", 'Ulsan'],
  ["부산", 'Busan'],
  ["전북", 'Jeonbuk'],
  ["광주", 'Gwangju'],
  ["전남", 'Jeonnam'],
  ["제주", 'Jeju'],
];

const produces = [
  '감자',
  '딸기',
  '복숭아',
];

//
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  line-height:40px;

  width: 100%;
  background-color: white;
  border: 1px solid black;
  height:200px;
  z-index:9999;
`;

const Item = styled(Link)`
  border: 1px solid black;

  &:hover {
    background-color: lightgray;
  }
`;



export default Selector;
