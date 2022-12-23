import axios from "axios";
import {FavoriteList} from "../components/ItemList";
import {useState} from 'react';
import React, { useEffect, useCallback } from "react";

const Favorite = () => {

  const [contents, setContents] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [farmNumbers, setFarmNumbers] = useState([]);

  // 찜 목록 데이터 조회
  const getFavoriteFarms = useCallback(async () => {
    const token = localStorage.getItem('token');
    const header = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };

    await axios.get('http://localhost:3500/api/like', header)
    .then(res=>res.data)
    .then(data=> {
      console.log(data);
      setFavorite(data);
    });
  });

  useEffect(()=>{
    getFavoriteFarms(); // 찜 목록 조회 후 favorite에 저장
  },[])

  // 농장 정보 조회 (농장 id)
  const getFarmData = useCallback(async (farmId) => {
    const data = axios(`http://localhost:3500/api/farms/${farmId}`)
    .then(res=>res.data.data)
    .then(data=>data); // 농장 정보
    console.log(data);
    return data;
  });

  // 찜 목록 농장번호만 추출하기
  const getFarmNumbers = useCallback(() => {
    const result = [];
    for (let i=0;i<favorite.length;i++){
      result.push(favorite[i].farm_id);
    }
    return result;
  });

  const numbers = getFarmNumbers(); // 농장 찜 목록 농장번호
  console.log('찜 목록 농장번호들', numbers);

  // 농장 번호로 농장 정보 가져오기
  for (let i=0;i<numbers.length;i++){
    console.log(getFarmData(numbers[i]));
  }

  // 농장 정보를 하나씩 조회하면서 데이터를 가져와 favorite 변경
  // const getContents = useCallback(async () => {
  //   const result = [];
  //   for (let i=0;i<favorite.length;i++){
  //     const data = await getFarmData(favorite[i]);
  //     console.log(data);
  //     result.push({
  //       name:data[i].name,
  //       address:data[i].address,
  //     });
  //   }

  //   setContents(result);
  // });

  useEffect(()=>{
    for(let i=0;i<favorite.length;i++){

    }
  },[favorite]);

  return (
    <div>
      <h2>찜 목록</h2>
      <FavoriteList favorites={favorite}/>
    </div>
  );
}

export default Favorite;