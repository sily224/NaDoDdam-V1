import React, { useState, useEffect,createContext } from "react";
import axios from 'axios';
import Detail from "../components/Detail";


export const DetailContext = createContext();

const DetailPage =  () => {
    const [detailData, setDetailData] = useState(null);

    const fetchData = async () => {
        try {
            await axios.get('/detailData.json').then((res) => {
                console.log(res.data);
                setDetailData(res.data);
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
            <DetailContext.Provider value={ { detailData }}>
                <Detail />
            </DetailContext.Provider>
        </div>
    );
}


<<<<<<< HEAD
export default DetailPage;
=======
export default DetailPage;
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
