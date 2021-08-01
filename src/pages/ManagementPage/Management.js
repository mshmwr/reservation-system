import React, { useState } from "react";
import "./Management.css";
import Calendar from "../../components/Calendar";
import { Board, getConstData } from "../../components/Board";
import { TODAY_DATE } from "../../utils/Date";

const { ROOM_LIST } = getConstData();

function Management() {
  const dateData = TODAY_DATE;

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
  return (
    <div className="management common__pageFrame">
      <div className="management__closeIcon" onClick={closeClickHandler}>
        <div className="management__closeIcon__hamburger" />
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
              <option value="" className="">
                all rooms
              </option>
              {ROOM_LIST.map((room) => (
                <option key={room.id} value={`${room.id}`} className="">
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
