import React, { useState } from "react";
import "./Board.css";
import data from "../data.json";
import { TimeLine } from "./TimeLine";

export const Board = () => {
  const [currentRoom, setCurrentRoom] = useState([
    { roomId: "", cubeId: "", index: -1 },
    { roomId: "", cubeId: "", index: -1 },
  ]); //[前次點擊, 本次點擊]
  console.log("Board");
  const [lineCubeState, setLineCubeState] = useState(
    initRoomListLineCube(ROOM_LIST)
  );
  const switchCurrentRoom = (roomId, cubeId) => {
    /*
      currentRoom: [ {roomId:"",cubeId:"", index:number}, {roomId:"",cubeId:"",index:number} ]
    */
    let needInit = false;
    const firstRoom = currentRoom.slice()[0];
    const secondRoom = currentRoom.slice()[1];
    const empty = { roomId: "", cubeId: "", index: -1 };

    let newRoom = null;

    if (firstRoom.roomId === secondRoom.roomId) {
      //當作是新的點擊
      console.log("新的點擊");
      newRoom = [{ roomId: roomId, cubeId: cubeId }, empty];
      setCurrentRoom(newRoom);

      if (firstRoom.roomId !== "") {
        //當Board已經是全空時，不用做init
        needInit = true;
      }

      return needInit;
    }

    /*
      排除後，currentRoom只會剩下這種情況: [{"roomId", "cubeId"}, {"", ""}]
      因為 e.g. roomId=A (first) 和 roomId=B (second) 的情況並不存在
    */
    switch (firstRoom.roomId) {
      case roomId:
        //本次點擊 和 前次點擊 的 roomId 一樣
        console.log("本次點擊 和 前次點擊 的 roomId 一樣");
        /*
          判斷 cubeId 大於 或 等於 或 小於 firstRoom.cubeId
            大於: [firstRoom, { [roomId]: roomId, [cubeId]: cubeId }]; //換掉secondRoom
            等於: 直接break
            小於: newRoom = [{ [roomId]: roomId, [cubeId]: cubeId }, empty];//當作是新的點擊
        */
        //取得num
        const firstCubeIdNum = parseInt(firstRoom.cubeId.replace(myRe, ""), 10);
        const cubeIdNum = parseInt(cubeId.replace(myRe, ""), 10);

        if (cubeIdNum > firstCubeIdNum) {
          newRoom = [firstRoom, { roomId: roomId, cubeId: cubeId }];
          setCurrentRoom(newRoom);
        } else if (cubeIdNum < firstCubeIdNum) {
          newRoom = [{ roomId: roomId, cubeId: cubeId }, empty];
          setCurrentRoom(newRoom);
        } else {
          break;
        }
        break;

      default:
        //本次點擊 和 前次點擊 的 roomId 不一樣: 當作是新的點擊
        console.log("本次點擊 和 前次點擊 的 roomId 不一樣");
        newRoom = [{ roomId: roomId, cubeId: cubeId }, empty];
        setCurrentRoom(newRoom);
        needInit = true;
        break;
    }
    return needInit;
  };
  /*
    data: {
      "A":[
        {"roomId":"A", "cubeId":"9", "label":"L", "value":boolean, "index":0},
        {"roomId":"A", "cubeId":"9", "label":"R", "value":boolean, "index":1},
        {"roomId":"A", "cubeId":"10", "label":"L", "value":boolean, "index":2},
        {"roomId":"A", "cubeId":"10", "label":"R", "value":boolean, "index":3},
        ...etc
      ],
      "B":[...(ry)],
      "C":[...(ry)]}
  */

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
          <TimeLine
            roomId={room.id}
            switchCurrentRoom={switchCurrentRoom}
            lineCubeState={lineCubeState}
            initRoomListLineCube={initRoomListLineCube}
            roomList={ROOM_LIST}
            setLineCubeState={setLineCubeState}
            currentRoom={currentRoom}
          ></TimeLine>
        </div>
      ))}
    </div>
  );
};

const ROOM_LIST = data.reservationPage.selectStep.roomList; //["A","B","C"]
const startNum = 9;
const endNum = 24;
const myRe = /\D+/g;

const initLineCube = (start, end, roomId) => {
  /*
    {"roomId":"A", "cubeId":"9", "label":"L", "value":boolean}
   */

  let lineCube = [];
  for (let i = start; i <= end; i++) {
    lineCube.push({
      roomId: roomId,
      cubeId: i,
      label: "L",
      value: false,
      index: (i - start) * 2,
    });
    lineCube.push({
      roomId: roomId,
      cubeId: i,
      label: "R",
      value: false,
      index: (i - start) * 2 + 1,
    });
  }
  return lineCube;
};

const initRoomListLineCube = (roomList) => {
  let state = {};
  roomList.forEach((room) => {
    let lineCube = initLineCube(startNum, endNum, room.id);
    state[room.id] = lineCube;
  });
  return state;
};
