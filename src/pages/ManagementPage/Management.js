import React, { useState } from "react";
import "./Management.css";
import Calendar from "../../components/Calendar";
import { Board } from "../../components/Board";
import { TODAY_DATE } from "../../utils/Date";

function Management() {
  const dateData = TODAY_DATE;

  const [needRefreshPage, setNeedRefreshPage] = useState(false); //1
  const [selectedRoom, setSelectedRoom] = useState(""); //1
  const [showTimeLineBoard, setShowTimeLineBoard] = useState(false); //1
  const handleRoomSelectChange = (e) => {
    setSelectedRoom(e.target.value);
  };
  const closeClickHandler = () => {
    setShowTimeLineBoard(!showTimeLineBoard);
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
            <label>Select Room</label>
            <select onChange={handleRoomSelectChange}>
              <option value="" className="">
                all rooms
              </option>
              <option value="A" className="">
                A
              </option>
              <option value="B" className="">
                B
              </option>
              <option value="C" className="">
                C
              </option>
            </select>
          </div>
        </div>

        <div className={`management__frame__timeline`}>
          <div className="management__frame__timeline__board">
            <Board
              calenderDate={dateData}
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
      />
    </div>
  );
}

export default Management;
