import axios from "axios";
// api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청함)
// endpoint : api/user/login
async function post(endpoint, data) {
  console.log("post 들어옴");
  const apiUrl = endpoint;

  const bodyData = JSON.stringify(data);
  // console.log(`%cPOST 요청: ${apiUrl}`, "color: #296aba;");
  // console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  const res = await axios(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: bodyData,
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  // if (!res.ok) {
  //   console.log("에러 답변", res);
  //   throw new Error(res);
  // }

  return res;
}

export { post };
