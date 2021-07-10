import React, { useState } from "react";
import "./TimeLine.css";
import { TimeLineOrder } from "./TimeLineOrder";

//------------------------------------
export const TimeLine = ({
  roomId,
  switchCurrentRoom,
  lineCubeState,
  initRoomListLineCube,
  roomList,
  setLineCubeState,
  currentRoom,
}) => {
  console.log("TimeLine");
  const cubeClickHandler = (e) => {
    console.log(roomId);
    const cubeId = e.target.id;
    console.log(cubeId);
    let needInit = switchCurrentRoom(roomId, cubeId);
    callSetLineCubeState(cubeId, needInit);
    changeCubeHover(cubeId);
  };
  const changeCubeHover = (cubeId) => {
    if (hoverCube_clicked_first >= 0 && hoverCube_clicked_second >= 0) {
      hoverCube_clicked_first = TIME_REGION_MAPPING.indexOf(cubeId);
      hoverCube_clicked_second = -1;
      setCubeHover(initCubeHover);
      return;
    }
    if (hoverCube_clicked_first >= 0 && hoverCube_clicked_second === -1) {
      hoverCube_clicked_second = TIME_REGION_MAPPING.indexOf(cubeId);
      callSetLineCubeState(cubeId);
    }
    if (hoverCube_clicked_first === -1) {
      hoverCube_clicked_first = TIME_REGION_MAPPING.indexOf(cubeId);
      callSetLineCubeState(cubeId);
    }
  };

  const callSetLineCubeState = (cubeId, needInit) => {
    const cubesState = lineCubeState[roomId].slice();
    cubesState.forEach((cube) => {
      if (
        `${cube.roomId}${cube.cubeId}${cube.label}` === `${roomId}${cubeId}`
      ) {
        cube.value = !cube.value;
      }
    });
    if (needInit) {
      console.log("needInit");
      let initLinesCube = initRoomListLineCube(
        roomList.filter((room) => room.id !== roomId)
      );
      setLineCubeState({ ...initLinesCube, [roomId]: cubesState });
      return;
    }
    console.log("not needInit");
    setLineCubeState({ ...lineCubeState, [roomId]: cubesState });
  };
  const handleBoxToggle = (cubeId) => {
    const cube = cubeHover.slice();
    hoverCube_hovered = TIME_REGION_MAPPING.indexOf(cubeId);
    if (hoverCube_clicked_first >= 0 && hoverCube_clicked_second >= 0) {
      return;
    }
    cube.forEach((item) => {
      if (hoverCube_clicked_first === -1) {
        return;
      }
      if (item.index < hoverCube_clicked_first) {
        return;
      }
      if (item.index <= hoverCube_hovered) {
        item.value = true;
        return;
      }
      item.value = false;
    });
    setCubeHover(cube);
  };
  const [cubeHover, setCubeHover] = useState(initCubeHover);

  return (
    <div
      className="board__reservationBoardItem__timeLine"
      id={roomId}
      onClick={cubeClickHandler}
    >
      {console.log(currentRoom.slice())}
      {lineCubeState[roomId].map((cube, index) => (
        <div
          onMouseOver={() => handleBoxToggle(`${cube.cubeId}${cube.label}`)}
          key={`${cube.cubeId}${cube.label}`}
          className={`timeLineCube
          ${index % 2 ? "timeLineCube__right" : "timeLineCube__left"}

          ${
            roomId === currentRoom.slice()[0].roomId &&
            cubeHover.slice()[index].value
              ? "timeLineCube--selected-hovered"
              : null
          }

          `}
          id={`${cube.cubeId}${cube.label}`}
        >
          {index % 2 ? null : `${cube.cubeId}`}
        </div>
      ))}
    </div>
  );
};

const TIME_REGION = [
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
];
const TIME_REGION_MAPPING = (() => {
  let time_mapping = [];
  TIME_REGION.forEach((time) => {
    time_mapping.push(`${time}L`);
    time_mapping.push(`${time}R`);
  });
  return time_mapping;
})();
let hoverCube_clicked_first = -1;
let hoverCube_clicked_second = -1;
let hoverCube_hovered = -1;

const initCubeHover = () => {
  let hover = [];
  let times = [];
  TIME_REGION.forEach((time) => {
    times.push(time);
    times.push(time);
  });
  times.forEach((time, index) => {
    if (!(index % 2)) {
      hover.push({
        id: `${time}L`,
        value: false,
        index: index,
      });
    } else {
      hover.push({
        id: `${time}R`,
        value: false,
        index: index,
      });
    }
  });
  return hover;
};
