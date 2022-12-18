const MyReservation = () => {
    return (
        <>
        <h1>예약조회</h1>
        <button>전체</button>
        <button>예약완료</button>
        <button>예약취소</button>
        <button>체험완료</button>
        <select>
            <option>지난 3개월</option>
            <option>지난 6개월</option>
            <option>지난 1년</option>
        </select>
        <div>
            <div>농장이미지</div>
            <div>
                <div>
                  <h3>농장명 / 체험명</h3> 
                  <div>예약완료</div> 
                </div>
                <div>날짜</div>
                <div>4명</div>
                <div>결제금액 : 23,000원</div>
            </div>
            <div>
                <button>더보기</button>
                <button>예약취소</button>
            </div>
        </div>
        </>
    )
}