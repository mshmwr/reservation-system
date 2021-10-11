import { requestParameters } from "../utils/API";
import { route } from "../utils/Utils";

//取得訂位資訊

//送出訂位資訊
const getUser = () => {
  let parameters = JSON.parse(JSON.stringify(requestParameters)); //deep copy
  let url = route + "/api/user";
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
  let url = route + "/api/user";
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
  let url = route + "/api/user";
  const method = { method: "PATCH" };
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

const deleteUser = () => {
  let parameters = JSON.parse(JSON.stringify(requestParameters)); //deep copy
  let url = route + "/api/user";
  const method = { method: "DELETE" };
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

export { getUser, postUser, patchUser, deleteUser };
