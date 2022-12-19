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

// api 로 user정보 GET 요청 
async function get(endpoint) {
  const apiUrl = endpoint;
  console.log(`%cGET 요청: ${apiUrl} `, "color: #a25cd1;");

  const res = await axios(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return res;
}

async function patch(endpoint, data) {
  const apiUrl = endpoint;

  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPATCH 요청: ${apiUrl}`, "color: #059c4b;");
  console.log(`%cPATCH 요청 데이터: ${bodyData}`, "color: #059c4b;");

  const res = await fetch(apiUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: {
      currentPassword: "",
      data: bodyData,
    },
  });

  return res;
}

export { post, get, patch };