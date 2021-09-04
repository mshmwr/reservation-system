import React, { useState, useEffect } from "react";
import "./Board.css";
import { TimeLine } from "./TimeLine";
import { getReservedData } from "../apis/reservedDataApi";
import useConstRoomData from "../utils/Time";

const initLineCube = (start, end, roomId) => {
  /* lineCube
    {
      roomId:"A", 
      cubeId:"9", 
      label:"L", 
      isSelected: boolean,
      isReserved: boolean,
      index: number
    }
   */

  let lineCube = [];
  for (let i = start; i <= end; i++) {
    lineCube.push({
      roomId: roomId,
      cubeId: i,
      label: "L",
      isSelected: false,
      isReserved: false,
      index: (i - start) * 2,
    });
    lineCube.push({
      roomId: roomId,
      cubeId: i,
      label: "R",
      isSelected: false,
      isReserved: false,
      name: null,
      index: (i - start) * 2 + 1,
    });
  }
  return lineCube;
};

const initRoomListLineCube = (roomList, cubeInitData) => {
  let state = {};
  roomList.forEach((room) => {
    let lineCube = initLineCube(
      cubeInitData.startNum,
      cubeInitData.endNum,
      room.id
    );
    state[room.id] = lineCube;
  });
  return state;
};

const getEachTimeReservedStatus = (roomDatas, timeRegionMapping, roomList) => {
  let timeReservedStatus = {};
  roomDatas.forEach((roomData, index) => {
    let regionReserved = new Array(timeRegionMapping.length).fill(false);

    let roomId = "";
    if (roomData.length === 0) {
      roomId = roomList[index].id;
      timeReservedStatus[roomId] = regionReserved;
      return;
    }
    roomData.forEach((data) => {
      roomId = data.room;
      if (data.startIndex === -1) return;
      for (let i = 0; i < timeRegionMapping.length; i++) {
        if (i >= data.startIndex && i <= data.endIndex) {
          regionReserved[i] = true;
        }
      }
    });
    timeReservedStatus[roomId] = regionReserved;
  });
  return timeReservedStatus;
};
const getEachTimeReservedUsername = (
  roomDatas,
  timeRegionMapping,
  roomList
) => {
  let timeReservedUsername = {};
  roomDatas.forEach((roomData, index) => {
    let usernames = new Array(timeRegionMapping.length).fill("");
    let roomId = "";
    if (roomData.length === 0) {
      roomId = roomList[index].id;
      timeReservedUsername[roomId] = usernames;
      return;
    }
    roomData.forEach((data) => {
      roomId = data.room;
      if (data.startIndex === -1) return;
      for (let i = 0; i < timeRegionMapping.length; i++) {
        if (i >= data.startIndex && i <= data.endIndex) {
          usernames[i] = data.name;
        }
      }
    });
    timeReservedUsername[roomId] = usernames;
  });
  return timeReservedUsername;
};

const myRe = /\D+/g;

// const RESERVED_DATA = data.reservedData;
/* reservedData
    [
      {
        "date": "2021.03.01",
        "room": "A" ,
        "time": "10:00" ,
        "duration": 3 ,
        "name": "Amy"
      },
      {
        "date": "2021.03.01",
        "room": "A" ,
        "time": "14:00" ,
        "duration": 3.5,
        "name": "Mr.Chen's birthday"
      },
      {
        "date": "2021.03.01",
        "room": "B" ,
        "time": "10:00" ,
        "duration": 3,
        "name": "Let's go party! party!!!!" 
      },
      {
        "date": "2021.03.01",
        "room": "C" ,
        "time": "10:00" ,
        "duration": 3,
        "name": "Singing" 
      }
    ]
  */
const convertReservedTimeToStartIndex = (timeRegion, data) => {
  let hr = data.start_time.split(":")[0];
  let min = data.start_time.split(":")[1];
  let startIndex =
    data.order_status === "reserved"
      ? timeRegion.indexOf(parseInt(hr, 10)) * 2 + (min === "00" ? 0 : 1)
      : -1;
  return startIndex;
};
const convertReservedTimeToEndIndex = (timeRegion, data) => {
  const startIndex = convertTimeToStartIndex(timeRegion, data);
  let endIndex =
    data.order_status === "reserved"
      ? startIndex + (data.duration / 0.5 - 1)
      : -1;
  return endIndex;
};
const convertTimeToStartIndex = (timeRegion, data) => {
  let hr = data.start_time.split(":")[0];
  let min = data.start_time.split(":")[1];
  let startIndex =
    timeRegion.indexOf(parseInt(hr, 10)) * 2 + (min === "00" ? 0 : 1);
  return startIndex;
};
const convertTimeToEndIndex = (timeRegion, data) => {
  const startIndex = convertTimeToStartIndex(timeRegion, data);
  let endIndex = startIndex + (data.duration / 0.5 - 1);
  return endIndex;
};

const convertDatasTimeToIndex = (timeRegion, datas) => {
  let reservedDatasIndexs = [];
  datas.forEach((data) => {
    reservedDatasIndexs.push({
      ...data,
      startIndex: convertReservedTimeToStartIndex(timeRegion, data),
      endIndex: convertReservedTimeToEndIndex(timeRegion, data),
    });
  });
  return reservedDatasIndexs;
};

const convertDataTimeToIndex = (timeRegion, data) => {
  let reservedDataIndexs = [];
  reservedDataIndexs.push({
    ...data,
    startIndex: convertTimeToStartIndex(timeRegion, data),
    endIndex: convertTimeToEndIndex(timeRegion, data),
  });
  return reservedDataIndexs;
};

const fillReservedData = (
  roomList,
  lineCubeStates,
  reservedDataIndexs,
  reservedDataUsernames
) => {
  let cubeStates = {};
  let lineCubeState = null;
  let reservedIndex = null;
  let username = null;
  roomList.forEach((room) => {
    lineCubeState = lineCubeStates[room.id].slice();
    reservedIndex = reservedDataIndexs[room.id].slice();
    username = reservedDataUsernames[room.id].slice();
    lineCubeState.forEach((cube) => {
      if (reservedIndex[cube.index]) {
        cube.isReserved = true;
        cube.name = username[cube.index];
        return;
      }
      cube.name = "";
    });
    cubeStates[room.id] = lineCubeState;
  });
  return cubeStates;
};
const setRoomCubes = (
  roomList,
  cubeInitData,
  reservedDataIndexs,
  reservedDataUsernames
) => {
  let initLineCubeStates = initRoomListLineCube(roomList, cubeInitData);
  let cubeStates = fillReservedData(
    roomList,
    initLineCubeStates,
    reservedDataIndexs,
    reservedDataUsernames
  );
  return cubeStates;
};

const getRoomDatas = (roomList, timeRegion, reservedDatas) => {
  return roomList.map((room) => {
    return convertDatasTimeToIndex(timeRegion, reservedDatas)
      .slice()
      .filter((data) => {
        return data.room === room.id;
      });
  });
};

const Board = ({
  calendarDate = "",
  setPlanData,
  selectedRoom = "",
  isReadOnly,
  needRefreshPage,
  setNeedRefreshPage,
}) => {
  const { ROOM_LIST, START_TIME, END_TIME, TIME_REGION, TIME_REGION_MAPPING } =
    useConstRoomData();

  useEffect(async () => {
    const fetchData = async () => {
      const fetchedData = await getReservedData(
        calendarDate,
        undefined,
        selectedRoom
      );
      if (fetchedData === null) {
        return;
      }
      const resultData = fetchedData.result;
      if (resultData === null) {
        // console.log("fetch data is null");
      }
      setReservedData(resultData);
      setInit(resultData);
    };
    fetchData();
  }, [calendarDate, needRefreshPage]);
  const setInit = (data) => {
    setLineCubeState(
      setRoomCubes(
        ROOM_LIST,
        cubeInitData,
        getReserverdDataTimeStatus(data),
        getReserverdDataUsernames(data)
      )
    );
  };

  const handleRoomCubes = (roomList) => {
    return setRoomCubes(
      roomList,
      cubeInitData,
      getReserverdDataTimeStatus(reservedData),
      getReserverdDataUsernames(reservedData)
    );
  };

  /* roomList
    {
      "id":"A",
      "title":"A包廂",
      "subtitle":"F1", 
      "machine":"((JOYSOUND))"
    },
  */

  let cubeInitData = {
    startNum: START_TIME,
    endNum: END_TIME,
  };

  const getReserverdDataTimeStatus = (data) => {
    let reservedStatus = getEachTimeReservedStatus(
      getRoomDatas(ROOM_LIST, TIME_REGION, data),
      TIME_REGION_MAPPING,
      ROOM_LIST
    );
    return reservedStatus;
  };
  const getReserverdDataUsernames = (data) => {
    let usernames = getEachTimeReservedUsername(
      getRoomDatas(ROOM_LIST, TIME_REGION, data),
      TIME_REGION_MAPPING,
      ROOM_LIST
    );
    return usernames;
  };

  const switchCurrentRoom = (roomId, cubeId) => {
    /*
      currentRoom: [ {roomId:"",cubeId:"", index:number}, {roomId:"",cubeId:"",index:number} ]
    */
    let needInit = false;
    const firstRoom = currentRoom.slice()[0];
    const secondRoom = currentRoom.slice()[1];
    // console.log(firstRoom.roomId + ", " + secondRoom.roomId);
    const empty = { roomId: "", cubeId: "", index: -1 };
    //取得 index
    const firstCubeIdIndex = TIME_REGION_MAPPING.indexOf(firstRoom.cubeId);
    const cubeIdIndex = TIME_REGION_MAPPING.indexOf(cubeId);
    let newRoom = null;

    if (firstRoom.roomId === secondRoom.roomId) {
      //當作是新的點擊
      // console.log("新的點擊");
      newRoom = [{ roomId: roomId, cubeId: cubeId, index: cubeIdIndex }, empty];
      setCurrentRoom(newRoom);
      needInit = true;

      return needInit;
    }

    /*
      排除後，currentRoom只會剩下這種情況: [{"roomId", "cubeId"}, {"", ""}]
      因為 e.g. roomId=A (first) 和 roomId=B (second) 的情況並不存在
    */
    let needResetRoom = false;
    let isSelectFinished = false;
    switch (firstRoom.roomId) {
      case roomId:
        //本次點擊 和 前次點擊 的 roomId 一樣
        // console.log("本次點擊 和 前次點擊 的 roomId 一樣");
        /* 會有三種情況:
          1. 兩次點的是同一個時間方塊
              newRoom = [empty, empty]; //reset
          2. 本次點擊 和 前次點擊 之間有已經被預約的時間區塊:
              newRoom = [empty, empty]; //reset

          3. 本次點擊 和 前次點擊 之間沒有已經被預約的時間區塊:
              判斷 cubeId 大於 或 等於 或 小於 firstRoom.cubeId
                大於: [firstRoom, { [roomId]: roomId, [cubeId]: cubeId }]; //選擇完成
                等於: 直接break
                小於: newRoom = [{ [roomId]: roomId, [cubeId]: cubeId }, empty];//當作是新的點擊
        */
        //condition 1:兩次點的是同一個時間方塊
        if (firstRoom.cubeId === cubeId) {
          needResetRoom = true;
          break;
        }
        //condition 2: 如果有已經被預約的時間區塊: reset
        for (let i = firstCubeIdIndex; i <= cubeIdIndex; i++) {
          if (getReserverdDataTimeStatus(reservedData)[roomId][i]) {
            needResetRoom = true;
            break;
          }
        }
        if (needResetRoom) {
          // console.log("有已經被預約的時間區塊: reset");
          break;
        }

        //condition 3: 如果沒有已經被預約的時間區塊
        if (cubeIdIndex > firstCubeIdIndex) {
          const firstCubeIdNum = parseInt(
            firstRoom.cubeId.replace(myRe, ""),
            10
          );
          newRoom = [
            firstRoom,
            { roomId: roomId, cubeId: cubeId, index: cubeIdIndex },
          ];
          setCurrentRoom(newRoom);
          let duration = (cubeIdIndex - firstCubeIdIndex + 1) * 0.5;
          setPlanData({
            room: roomId,
            duration: duration,
            start_time: `${firstCubeIdNum}:${
              firstRoom.cubeId.includes("L") ? "00" : "30"
            }`,
          }); //{ room: "A包廂", duration: 3, startTime: "11:00" };
          isSelectFinished = true;
          // console.log("選擇完成");
        }
        if (cubeIdIndex < firstCubeIdIndex) {
          newRoom = [
            { roomId: roomId, cubeId: cubeId, index: cubeIdIndex },
            empty,
          ];
          setCurrentRoom(newRoom);
          needInit = true;
          // console.log("新的點擊");
        }
        break;

      default:
        //本次點擊 和 前次點擊 的 roomId 不一樣: 當作是新的點擊
        // console.log("本次點擊 和 前次點擊 的 roomId 不一樣");
        newRoom = [
          { roomId: roomId, cubeId: cubeId, index: cubeIdIndex },
          empty,
        ];
        setCurrentRoom(newRoom);
        needInit = true;
        break;
    }

    if (needResetRoom) {
      newRoom = [empty, empty];
      setCurrentRoom(newRoom);
      needInit = true;
    }
    if (!isSelectFinished) {
      setPlanData({});
    }
    return needInit;
  };
  const [reservedData, setReservedData] = useState(null);
  const [lineCubeState, setLineCubeState] = useState({});

  const [currentRoom, setCurrentRoom] = useState([
    { roomId: "", cubeId: "", index: -1 },
    { roomId: "", cubeId: "", index: -1 },
  ]); //[前次點擊, 本次點擊]
  return (
    <div className="board">
      {ROOM_LIST.filter((room) =>
        selectedRoom === ""
          ? room.id !== selectedRoom
          : room.id === selectedRoom
      ).map((room) => (
        <div
          key={`boardItem${room.title}`}
          className="board__reservationBoardItem common__interval--normal"
        >
          <div className="board__reservationBoardItem__room">
            <p className="board__reservationBoardItem__room__title common__interval--shrink ">{`${room.title}-${room.subtitle}`}</p>
            <p className="board__reservationBoardItem__room__machine">
              {room.machine}
            </p>
          </div>
          <div className="board__reservationBoardItem__reservedBoard">
            {Object.keys(lineCubeState).length !== 0 ? (
              <TimeLine
                roomId={room.id}
                timeRegion={TIME_REGION}
                timeRegionMapping={TIME_REGION_MAPPING}
                switchCurrentRoom={switchCurrentRoom}
                lineCubeState={lineCubeState}
                setRoomCubes={handleRoomCubes}
                roomList={ROOM_LIST}
                setLineCubeState={setLineCubeState}
                currentRoom={currentRoom}
                isReadOnly={isReadOnly}
                needRefreshPage={needRefreshPage}
                setNeedRefreshPage={setNeedRefreshPage}
              ></TimeLine>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export {
  Board,
  getRoomDatas,
  getEachTimeReservedStatus,
  useConstRoomData,
  convertDataTimeToIndex,
};
