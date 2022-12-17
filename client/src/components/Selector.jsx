import styled from "styled-components";
import axios from 'axios';

const Selector = ({searchType, setGlobalState}) => {

  const getDataByLocation = async (e) => {
    await axios.get('mock_data/farms2.json').then(res=>{
      return res.data;
    }).then(res=>{
      const data = res.filter(x=>x.address.split(' ')[0] === e.target.id);

      setGlobalState(
        {
          contents : data,
          currentIndex: data.length
        }
      )
    })
  }

  const getDataByProduces = async (e) => {

    await axios.get('mock_data/farms2.json').then(res=>{
      return res.data;
    }).then(res=>{
      const data = res.filter(x=>x.produce === e.target.id);
      
      setGlobalState(
        {
          contents: data,
          currentIndex: data.length
        }
      )
    })
  }

  return (
    searchType === "location" && (
      <Container>
        {location.map((x, i) => (
          <Item key={i} id={x} onClick={e=>getDataByLocation(e)}>{location[i]}</Item>
        ))}
      </Container>
    ) || searchType === "fruit" && (
      <Container>
        {produces.map((x, i)=>(
          <Item key={i} id={x} onClick={e=>getDataByProduces(e)}>{produces[i]}</Item>
        ))}
      </Container>
    )
  );
};

const location = [
  "인천",
  "서울",
  "경기",
  "강원",
  "충남",
  "충북",
  "대전",
  "경북",
  "경남",
  "대구",
  "울산",
  "부산",
  "전북",
  "광주",
  "전남",
  "제주",
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

const Item = styled.div`
  border: 1px solid black;

  &:hover {
    background-color: lightgray;
  }
`;



export default Selector;
