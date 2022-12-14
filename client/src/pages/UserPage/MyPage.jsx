import { useState } from 'react';

const MyPage = () => {
    const user = {
        name : '홍길동',
        tel: '010-1234-5678',
        email: '1234@test.com',
        password: '123456',
    }
    const [userInfo, setUserInfo] = useState(user.name);
    const [change, setChange] = useState(false)

    const handleInfoChangeBtn = () => {
        setChange(current => !current)
    }

    const handleInfoChange = (event) => {
        setUserInfo(event.target.value)
    }

    return (
        <>
            <h1>내 정보 관리</h1>
            <div>
                <div>
                    <p>이름</p>
                    <div>
                        <p>{!change ? `${user.name}` : (
                            <><input type="text" value={userInfo} onChange={handleInfoChange} />
                            <button>저장</button>
                            </>
                        )}</p>
                        <button onClick={handleInfoChangeBtn}>{!change ? '수정' : '취소'}</button>
                    </div>
                </div>
                <div>
                    <p>전화번호</p>
                    <div>
                        <p>{!change ? `${user.name}` : (
                            <><input type="text" value={userInfo} onChange={handleInfoChange} />
                            <button>저장</button>
                            </>
                        )}</p>
                        <button onClick={handleInfoChangeBtn}>{!change ? '수정' : '취소'}</button>
                    </div>
                </div>
                <div>
                    <p>이메일</p>
                    <div>
                        <p>{!change ? `${user.name}` : (
                            <><input type="text" value={userInfo} onChange={handleInfoChange} />
                            <button>저장</button>
                            </>
                        )}</p>
                        <button onClick={handleInfoChangeBtn}>{!change ? '수정' : '취소'}</button>
                    </div>
                </div>
                <div>
                    <p>비밀번호</p>
                    <div>
                        <p>{!change ? `${user.name}` : (
                            <><input type="text" value={userInfo} onChange={handleInfoChange} />
                            <button>저장</button>
                            </>
                        )}</p>
                        <button onClick={handleInfoChangeBtn}>{!change ? '비밀번호 재설정' : '취소'}</button>
                    </div>
                </div>

            </div>
        </>

    )
}

export default MyPage;