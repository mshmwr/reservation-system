import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getReservedData } from "../../apis/reservedDataApi";
import useConstRoomData from "../../utils/Time";
import ShowMoreIcon from "../ui/ShowMoreIcon";
import {
  convertDataTimeToIndex,
  getRoomDatas,
  getEachTimeReservedStatus,
} from "./Board";
import useDateOrderAction from "../../action/ui/dateOrderAction"
import useBoardAction from "../../action/features/boardAction";
import Loader from "../ui/Loader";

const checkConflicted = (data, reservedStatus, timeRegion) => {
  //取得當筆資料，把data裡面的時間轉換成index
  let currentDataTimeIndexArr = [];
  const indexsData = convertDataTimeToIndex(timeRegion, data)[0];
  const startIndex = indexsData.startIndex;
  const endIndex = indexsData.endIndex;
  if (startIndex !== -1 && endIndex !== -1) {
    for (let i = startIndex; i <= endIndex; i++) {
      currentDataTimeIndexArr.push(i);
    }
  }
  //check is conflicted
  const isAppliedData = data.order_status === "applied";
  const isTimeRegionOverlapped = currentDataTimeIndexArr.some(
    (timeIndex) => reservedStatus[data.room][timeIndex] === true
  );
  const isConflicted = isAppliedData && isTimeRegionOverlapped;
  return isConflicted;
};

export const CalendarDateReservedData = ({
  columnDate,
  dateClickHandler,
  selectedRoom,
  isShowAll = false,
}) => {
  //redux
  const { setSelectedDate, setShowDateOrderWindow } = useDateOrderAction();
  const maxOrdersNumber = useSelector((state) => state.dateOrdersReducer.maxOrdersNumber);
  const showDateOrderWindow = useSelector((state) => state.dateOrdersReducer.showDateOrderWindow);
  const needRefreshBoard = useSelector(
    (state) => state.boardReducer.needRefreshBoard
  );
  const { setBoardRefresh } = useBoardAction();

  //variable
  const { ROOM_LIST, TIME_REGION, TIME_REGION_MAPPING } = useConstRoomData();
  const [dateDatas, setDateDatas] = useState(null);
  const fetchReservedData = async () => {
    const fetchedData = await getReservedData(columnDate, undefined, undefined);
    if (fetchedData === null) {
      return;
    }
    const resultData = fetchedData.result;
    if (resultData.length === 0) {
      // console.log("fetch data is empty array");
    }
    setBoardRefresh(false);
    setDateDatas(resultData);
  };

  async function fetchData() {
    await fetchReservedData();
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (needRefreshBoard) {
    fetchData();
  }

  const switchOrderStatus = (order_status) => {
    switch (order_status) {
      case "reserved":
        return "calendar__dates__date__entries__col--reserved";
      case "canceled":
        return "calendar__dates__date__entries__col--canceled";
      default:
        return "calendar__dates__date__entries__col--applied";
    }
  };

  const reservedStatus =
    dateDatas !== null
      ? getEachTimeReservedStatus(
        getRoomDatas(ROOM_LIST, TIME_REGION, dateDatas),
        TIME_REGION_MAPPING,
        ROOM_LIST
      )
      : null;

  const clickShowMoreIcon = (e) => {
    setShowDateOrderWindow(true);
    setSelectedDate(columnDate);
  }

  const isShowMoreIcon = dateDatas && !showDateOrderWindow && (maxOrdersNumber < dateDatas.length) ? true : false;



  const checkShowAllOrders = (index) => {
    if (isShowAll) {
      return true;
    }
    return index < maxOrdersNumber;
  }

  return (
    <div className="calendar__dates__date__entries">

      {dateDatas === null
        ? <Loader />
        : dateDatas.length === 0
          ? "no reserved"
          : dateDatas.filter((item, index) => checkShowAllOrders(index)) //顯示 maxOrdersNumber 筆資料
            .filter((item) =>
              selectedRoom === ""
                ? item.room !== selectedRoom
                : item.room === selectedRoom
            )
            .map((item) => (
              <div
                key={item.order_id}
                className={`calendar__dates__date__entries__col 
              ${checkConflicted(item, reservedStatus, TIME_REGION)
                    ? "calendar__dates__date__entries__col--conflicted"
                    : switchOrderStatus(item.order_status)
                  }
                
              ${isShowAll ? "" : "calendar__dates__date__entries__col--showPartOf"}
              
                `}

                id={item.order_id}
                onClick={(e) =>
                  dateClickHandler(
                    e,
                    checkConflicted(item, reservedStatus, TIME_REGION),
                    item.date
                  )
                }
              >
                {`${item.room}-${item.start_time}-${item.duration}hr`}
              </div>
            ))
      }
      {isShowMoreIcon && <ShowMoreIcon clickHandler={clickShowMoreIcon} />}
    </div >
  );
};
