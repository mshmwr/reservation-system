const getReservedData = (date) => {
  console.log("fetchReservedData");
  date = date.replace(/-/g, ".");
  let url = "http://localhost:3100/reservation_data?date=" + date;
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
          time: data.time,
        });
      });
      console.log(datas);

      return datas;
    });
};

export { getReservedData };
