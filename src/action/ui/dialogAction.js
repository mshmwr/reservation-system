import { useDispatch } from "react-redux";

export const SET_DIALOG_TEXT = "SET_DIALOG_TEXT";
export const SET_DIALOG_WIDTH = "SET_DIALOG_WIDTH";
export const SET_DIALOG_HEIGHT = "SET_DIALOG_HEIGHT";
export const SET_DIALOG_TOGGLE = "SET_DIALOG_TOGGLE";


export default function useDialogAction() {
    const dispatch = useDispatch();
    const setDialogText = (text) => {
        dispatch({
            type: SET_DIALOG_TEXT,
            payload: { dialogText: text }
        })
    }

    const setDialogToggle = () => {
        dispatch({
            type: SET_DIALOG_TOGGLE,
        })
    }

    const setDialogWidth = (width) => {
        dispatch({
            type: SET_DIALOG_WIDTH,
            payload: { dialogWidth: width }
        })
    }

    const setDialogHeight = (height) => {
        dispatch({
            type: SET_DIALOG_HEIGHT,
            payload: { dialogHeight: height }
        })
    }

    return { setDialogText, setDialogToggle, setDialogWidth, setDialogHeight };
}