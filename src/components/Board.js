import React, { useState } from "react";
import "./Board.css";
import data from "../data.json";
import { TimeLine } from "./TimeLine";

export const Board = ({ setPlanData }) => {
  const [currentRoom, setCurrentRoom] = useState([
    { roomId: "", cubeId: "", index: -1 },
    { roomId: "", cubeId: "", index: -1 },
  ]); //[前次點擊, 本次點擊]
  const [lineCubeState, setLineCubeState] = useState(setRoomCubes(ROOM_LIST));

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
      console.log("新的點擊");
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
        //取得 num
        // const firstCubeIdIndex = TIME_REGION_MAPPING.indexOf(firstRoom.cubeId);
        // const cubeIdIndex = TIME_REGION_MAPPING.indexOf(cubeId);

        //本次點擊 和 前次點擊 的 roomId 一樣
        console.log("本次點擊 和 前次點擊 的 roomId 一樣");
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
          // if (RESERVED_DATA_INDEXS[roomId].includes(i)) {
          //   needResetRoom = true;
          //   break;
          // }
          if (RESERVED_DATA_INDEXS[roomId][i]) {
            needResetRoom = true;
            break;
          }
        }
        if (needResetRoom) {
          console.log("有已經被預約的時間區塊: reset");
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
            startTime: `${firstCubeIdNum}:${
              firstRoom.cubeId.includes("L") ? "00" : "30"
            }`,
          }); //{ room: "A包廂", duration: 3, startTime: "11:00" };
          isSelectFinished = true;
          console.log("選擇完成");
        }
        if (cubeIdIndex < firstCubeIdIndex) {
          newRoom = [
            { roomId: roomId, cubeId: cubeId, index: cubeIdIndex },
            empty,
          ];
          setCurrentRoom(newRoom);
          needInit = true;
          console.log("新的點擊");
        }
        break;

      default:
        //本次點擊 和 前次點擊 的 roomId 不一樣: 當作是新的點擊
        console.log("本次點擊 和 前次點擊 的 roomId 不一樣");
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

  return (
    <div className="board common__block">
      {ROOM_LIST.map((room, index) => (
        <div
          key={`boardItem${index}`}
          className="board__reservationBoardItem common__interval--normal"
        >
          <div className="board__reservationBoardItem__room">
            <p className="board__reservationBoardItem__room__title common__interval--shrink ">{`${room.title}-${room.subtitle}`}</p>
            <p className="board__reservationBoardItem__room__machine">
              {room.machine}
            </p>
          </div>
          <div className="board__reservationBoardItem__reservedBoard">
            <TimeLine
              roomId={room.id}
              timeRegion={TIME_REGION}
              timeRegionMapping={TIME_REGION_MAPPING}
              switchCurrentRoom={switchCurrentRoom}
              lineCubeState={lineCubeState}
              setRoomCubes={setRoomCubes}
              roomList={ROOM_LIST}
              setLineCubeState={setLineCubeState}
              currentRoom={currentRoom}
            ></TimeLine>
          </div>
        </div>
      ))}
    </div>
  );
};

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

const setRoomCubes = (roomList) => {
  let initLineCubeStates = initRoomListLineCube(roomList);
  let cubeStates = fillReservedData(roomList, initLineCubeStates);
  return cubeStates;
};

const initRoomListLineCube = (roomList) => {
  let state = {};
  roomList.forEach((room) => {
    let lineCube = initLineCube(START_NUM, END_NUM, room.id);
    state[room.id] = lineCube;
  });
  return state;
};

const fillReservedData = (roomList, lineCubeStates) => {
  let cubeStates = {};
  let lineCubeState = null;
  let reservedIndex = null;
  let username = null;
  roomList.forEach((room) => {
    lineCubeState = lineCubeStates[room.id].slice();
    reservedIndex = RESERVED_DATA_INDEXS[room.id].slice();
    username = RESERVED_DATA_USERNAMES[room.id].slice();
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

const transferTimeToIndex = (roomDatas) => {
  let reservedIndexs = {};
  roomDatas.forEach((roomData) => {
    let regionReserved = new Array(TIME_REGION_MAPPING.length).fill(false);
    let roomId = "";
    roomData.forEach((data) => {
      roomId = data.room;
      for (let i = 0; i < TIME_REGION_MAPPING.length; i++) {
        if (i >= data.startIndex && i <= data.endIndex) {
          regionReserved[i] = true;
        }
      }
    });
    reservedIndexs[roomId] = regionReserved;
  });
  return reservedIndexs;
};
const transferTimeToUsername = (roomDatas) => {
  let reservedUsernames = {};
  roomDatas.forEach((roomData) => {
    let usernames = new Array(TIME_REGION_MAPPING.length).fill("");
    let roomId = "";
    roomData.forEach((data) => {
      roomId = data.room;
      for (let i = 0; i < TIME_REGION_MAPPING.length; i++) {
        if (i >= data.startIndex && i <= data.endIndex) {
          usernames[i] = data.name;
        }
      }
    });
    reservedUsernames[roomId] = usernames;
  });
  return reservedUsernames;
};

const TIME_REGION = [
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
];
const START_NUM = TIME_REGION[0];
const END_NUM = TIME_REGION[TIME_REGION.length - 1];
const TIME_REGION_MAPPING = (() => {
  let time_mapping = [];
  TIME_REGION.forEach((time) => {
    time_mapping.push(`${time}L`);
    time_mapping.push(`${time}R`);
  });
  return time_mapping;
})();
const myRe = /\D+/g;
const ROOM_LIST = data.reservationPage.selectStep.roomList;
/* roomList
  {
    "id":"A",
    "title":"A包廂",
    "subtitle":"F1", 
    "machine":"((JOYSOUND))"
  },
*/
const RESERVED_DATA = data.reservedData;
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

const convertTimeToIndex = () => {
  let reservedDataIndexs = [];
  RESERVED_DATA.forEach((data) => {
    let hr = data.time.split(":")[0];
    let min = data.time.split(":")[1];
    let startIndex =
      TIME_REGION.indexOf(parseInt(hr, 10)) * 2 + (min === "00" ? 0 : 1);
    let endIndex = startIndex + (data.duration / 0.5 - 1);
    reservedDataIndexs.push({
      ...data,
      startIndex: startIndex,
      endIndex: endIndex,
    });
  });
  return reservedDataIndexs;
};
const ROOM_DATAS = ROOM_LIST.map((room) => {
  return convertTimeToIndex()
    .slice()
    .filter((data) => {
      return data.room === room.id;
    });
});
const RESERVED_DATA_INDEXS = (() => {
  let indexs = transferTimeToIndex(ROOM_DATAS);
  return indexs;
})();

const RESERVED_DATA_USERNAMES = (() => {
  let usernames = transferTimeToUsername(ROOM_DATAS);
  return usernames;
})();
