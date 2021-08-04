import React, { useState } from "react";
import "./Management.css";
import Calendar from "../../components/Calendar";
import { Board, getConstData } from "../../components/Board";
import { TODAY_DATE } from "../../utils/Date";
import { deleteUser } from "../../apis/usersApi";
import Hamburger from "../../components/Hamburger";
import multiLang_CHT from "../../data.json";
import Button from "../../components/Button";

const { ROOM_LIST } = getConstData();

function Management() {
  const [needRefreshPage, setNeedRefreshPage] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [managementSelectedDate, setManagementSelectedDate] =
    useState(TODAY_DATE);
  const [showTimeLineBoard, setShowTimeLineBoard] = useState(false);
  const handleRoomSelectChange = (e) => {
    setSelectedRoom(e.target.value);
  };
  const closeClickHandler = () => {
    setShowTimeLineBoard(!showTimeLineBoard);
  };

  const handleManagementDateChange = (e) => {
    setManagementSelectedDate(e.target.value);
  };

  const logoutButtonClickHandler = async () => {
    const parsedData = await deleteUser();
    console.log(parsedData);
  };
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
              <option value={multiLang_CHT.roomInfo.selectDefaultOption.id}>
                {multiLang_CHT.roomInfo.selectDefaultOption.title}
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
              value={managementSelectedDate}
            ></input>
          </div>
          <div className="management__frame__selectBlock__item">
            <Button
              text={multiLang_CHT.memberSystemPage.card.instruction.logout}
              clickEvent={logoutButtonClickHandler}
            />
          </div>
        </div>

        <div className={`management__frame__timeline`}>
          <div className="management__frame__timeline__board">
            <Board
              calendarDate={managementSelectedDate}
              selectedRoom={selectedRoom}
              needRefreshPage={needRefreshPage}
              isReadOnly={true}
            />
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
