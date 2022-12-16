<<<<<<< HEAD
import React, { useEffect , useContext } from 'react'
=======
import React, { useEffect , useContext} from 'react'
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
import styled from 'styled-components';
import { DetailContext } from "../pages/DetailPage"

const { kakao } = window;

const Location = () =>{
<<<<<<< HEAD
    const {detailData : data} = useContext(DetailContext);
    const { latitude, longitude } = data;
=======
    const { detailData : data } = useContext(DetailContext);
    const { latitude, longitude } = data;

>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
    useEffect(() => {

        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
        
        const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        
        // 마커가 표시될 위치입니다 
        const markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
        
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }, []);

    return (
        <div>
            <p>찾아오는길</p>
            <MapDiv id="map"></MapDiv>
        </div>
    );
<<<<<<< HEAD
};
=======
}
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c

const MapDiv = styled.div`
    width:100%;
    height:400px;
`;
export default React.memo(Location);