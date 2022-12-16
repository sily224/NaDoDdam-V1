// import getAllFarmData from '../lib/getAllFarmData';
import FarmList from '../components/ItemList';
import {useState, useEffect} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const NUMBER_OF_ITEMS_TO_GET = 50;

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [contents, setContents] = useState([]);


  useEffect(()=>{
    getData();
  },[])

  const getData = async () => {
    await axios.get('mock_data/farms.json').then(res=>{
      return res.data;
    }).then(res=>{
      const data = res.slice(currentIndex, currentIndex+NUMBER_OF_ITEMS_TO_GET);
      
      setContents(contents.concat(data));
    })
    setCurrentIndex(currentIndex + NUMBER_OF_ITEMS_TO_GET);
  }

  return (
      <InfiniteScroll 
      dataLength={contents.length}
      next={()=>getData()}
      hasMore={true}
      scrollThreshold="1">
        <FarmList contents={contents}/>
      </InfiniteScroll>
  )
}

export default Home;