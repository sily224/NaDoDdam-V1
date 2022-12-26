import {CreateReview, ShowReservation} from '../components/CreateReview';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";

const CreateReviewPage = () => {
    const [reservationData, setReservationData] = useState([]);
    const [farmId, setFarmId] = useState(null);
    const { id }= useParams();

    const getReservationData = async () => {
        const token = getToken();
        const res = await userApi.get(`//localhost:3500/api/reserve`, {
          headers: {
            authorization: token,
          },
        });
        const result  = res.data.filter(item => item.reserve.id === Number(id))
        setReservationData(result);
        setFarmId(result[0].info.id);
    };

    useEffect(() => {
      getReservationData();
     },[]);
    
    return (
    <>
    <ShowReservation reservationData={reservationData}/>
    <CreateReview id={id} farmId={farmId}/>
    </>
    )
}

export default CreateReviewPage;
