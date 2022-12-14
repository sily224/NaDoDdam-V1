import styled from 'styled-components';

const Review = ({review})=>{
    
    return (
        <>
            <ReviewContainer>
                {review}
            </ReviewContainer>
        </>
    );
}

const ReviewContainer = styled.div`
    width: 100%;
`; 

export default Review;