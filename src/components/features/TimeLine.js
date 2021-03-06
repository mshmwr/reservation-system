import React, { useState, useEffect } from "react";
import "./TimeLine.css";
import { useSelector } from "react-redux";
import useTimelineAction from "../../action/features/timelineAction";
import useBoardAction from "../../action/features/boardAction";
import useConstRoomData from "../../utils/Time";
import { convertDataTimeToIndex } from "./Board";
import Cube from "./Cube";

let hoverCube_clicked_first = -1;
let hoverCube_clicked_second = -1;
let hoverCube_hovered = -1;

const initCubeHover = (timeRegion) => {
  let hover = [];
  let times = [];
  timeRegion.forEach((time) => {
    times.push(time);
    times.push(time);
  });
  times.forEach((time, index) => {
    if (!(index % 2)) {
      hover.push({
        id: `${time}L`,
        isSelected: false,
        index: index,
        isClicked: false,
      });
    } else {
      hover.push({
        id: `${time}R`,
        isSelected: false,
        index: index,
        isClicked: false,
      });
    }
  });
  return hover;
};

//------------------------------------
export const TimeLine = ({
  roomId,
  timeRegion,
  timeRegionMapping,
  switchCurrentRoom,
  lineCubeState,
  setRoomCubes,
  roomList,
  currentRoom,
  isReadOnly,
}) => {
  //action
  const { setLineCubeState } = useTimelineAction();
  const { setBoardRefresh } = useBoardAction();

  //redux
  const needRefreshBoard = useSelector(
    (state) => state.boardReducer.needRefreshBoard
  );

  //parameters
  const [cubeHover, setCubeHover] = useState(initCubeHover(timeRegion));
  const [cubeClicked, setCubeClicked] = useState(initCubeHover(timeRegion));
  const planData = useSelector((state) => state.orderReducer.planData);
  const { TIME_REGION } = useConstRoomData();

  //functions
  const setPlanDataToTimeLine = (roomId, cubeIndex) => {
    //check planData room, start_time, duration
    let isPlanDataEmpty = false;

    if (Object.keys(planData).length === 0) {
      //{}
      return false;
    }

    Object.entries(planData).forEach(([key, value]) => {
      if (value === "") {
        isPlanDataEmpty = true;
      }
    });
    if (isPlanDataEmpty) {
      return false;
    }

    //check the roomId is same or not
    if (planData.room !== roomId) {
      return false;
    }

    //convert start time and duration to index
    const indexsData = convertDataTimeToIndex(TIME_REGION, planData)[0];
    const startIndex = indexsData.startIndex;
    const endIndex = indexsData.endIndex;

    //if cubeIndex is in the range of startIndex and endIndex, return true
    if (startIndex <= cubeIndex && cubeIndex <= endIndex) {
      return true;
    }
    return false;
  };

  const cubeClickHandler = (e) => {
    const cubeId = e.target.id;
    if (cubeId === "") return;
    if (roomId === cubeId) return;
    let needInit = switchCurrentRoom(roomId, cubeId);
    callSetLineCubeState(cubeId, needInit);
    changeCubeHover(cubeId, needInit);
  };

  const changeCubeHover = (cubeId, needInit) => {
    if (hoverCube_clicked_first >= 0 && hoverCube_clicked_second >= 0) {
      //起點 和 終點 皆已選擇，本次點擊當作是新的點擊
      hoverCube_clicked_first = timeRegionMapping.indexOf(cubeId);
      hoverCube_clicked_second = -1;
      setCubeHover(initCubeHover(timeRegion));
      restoreClickedCube(cubeId);
      // console.log("新的點擊");
      return;
    }
    if (hoverCube_clicked_first >= 0 && hoverCube_clicked_second === -1) {
      //已選擇了起點
      if (needInit) {
        /*  兩種情況
          1.  起點 和 終點 之間有已經被預約的時間區塊: reset
          2.  點選的時間區塊是 前次點選 > 當次點選，當作是新的點擊: reset
        */
        // console.log("當次操作的選擇無效: reset");
        hoverCube_clicked_first = timeRegionMapping.indexOf(cubeId);
        hoverCube_clicked_second = -1;
        setCubeHover(initCubeHover(timeRegion));
        restoreClickedCube(cubeId);
        callSetLineCubeState(cubeId, needInit);
        return;
      }
      //起點 和 終點 之間沒有已經被預約的時間區塊
      // console.log("選擇完成");
      hoverCube_clicked_second = timeRegionMapping.indexOf(cubeId);
      callSetLineCubeState(cubeId, needInit);
      restoreClickedCube(cubeId);
    }
    if (hoverCube_clicked_first === -1) {
      //還沒選擇 起點 和 終點
      // console.log("第一次選擇");
      hoverCube_clicked_first = timeRegionMapping.indexOf(cubeId);
      callSetLineCubeState(cubeId, needInit);
    }
  };

  const callSetLineCubeState = (cubeId, needInit) => {
    const cubesState = lineCubeState[roomId].slice();
    cubesState.forEach((cube) => {
      if (
        `${cube.roomId}${cube.cubeId}${cube.label}` === `${roomId}${cubeId}`
      ) {
        cube.isSelected = true;
      }
    });
    if (needInit) {
      let initLinesCube = setRoomCubes(
        roomList.filter((room) => room.id !== roomId)
      );
      setLineCubeState({ ...initLinesCube, [roomId]: cubesState });
      return;
    }
    // console.log("not needInit");
    setLineCubeState({ ...lineCubeState, [roomId]: cubesState });
  };

  const handleBoxToggle = (cubeId) => {
    /*
      起點 < cube 會設定 isSelected = true <= 目前指到的 cube 的位置 (hover) 
    */
    const cubes = cubeHover.slice();
    const cubesState = lineCubeState[roomId].slice();
    hoverCube_hovered = timeRegionMapping.indexOf(cubeId); //目前指到的 cube 的位置
    if (hoverCube_clicked_first >= 0 && hoverCube_clicked_second >= 0) {
      return; //起點和終點都選了
    }
    let isMeetReservedCube = false; //是否已經碰到被預約的cube
    cubes.forEach((cube, index) => {
      if (isMeetReservedCube) {
        //已經碰到被預約的cube，不再繼續hover
        return;
      }
      if (hoverCube_clicked_first === -1) {
        return; //還沒選起點
      }

      if (cube.index < hoverCube_clicked_first) {
        return; //cube的位置 < 起點的位置
      }
      if (
        cubesState[index].isReserved &&
        hoverCube_hovered > cubesState[index].index
      ) {
        isMeetReservedCube = true;
        return; //碰到已預約的cube
      }
      if (cube.index <= hoverCube_hovered) {
        cube.isSelected = true; //cube的位置 < 目前指到的 cube 的位置
        return;
      }
      cube.isSelected = false;
    });
    setCubeHover(cubes);
  };

  const restoreClickedCube = (cubeId) => {
    /*
      只儲存最新點擊的cube
    */
    const cubes = cubeClicked.slice();
    const clickedCubeIndex = timeRegionMapping.indexOf(cubeId); //目前指到的 cube 的位置

    cubes.forEach((cube) => {
      if (cube.index === clickedCubeIndex) {
        cube.isClicked = true; //cube的位置 < 目前指到的 cube 的位置
        return;
      }
      cube.isClicked = false;
    });
    setCubeClicked(cubes);
  };

  useEffect(() => {
    setCubeHover(initCubeHover(timeRegion));
    setCubeClicked(initCubeHover(timeRegion));
    setBoardRefresh(false);
  }, [needRefreshBoard]);

  return (
    <div
      className={`board__reservationBoardItem__timeLine ${
        isReadOnly ? "common__disablePointerEvent" : ""
      }
      `}
      id={roomId}
      onClick={cubeClickHandler}
    >
      {lineCubeState[roomId].map((cube, index) => (
        <Cube
          key={`cube${roomId}${index}`}
          handleBoxToggle={handleBoxToggle}
          cube={cube}
          index={index}
          setPlanDataToTimeLine={setPlanDataToTimeLine}
          roomId={roomId}
          currentRoom={currentRoom}
          cubeHover={cubeHover}
          restoreClickedCube={restoreClickedCube}
          cubeClicked={cubeClicked}
        />
      ))}
    </div>
  );
};
