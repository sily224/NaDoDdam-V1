import CreateReview from '../components/CreateReview';
import {Container,  ReviewReservation} from '../components/ReviewReservation';
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
        const res = await userApi.get(`/api/reserve`, {
          headers: {
            authorization: token,
          },
        });
        const dataSort = res.data.sort((a, b) => {
          let aTime = a.info.date;
          let bTime = b.info.date;
          if (aTime > bTime) return -1;
          if (aTime === bTime) return 0;
          if (aTime < bTime) return 1;
        })
        const result = dataSort.filter(item => item.reserve.id === Number(id));
        setReservationData([result[0]]);
        setFarmId(result[0].info.id);
     };

    useEffect(() => {
      getReservationData();
     },[]);
    
    return <CreateReview id={id} farmId={farmId}/>
}

export default CreateReviewPage;
