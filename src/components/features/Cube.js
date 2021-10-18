import React from "react";
const Cube = ({
  handleBoxToggle,
  cube,
  index,
  setPlanDataToTimeLine,
  roomId,
  currentRoom,
  cubeHover,
  restoreClickedCube,
  cubeClicked,
}) => {
  const toggleCubeClicked = (cubeID) => {
    restoreClickedCube(cubeID);
  };

  const setSelectedHover = () => {
    if (
      roomId === currentRoom.slice()[0].roomId &&
      cubeHover.slice()[index].isSelected
    ) {
      return "timeLineCube--selected-hovered";
    }
    return "";
  };

  const setCubeClicked = () => {
    if (
      roomId === currentRoom.slice()[0].roomId &&
      cubeClicked.slice()[index].isClicked
    ) {
      return "timeLineCube--selected-clicked";
    }
    return "";
  };

  return (
    <div
      onMouseOver={() => handleBoxToggle(`${cube.cubeId}${cube.label}`)}
      onClick={() => toggleCubeClicked(`${cube.cubeId}${cube.label}`)}
      className={`timeLineCube
        ${index % 2 ? "timeLineCube__bottom" : "timeLineCube__top"}

        ${setPlanDataToTimeLine(roomId, index) ? "timeLineCube--selected" : ""}


        ${setSelectedHover()}
        ${setCubeClicked()}

        ${cube.isReserved ? "timeLineCube--reserved" : ""}
  `}
      id={`${cube.cubeId}${cube.label}`}
    >
      {index % 2 ? `${cube.cubeId}:30` : `${cube.cubeId}:00`}
    </div>
  );
};

export default Cube;
