const MyReservationCancle = () => {
    const filterDataArr = [filterdData[dataIndex]];
    console.log(filterDataArr);
    return (
      <>
      {filterDataArr.map(item => (
         <div key={dataIndex}>
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.createdAt}</p>
          <p>인원{item.personnel}명</p>
          <p>취소사유</p>
          <p>최종환불금액: {item.total_price}</p>
          <button onClick={() => navigate('/myreservation')}>이전</button>
        </div>
      )
    )} 
    </>   
    )
  }

  export default MyReservationCancle;