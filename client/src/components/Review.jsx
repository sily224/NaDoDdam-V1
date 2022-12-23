import {useState, useContext} from 'react';
import styled, {css} from 'styled-components';
import { DetailContext } from '../pages/DetailPage'
import ModalContainer from './../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/ModalSlice';


const ReviewContainer  = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
`;
const ReviewDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: ${(props) => props.len > 6 ? `repeat(3,1fr)` : `repeat(${Math.ceil(props.len/2)},1fr)`};
    gap: 10px 20px;
`; 
const ReviewId = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;

const ReviewName = styled.p`
    font-size: 0.7rem;
`;
const ReviewContent= styled.p`
    display:block;
    width:100%;
    font-size: 0.8rem;
    ${props =>props.active && css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; 
    `};
`;
const ReviewItem = styled.div`
    border  : 1px solid black;
    padding : 5px;
    overflow: hidden;   
    p {  margin : 5px; }
`;
const ModalLayout = styled.div`
    display: felx;
`;
const ModalTitle = styled.div`
    width: 30%;
    margin-right:5%;
`;
const ModalContent =styled.div`
    width: 60%;
    height: 450px;
    margin-top : 5%;
    overflow-y:auto;
    overflow-x:hidden;
`;


const ReviewItems = ({review,showAll}) =>{
    const [tab, setTab] = useState(true);
    const MaxLength = 20;

    return review.map((value, idx) => {
        const {id,content,createdAt,rating}= value;
        const isTextOverflow = MaxLength < value.content.length;
        
        if (idx >5) if(!showAll) return;
        return(      
            <ReviewItem key = {`reveiw-${idx}`} >
                <ReviewId  key = {`${value.id}-${idx}`}>{id}</ReviewId>
                <p>★ {rating}</p>
                <ReviewName key = {`${value.createdAt}-${idx}`}>{createdAt}</ReviewName>
                <ReviewContent active={`${tab === true ? 'active' : ''}`} key = {`content-${idx}`}>{content}</ReviewContent>
                { isTextOverflow && <button onClick={()=> setTab(!tab)} >더보기</button>}
            </ReviewItem>
        );
    })
}

const Review = ()=>{
    const {reviewData : review} = useContext(DetailContext);

    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.modal.modal);
    
    return (
        <>
            <p>후기</p>
            <ReviewContainer >
                <ReviewDiv len={review.length}> 
                    <ReviewItems review={review}/>
                </ReviewDiv>
                {review.length > 6 && <button onClick = {() => dispatch(showModal())}>모두보기</button>}
                { modalOpen &&
                    <ModalContainer>
                        <ModalLayout>
                            <ModalTitle>
                                <p>리뷰</p>
                                <p>후기 {review.length}개</p>
                            </ModalTitle>
                            <ModalContent >
                                <ReviewItems review={review} showAll/>
                            </ModalContent>
                        </ModalLayout>
                    </ModalContainer>
                }
            </ReviewContainer>
        </>
    );
}

export default Review;
