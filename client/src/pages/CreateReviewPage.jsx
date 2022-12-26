import {CreateReview, ShowReservation,UpdateReview} from '../components/CreateReview';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";

const CreateReviewPage = () => {
    const [reservationData, setReservationData] = useState([]);
    const [farmId, setFarmId] = useState(null);
    const [content, setContent] = useState(null);
    const [rating, setRating] = useState(null);
    const { id }= useParams();

    const getReservationData = async () => {
        const token = getToken();
        const res = await userApi.get(`//localhost:3500/api/review`, {
          headers: {
            authorization: token,
          },
        });
        const result  = res.data.filter(item => item.reserveInfo.id === Number(id))
        setReservationData([result[0]]);
        setFarmId(result[0].time.id);
        setContent(result[0].review.content);
        setRating(result[0].review.rating);
    };

    useEffect(() => {
      getReservationData();
     },[]);
    
    return (
    <>
    <ShowReservation reservationData={reservationData}/>
    <CreateReview id={id} farmId={farmId}/>
    <UpdateReview content={content} id={id} farmId={farmId} rating={rating}/>
    </>
    )
}

export default CreateReviewPage;
