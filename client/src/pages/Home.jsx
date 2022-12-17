// import getAllFarmData from '../lib/getAllFarmData';
import FarmList from '../components/ItemList';
import {useState, useEffect} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const NUMBER_OF_ITEMS_TO_GET = 50;

const Home = () => {

  const [globalState, setGlobalState] = useOutletContext();

  const currentIndex = Number(globalState.currentIndex);

  useEffect(()=>{
    getData();
    console.log(currentIndex);
  },[])

  const getData = async () => {
    await axios.get('mock_data/farms2.json').then(res=>{
      return res.data;
    }).then(res=>{
      const data = res.slice(currentIndex, currentIndex+NUMBER_OF_ITEMS_TO_GET);
      
      setGlobalState(
        {
          contents : [...globalState.contents.concat(data)],
          currentIndex: currentIndex + NUMBER_OF_ITEMS_TO_GET
        }
      )
    })
  }

  return (
      <InfiniteScroll 
      dataLength={globalState.contents.length}
      next={()=>getData()}
      hasMore={true}
      scrollThreshold='1%'>
        <FarmList contents={globalState.contents}/>
      </InfiniteScroll>
  )
}

export default Home;