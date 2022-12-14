import getAllFarmData from '../lib/getAllFarmData';
import ItemList from '../components/itemList';
import {useState, useEffect} from 'react';

const Home = () => {

  const [contents, setContents] = useState([]);

  useEffect(()=>{
    getAllFarmData().then(res=>{
      setContents(res);
    })
  }, [])

  return (
    <>
      <ItemList contents={contents}/>
    </>
  );
};

export default Home;