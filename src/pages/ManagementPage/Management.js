import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Management.css";
import Calendar from "../../components/features/Calendar";
import { Board } from "../../components/features/Board";
import useConstRoomData from "../../utils/Time";
import { TODAY_DATE } from "../../utils/Date";
import { deleteUser } from "../../apis/usersApi";
import Hamburger from "../../components/ui/Hamburger";
import Button from "../../components/ui/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useBoardAction from "../../action/features/boardAction";

function Management() {
  //action

  const {
    setBoardCalendarDate,
    setBoardSelectedRoom,
    setBoardIsReadOnly,
    setBoardRefresh,
  } = useBoardAction();

  //selector
  //
  const { t } = useTranslation();
  const { ROOM_LIST } = useConstRoomData();
  const history = useHistory();

  const [selectedRoom, setSelectedRoom] = useState("");
  const [needRefreshPage, setNeedRefreshPage] = useState(false);
  const [managementSelectedDate, setManagementSelectedDate] =
    useState(TODAY_DATE);
  const [showTimeLineBoard, setShowTimeLineBoard] = useState(false);
  const handleRoomSelectChange = (e) => {
    setSelectedRoom(e.target.value); //for calendar component
    setBoardSelectedRoom(e.target.value);
  };
  const closeClickHandler = () => {
    setShowTimeLineBoard(!showTimeLineBoard);
  };

  const handleManagementDateChange = (e) => {
    setManagementSelectedDate(e.target.value);
    setBoardCalendarDate(e.target.value);
  };

  const logoutButtonClickHandler = async () => {
    await deleteUser();
    history.push("/");
    // console.log(parsedData);
  };

  useEffect(() => {
    setBoardSelectedRoom("");
    setBoardCalendarDate(TODAY_DATE);
    setBoardIsReadOnly(true);
    setBoardRefresh(false);
  }, []);

  return (
    <div className="management common__pageFrame">
      <div className={showTimeLineBoard ? "moveHamburger" : ""}>
        <Hamburger
          isShowItem={showTimeLineBoard}
          clickHandler={closeClickHandler}
        />
      </div>
      <div
        className={`management__frame ${
          showTimeLineBoard ? "" : "common__hidden"
        }`}
      >
        <div className={`management__frame__bg`} />
        <div className="management__frame__selectBlock">
          <div className="management__frame__selectBlock__item">
            <label className="common__font--bold">Select Room</label>
            <select onChange={handleRoomSelectChange}>
              <option value={t("roomInfo.selectDefaultOption.id")}>
                {t("roomInfo.selectDefaultOption.title")}
              </option>
              {ROOM_LIST.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.title}
                </option>
              ))}
            </select>
          </div>
          <div className="management__frame__selectBlock__item">
            <label className="common__font--bold">Selected Date</label>

            <input
              onChange={handleManagementDateChange}
              type="date"
              className=""
              value={useSelector((state) => state.boardReducer.calendarDate)}
            ></input>
          </div>
          <div className="management__frame__selectBlock__item">
            <Button
              text={t("memberSystemPage.card.instruction.logout")}
              clickEvent={logoutButtonClickHandler}
            />
          </div>
        </div>

        <div className={`management__frame__timeline`}>
          <div className="management__frame__timeline__board">
            <Board />
          </div>
        </div>
      </div>
      <Calendar
        needRefreshPage={needRefreshPage}
        setNeedRefreshPage={setNeedRefreshPage}
        selectedRoom={selectedRoom}
        setManagementSelectedDate={setManagementSelectedDate}
        managementSelectedDate={managementSelectedDate}
      />
    </div>
  );
}

export default Management;
