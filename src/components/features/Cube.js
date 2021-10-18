import React, { useRef, useState } from "react";
const Cube = ({
  handleBoxToggle,
  cube,
  index,
  setPlanDataToTimeLine,
  roomId,
  currentRoom,
  cubeHover,
}) => {
  const isCubeClicked = useRef(false);
  const toggleCubeClicked = () => {
    isCubeClicked.current = !isCubeClicked.current;
  };

  const setSelectedHover = () => {
    if (
      roomId === currentRoom.slice()[0].roomId &&
      cubeHover.slice()[index].isSelected
    ) {
      isCubeClicked.current = false;
      return "timeLineCube--selected-hovered";
    }
    return "";
  };

  return (
    <div
      onMouseOver={() => handleBoxToggle(`${cube.cubeId}${cube.label}`)}
      onClick={toggleCubeClicked}
      className={`timeLineCube
        ${index % 2 ? "timeLineCube__bottom" : "timeLineCube__top"}

        ${setPlanDataToTimeLine(roomId, index) ? "timeLineCube--selected" : ""}

        ${isCubeClicked.current ? "timeLineCube--selected-clicked" : ""}
        ${setSelectedHover()}


        ${cube.isReserved ? "timeLineCube--reserved" : ""}
  `}
      id={`${cube.cubeId}${cube.label}`}
    >
      {index % 2 ? `${cube.cubeId}:30` : `${cube.cubeId}:00`}
    </div>
  );
};

export default Cube;
