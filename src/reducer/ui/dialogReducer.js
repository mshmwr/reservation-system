import { SET_DIALOG_TEXT, SET_DIALOG_TOGGLE, SET_DIALOG_WIDTH, SET_DIALOG_HEIGHT } from "../../action/ui/dialogAction"


const initState = {
    dialogText: "",
    dialogToggle: false,
    dialogWidth: "250px",
    dialogHeight: "250px"
}

const dialogReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_DIALOG_TEXT:
            return { ...state, dialogText: action.payload.dialogText }
        case SET_DIALOG_TOGGLE:
            return { ...state, dialogToggle: !state.dialogToggle }
        case SET_DIALOG_WIDTH:
            return { ...state, dialogWidth: action.payload.dialogWidth }
        case SET_DIALOG_HEIGHT:
            return { ...state, dialogHeight: action.payload.dialogHeight }
        default:
            return state;
    }
}

export default dialogReducer;