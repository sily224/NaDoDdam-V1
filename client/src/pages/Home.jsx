import FarmList from '../components/ItemList';
import React, {useState, useEffect, useCallback} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const NUMBER_OF_ITEMS_TO_GET = 50;

const Home = React.memo(() => {

  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(0);

  // 검색 옵션
  const [options, setOptions] = useOutletContext();
  
  useEffect(()=>{
    console.log('Home에서의 옵션', options);  
  },[options])
  // const currentIndex = Number(globalState.currentIndex);

  // 최초 렌더링 시 전체 데이터 조회
  useEffect(()=>{
    setPage(0);
    getData(options);
  },[])

  // option이 바뀌면 page 0부터 시작하여 데이터 다시 불러오기
  useEffect(()=>{
    setPage(0);
    getData(options);

  }, [options]);

  const getData = useCallback( async (options) => {
// /api/farm/location?address/:page
    const optionKey = Object.keys(options);

    if (optionKey.includes('location')) {
      const location = options.location;

      await axios.get(`/api/farm/location?search=${location}/${page}`)
      .then(res=>res.data)
      .then(async data=>{
        setContents(contents.concat(data));
        setPage(page + 1);

      });

    } else{
      console.log('전체 조회 api 실행');
      await axios.get(`/api/farms/${page}`).then(res=>{
        return res.data;
      }).then(data=>{

        // const data = res.slice(currentIndex, currentIndex+NUMBER_OF_ITEMS_TO_GET);
        
        setContents(contents.concat(data));
        setPage(page + 1);

        return data;
      })
    }
  });

  return (
      <InfiniteScroll 
      dataLength={contents.length}
      next={()=>{
        getData(options);
        setPage(page+1);
      }}
      hasMore={true}
      scrollThreshold='1000px'>
        <FarmList contents={contents}/>
      </InfiniteScroll>
  )
});

export default Home;
