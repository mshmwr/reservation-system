import { useDispatch } from "react-redux";

export const SET_FETCHED_RESERVED_DATA = "SET_FETCHED_RESERVED_DATA";
export const SET_LINECUBE_STATE = "SET_LINECUBE_STATE";
export const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";

export default function useTimelineAction() {
  const dispatch = useDispatch();
  const setReservedData = (fetchedData) => {
    dispatch({
      type: SET_FETCHED_RESERVED_DATA,
      payload: { reservedData: fetchedData },
    });
  };

  const setLineCubeState = (cubeState) => {
    dispatch({
      type: SET_LINECUBE_STATE,
      payload: { lineCubeState: cubeState },
    });
  };

  const setCurrentRoom = (newRoom) => {
    dispatch({
      type: SET_CURRENT_ROOM,
      payload: { currentRoom: newRoom },
    });
  };

  return { setReservedData, setLineCubeState, setCurrentRoom };
}
