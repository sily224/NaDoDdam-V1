import {FarmList} from '../components/ItemList';
import React, {useState, useEffect, useCallback} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const getFavoriteFarmId = async () => {
  const token = localStorage.getItem('token');
  const header = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
  // 찜 목록 조회
  await axios.get('http://localhost:3500/api/like', header)
  .then(res=>res.data)
  .then(data=> {
    console.log(data);
  });
}

const Home = React.memo(() => {

  const option = useSelector(state=>state.option.search);

  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(0);

  // 최초 렌더링 시 전체 데이터 조회
  useEffect(()=>{
    // setPage(0);
    getFavoriteFarmId();
    getFarmData(option);
  },[option])

  const getFarmData = useCallback( async ({location, fruit, date}) => {

    const header = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
    }

    let url = "http://localhost:3500/api/farms"; // default 전체 조회
    if(location) {
      url = `http://localhost:3500/api/farms?location=${location}`; // 지역 조회
    }else if(fruit){
      url = `http://localhost:3500/api/farms?type=${fruit}`; // 과일 조회
    }
    
    console.log(url);
    await axios.get(url)
    .then(res=>{
      const data = res.data;
      console.log(data);
      return data;
    })
    .then(data=>setContents(data));
  })


//   const getData = useCallback( async (options) => {
// // /api/farm/location?address/:page
//     const optionKey = Object.keys(options);

//     if (optionKey.includes('location')) {
//       const location = options.location;

//       await axios.get(`/api/farm/location?search=${location}/${page}`)
//       .then(res=>res.data)
//       .then(async data=>{
//         setContents(contents.concat(data));
//         setPage(page + 1);

//       });

//     } else{
//       console.log('전체 조회 api 실행');
//       await axios.get(`/api/farms/${page}`).then(res=>{
//         return res.data;
//       }).then(data=>{

//         setContents(contents.concat(data));
//         setPage(page + 1);

//         return data;
//       })
//     }
//   });

  return (
    // <FarmList contents={contents}/>
      // <InfiniteScroll 
      // dataLength={contents.length}
      // next={()=>{
      //   // getData(option);
      //   // setPage(page+1);
      // }}
      // hasMore={true}
      // scrollThreshold='1000px'>
      //   <FarmList contents={contents}/>
      // </InfiniteScroll>
      <FarmList contents={contents}/>
  )
});

export default Home;
