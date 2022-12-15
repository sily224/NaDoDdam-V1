// import getAllFarmData from '../lib/getAllFarmData';
import ItemList from '../components/itemList';
import {useState, useEffect} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const NUMBER_OF_ITEMS_TO_GET = 10;

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [contents, setContents] = useState([]);

  console.log(contents);

  useEffect(()=>{
    getData();
  },[])

  const getData = async () => {
    axios.get('mock_data/farms.json').then(res=>{
      return res.data;
    }).then(res=>{
      const data = res.slice(currentIndex, currentIndex+NUMBER_OF_ITEMS_TO_GET);
      
      setContents(contents.concat(data));
    })
    setCurrentIndex(currentIndex + NUMBER_OF_ITEMS_TO_GET);
  }

  return (
    <>
      <InfiniteScroll 
      dataLength={contents.length}
      next={getData}
      hasMore={true}>
        <ItemList contents={contents}/>
      </InfiniteScroll>
    </>
  )
}

export default Home;

// const Home = () => {

//   const [ref, inView] = useInView();
//   const [contents, setContents] = useState([]);

//   useEffect(()=>{
//     getAllFarmData().then(res=>{
//       setContents(res);
//     })
//   }, [])

//   return (
//     <>
//       <ItemList contents={contents}/>
//     </>
//   );
// };

// export default Home;

