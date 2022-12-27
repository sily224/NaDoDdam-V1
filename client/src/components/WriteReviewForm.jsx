const ShowReservation = ({reservationData}) => {
    return (
     <>
       {reservationData.map(item => {
         const {info, reserve} = item || {};
         const start_time = info.start_time.slice(0,5);
         const end_time = info.end_time.slice(0,5);
         return (
           <div key={info.id}>
           <img src={info.url} alt="농장이미지"/>
           <h1>{info.name}</h1>
           <p>날짜: {info.date}</p>
           <p>체험시간: {start_time} - {end_time}</p>
           <p>인원: {reserve.personnel}명</p>
           </div>
         )
       })}
     </>
    )
}

export default ShowReservation;