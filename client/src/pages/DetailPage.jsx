import React, { useState, useEffect,createContext } from "react";
import axios from "axios";
import Detail from "../components/Detail";
import { useParams } from 'react-router-dom';

export const DetailContext = createContext();

const DetailPage =  () => {
    const [farmData, setFarmData] = useState(null);
    const [reviewData, setreviewData] = useState(null);
    const [farmerData, setFarmerData] = useState(null);
    const {id} = useParams();
    const fetchData = async () => {
        try {
            await axios.get(`http://localhost:3500/api/farms/${id}`).then((res) => {
                console.log(res.data);
                setFarmData(res.data.data);
                setreviewData(res.data.review);
                setFarmerData(res.data.farmer);
            });
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect (() => {
        fetchData();
    }, []);
    
    return (
        <div>
            <DetailContext.Provider value={ {farmData,reviewData,farmerData}}>
                <Detail />
            </DetailContext.Provider>
        </div>
    );
}

export default DetailPage;

