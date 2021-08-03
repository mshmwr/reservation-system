import { requestParameters } from "../utils/API";

//取得訂位資訊

//送出訂位資訊
const getUser = () => {
  let parameters = JSON.parse(JSON.stringify(requestParameters)); //deep copy
  let url = "http://localhost:3100/api/user";
  const method = { method: "GET" };
  parameters = { ...method, ...parameters };
  return fetch(url, parameters)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      //處理資料
      const parsedData = JSON.parse(result).data;
      return parsedData;
    });
};

const postUser = (data = {}) => {
  //register
  if (JSON.stringify(data) === "{}") {
    return;
  }
  let parameters = JSON.parse(JSON.stringify(requestParameters)); //deep copy
  let url = "http://localhost:3100/api/user";
  const method = { method: "POST" };
  parameters = { body: JSON.stringify(data), ...method, ...parameters };
  return fetch(url, parameters)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      //處理資料
      const parsedData = JSON.parse(result).data;
      return parsedData;
    });
};

const patchUser = (data = {}) => {
  //login
  if (JSON.stringify(data) === "{}") {
    return;
  }
  let parameters = JSON.parse(JSON.stringify(requestParameters)); //deep copy
  let url = "http://localhost:3100/api/user";
  const method = { method: "PATCH" };
  console.log(data);
  parameters = { body: JSON.stringify(data), ...method, ...parameters };
  return fetch(url, parameters)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      //處理資料
      const parsedData = JSON.parse(result).data;
      console.log(parsedData);
      return parsedData;
    });
};

const deleteUser = (data = {}) => {
  if (JSON.stringify(data) === "{}") {
    return;
  }
  let parameters = JSON.parse(JSON.stringify(requestParameters)); //deep copy
  let url = "http://localhost:3100/api/user";
  const method = { method: "DELETE" };
  parameters = { body: JSON.stringify(data), ...method, ...parameters };
  return fetch(url, parameters)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      //處理資料
      const parsedData = JSON.parse(result).data;
      return parsedData;
    });
};

export { getUser, postUser, patchUser, deleteUser };
