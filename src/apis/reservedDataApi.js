import { requestParameters } from "../utils/API";

//取得訂位資訊
const getReservedData = (date = "", order_id = "", room = "") => {
  // date = date.replace(/-/g, ".");
  // let url = "http://localhost:3100/reservation_data?data[date]=" + date;
  if (date === "" && order_id === "") {
    return null;
  }
  let urlVar = "";
  if (date !== "") {
    urlVar += urlVar === "" ? `data[date]=${date}` : `&data[date]=${date}`;
  }
  if (order_id !== "") {
    urlVar +=
      urlVar === ""
        ? `data[order_id]=${order_id}`
        : `&data[order_id]=${order_id}`;
  }
  if (room !== "") {
    urlVar += `&data[room]=${room}`;
  }
  // let url = "http://localhost:3100/reservation_data?data[date]=" + date;
  let url = "http://localhost:3100/reservation_data?" + urlVar;
  // console.log(url);
  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      //處理資料
      const parsedData = JSON.parse(result).data;
      return parsedData;
    });
};

//送出訂位資訊
const postReservedData = (data = {}) => {
  let parameters = JSON.parse(JSON.stringify(requestParameters)); //deep copy
  let url = "http://localhost:3100/reservation_data";
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

//修改訂位資訊
const patchReservedData = (data = {}) => {
  let parameters = JSON.parse(JSON.stringify(requestParameters)); //deep copy
  let url = "http://localhost:3100/reservation_data";
  const method = { method: "PATCH" };
  parameters = { body: JSON.stringify(data), ...method, ...parameters };
  return fetch(url, parameters)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      const parsedData = JSON.parse(result).data;
      return parsedData;
    });
};
export { getReservedData, postReservedData, patchReservedData };
