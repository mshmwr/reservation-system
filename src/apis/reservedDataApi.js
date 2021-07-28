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
  // console.log("fetch getReservedData");
  // date = date.replace(/-/g, ".");
  // let url = "http://localhost:3100/reservation_data?data[date]=" + date;
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
      let datas = [];
      parsedData.forEach((data) => {
        datas.push({
          room: data.room,
          duration: data.duration,
          start_time: data.start_time,
          attendence: data.attendence,
          date: data.date,
          name: data.name,
          phone: data.phone,
          email: data.email,
          order_status: data.order_status,
          order_id: data.order_id,
        });
      });
      console.log(datas);

      return datas;
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
