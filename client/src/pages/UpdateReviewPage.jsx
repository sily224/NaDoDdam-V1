import ReviewReservation from "../components/ReviewReservation";
import UpdateReview from "../components/UpdateReview";
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import { StyledTitle } from "../styles/Styled";

const UpdateReviewPage = () => {
  const [reservationData, setReservationData] = useState([]);
  const { id }= useParams();

  const getReservationData = async () => {
    const token = getToken();
    const res = await userApi.get(`//localhost:3500/api/reserve`, {
      headers: {
        authorization: token,
      },
    });
    const result  = res.data.filter(item => item.reserve.id === Number(id));
      setReservationData([result[0]]);
    };

    useEffect(() => {
      getReservationData();
     },[]);

    return (
      <>
        <StyledTitle>리뷰 수정</StyledTitle>
        <ReviewReservation reservationData={reservationData}/>
        <UpdateReview id={id}/>
      </>
    )
    }
export default UpdateReviewPage;