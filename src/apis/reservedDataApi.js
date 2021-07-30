const requestParameters = {
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "user-agent": "Mozilla/4.0 MDN Example",
    "content-type": "application/json",
  },
  mode: "cors",
  redirect: "follow",
  referrer: "no-referrer",
};
//取得訂位資訊
const getReservedData = (date, order_id) => {
  // date = date.replace(/-/g, ".");
  // let url = "http://localhost:3100/reservation_data?data[date]=" + date;
  if (date === undefined && order_id === undefined) {
    return null;
  }
  let urlVar = "";
  if (date !== undefined) {
    urlVar += urlVar === "" ? `data[date]=${date}` : `&data[date]=${date}`;
  }
  if (order_id !== undefined) {
    urlVar +=
      urlVar === ""
        ? `data[order_id]=${order_id}`
        : `&data[order_id]=${order_id}`;
  }

  // let url = "http://localhost:3100/reservation_data?data[date]=" + date;
  let url = "http://localhost:3100/reservation_data?" + urlVar;
  console.log(url);
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
  console.log("fetch postReservedData");
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
  console.log("fetch patchReservedData");
  let parameters = JSON.parse(JSON.stringify(requestParameters)); //deep copy
  let url = "http://localhost:3100/reservation_data";
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
export { getReservedData, postReservedData, patchReservedData };
