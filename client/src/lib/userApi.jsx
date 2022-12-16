import axios from "axios";
// api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청함)
// endpoint : api/user/login
async function post(endpoint, data) {
<<<<<<< HEAD
  const apiUrl = endpoint;

  const bodyData = JSON.stringify(data);

  console.log(`%cPOST 요청: ${apiUrl}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");
=======
  console.log("post 들어옴");
  const apiUrl = endpoint;

  const bodyData = JSON.stringify(data);
  // console.log(`%cPOST 요청: ${apiUrl}`, "color: #296aba;");
  // console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c

  const res = await axios(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
<<<<<<< HEAD
=======
      Authorization: `Bearer ${localStorage.getItem("token")}`,
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
    },
    data: bodyData,
  });

  console.log("데이터 받음", res);
<<<<<<< HEAD
=======
  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { msg } = errorContent;
    // console.log(msg);
    // 만약 AT가 만료되었다는 에러라면 발급후 재요청 해야함
    if (msg === "정상적인 토큰이 아닙니다.") {
      // console.log("토큰 재발급후 재요청할 url : ", apiUrl.slice(0, -1));
      // refresh 함수는 true , 또는 로그인창화면을 리턴한다
      // const refreshToken = await refresh(localStorage.getItem("refreshToken"));
      // if (refreshToken) {
      //   await post(endpoint, data);
      //   return;
      // }
    }
    alert(msg);
    throw new Error(msg);
  }
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c

  return res;
}

export { post };
