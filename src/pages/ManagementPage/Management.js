import React from "react";
import "./Management.css";
import Calendar from "../../components/Calendar";
import { Board } from "../../components/Board";
// import { Button } from "../../components/Button";
// import { Link } from "react-router-dom";

function Management() {
  const lineCubeState = {};
  const setPlanData = () => {
    console.log("setPlanData");
  };
  const dateData = TODAY_DATE;
  return (
    <div className=" management common__pageFrame">
      Management
      {/* <Board setPlanData={setPlanData} calenderDate={dateData} /> */}
      <Calendar />
    </div>
  );
}

const TODAY_DATE = (() => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
  const today = localISOTime.slice(0, 10);
  return today;
})();

export default Management;
