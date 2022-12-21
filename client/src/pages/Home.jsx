import FarmList from '../components/ItemList';
import React, {useState, useEffect, useCallback} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Home = React.memo(() => {

  const option = useSelector(state=>state.option);

  const [contents, setContents] = useState([]);
  // const [page, setPage] = useState(0);

  useEffect(()=>{
    console.log('Home에서의 옵션', option);  
  },[option])

  // 최초 렌더링 시 전체 데이터 조회
  useEffect(()=>{
    // setPage(0);
    getFarmData(option);
  },[])

  // option이 바뀌면 page 0부터 시작하여 데이터 다시 불러오기
  useEffect(()=>{
    // setPage(0);
    // getData(option);

  }, [option]);

  const getFarmData = useCallback( async (options) => {
    await axios.get(`http://localhost:3500/api/farms`)
    .then(res=>{
      const data = res.data;
      console.log(data);
      return data;
    })
    .then(data=>setContents(contents.concat(data)));

    // .then(res=>res.data)
    // .then(async data =>{
    //   setContents(contents.concat(data));
    // })
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
    <FarmList contents={contents}/>
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
  )
});

export default Home;
