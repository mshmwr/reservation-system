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

const getReservedData = (date) => {
  console.log("fetch getReservedData");
  // date = date.replace(/-/g, ".");
  let url = "http://localhost:3100/reservation_data?data[date]=" + date;
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
          date: data.date,
          duration: data.duration,
          name: data.name,
          order_status: data.order_status,
          room: data.room,
          start_time: data.start_time,
        });
      });
      console.log(datas);

      return datas;
    });
};

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
export { getReservedData, postReservedData };
