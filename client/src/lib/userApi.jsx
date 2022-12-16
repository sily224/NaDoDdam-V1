import axios from "axios";
// api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청함)
// endpoint : api/user/login
async function post(endpoint, data) {
  const apiUrl = endpoint;

  const bodyData = JSON.stringify(data);

  console.log(`%cPOST 요청: ${apiUrl}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  const res = await axios(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: bodyData,
  });

  console.log("데이터 받음", res);

  return res;
}

// api 로 GET 요청 
async function get(endpoint, params = "") {
  const apiUrl = `${endpoint}/${params}`;
  console.log(`%cGET 요청: ${apiUrl} `, "color: #a25cd1;");

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

export { post, get };
