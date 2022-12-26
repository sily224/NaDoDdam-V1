import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ImStarFull } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './Modal';
import { showModal } from '../store/ModalSlice';
import { Link } from 'react-router-dom';

const StyledTitleWrap = styled.div`
  display:flex;
`

const StyledTitle = styled.div`
  margin-bottom: 1%;

  > h3 {
    display: inline-block;
    margin-bottom: 0;
  }

  > span {
    background-color: lightgrey;
    padding: 1%;
    margin-left: 1%;
    border-radius: 10px;
  }
`

const StyledContent = styled.div`
  width:70%;

  >p {
    margin-bottom: 0;
  }
`

const StyledContentWrap = styled.div`
  display:flex;
  justify-content:space-between;
`

const StyledNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
`

const StyledList = styled.div`
  border: 1px solid lightgray;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 3%;
  box-sizing: border-box;
  margin-bottom: 2%;
`

const StyledListInner = styled.div`
  display:flex;
  align-items: center;
    
`

const StyledImageWrap = styled.div`
  width: 30%;
  height: 100%;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 20px;

  >img {
    width: 100%;
  }
`

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 100px 0 0 15px;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
  }
`

// const StarRate = ({rating}) => {
//   const [starRating, setStarRating] = useState(rating);

//   console.log(starRating)
//   const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
//   const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
//   const calcStarRates = () => {
//       let tempStarRatesArr = [0, 0, 0, 0, 0];
//       let starVerScore = (starRating * 70) / 5; //56
//       let idx = 0;
//       while (starVerScore > 14) {
//           tempStarRatesArr[idx] = 14; //[14,14,14,14]
//           idx += 1; 
//           starVerScore -= 14;
//       }
//       tempStarRatesArr[idx] = starVerScore;
//       return tempStarRatesArr;
//   };
//   useEffect(() => {
//       setRatesResArr(calcStarRates)
//   }, [])
//   return (
//     <StarRateWrap>
//       {STAR_IDX_ARR.map((item, idx) => {
//         return (
//           <span className='star_icon' key={`${item}_${idx}`}>
//             <svg xmlns='http://www.w3.org/2000/svg' width='40' height='39' viewBox='0 0 14 13' fill='#cacaca'>
//               <clipPath id={`${item}StarClip`}>
//                 <rect width={`${ratesResArr[idx]}`} height='39' />
//               </clipPath>
//               <path
//                 id={`${item}Star`}
//                 d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
//                 transform='translate(-2 -2)'
//               />
//               <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#966fd6'/>
//             </svg>
//           </span>
//           )})
//       }
//   </StarRateWrap>
//   )
// }

const RatingBox = styled.div`
  margin: 0 auto;

  & svg {
    color: #C4C4C4;
    cursor: pointer;
  }
  .black {
    color: yellow;
  }
`
const StarRate = ({rating}) => {
  const [clicked, setClicked] = useState([true,true,true,true,true]);
  
  const handleStarClick = () => {
    let clickStates = [...clicked];
    clickStates.map((i, idx) => clickStates[idx] = idx <= rating-1 ? true : false)
    setClicked(clickStates);
   };

useEffect(() => {
  handleStarClick();
},[])

console.log(clicked)

  return (
    <RatingBox>
      {[0,1,2,3,4].map(item =>
      <ImStarFull 
      key={item}
      className={clicked[item] && 'black'}
      />)
      }
    </RatingBox>
  )
}

const MyReviewTable = () => {
  const [data, setData] = useState([]);
  const [dataIndex, setDataIndex] = useState(null);
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);
    
  const getReviewData = async() => {
    try {
      const token = getToken();
      const res = await userApi.get(`//localhost:3500/api/review`, {
        headers: {
          authorization: token,
        },
      });
      const result = res.data.sort((a, b) => {
				let aTime = a.review.createdAt;
				let bTime = b.review.createdAt;
				if (aTime > bTime) return -1;
				if (aTime === bTime) return 0;
				if (aTime < bTime) return 1;
			});
      setData(result);
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReviewData();
  },[])

  const ShowResrvation = () => {
    return (<>
      {data.map((reservation , index) => { 
        const {time, review, reserveInfo} = reservation;
        const start_time = time.start_time.slice(0,5);
        const end_time = time.end_time.slice(0,5);
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>
                {/* <img src={farm.url} alt="농장사진"/> */}
              </StyledImageWrap>
              <StyledContent>
                <StyledTitle>
                  <h3>{time.farmName}</h3>
                </StyledTitle>
                <p>{time.date} {start_time} -  {end_time}</p>
                <p>인원: {reserveInfo.personnel}명</p>
                <p>{review.content}</p>
                <StarRate rating={review.rating}/>
              </StyledContent>
            </StyledListInner>
            <button onClick={() => {
              dispatch(showModal());
              setDataIndex(index);
            }}>더보기</button>
          </StyledList>
          )
        })}
      </>  
    );
  };

  const ShowDetail = () => {
    const detailDataArr = [data[dataIndex]];
    
    return (
      <>
      {modalOpen && <ModalContainer>
        {detailDataArr.map(reservation => {
          const {time, review, reserveInfo} = reservation;
          const start_time = time.start_time.slice(0,5);
          const end_time = time.end_time.slice(0,5);

          return (
            <div>
                <StyledTitleWrap>
                  <StyledImageWrap>
                    {/* <img src={farm.url} alt="농장사진"/> */}
                  </StyledImageWrap>
                  <div>
                    <h4>{time.farmname}</h4> 
                    <p>{time.date}</p>
                  </div>
                </StyledTitleWrap>
                <div>
                  <p>예약정보</p>
                  <StyledContentWrap>
                      <p>날짜: {time.date}</p>
                      <p>시간: {start_time}-{end_time}</p>
                      <p>인원: {reserveInfo.personnel}명</p>
                  </StyledContentWrap>
                  <p>{review.content}</p>
                </div>
                <Link to='writereview'>수정</Link>
                <button>삭제</button>
            </div>)
        }
        )}
      </ModalContainer>}
      </>
    )
  }

  return (
    <>
    <ShowResrvation />
    <ShowDetail />
    </>
    )
}

export default MyReviewTable;