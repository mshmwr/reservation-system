import {
  SET_FETCHED_RESERVED_DATA,
  SET_LINECUBE_STATE,
  SET_CURRENT_ROOM,
} from "../action/timelineAction";

const initState = {
  reservedData: null,
  lineCubeState: {},
  currentRoom: [
    { roomId: "", cubeId: "", index: -1 },
    { roomId: "", cubeId: "", index: -1 },
  ], //[前次點擊, 本次點擊]
};

const timelineReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FETCHED_RESERVED_DATA:
      return { ...state, reservedData: action.payload.reservedData };
    case SET_LINECUBE_STATE:
      return { ...state, lineCubeState: action.payload.lineCubeState };
    case SET_CURRENT_ROOM:
      return { ...state, currentRoom: action.payload.currentRoom };

    default:
      return state;
  }
};

export default timelineReducer;
