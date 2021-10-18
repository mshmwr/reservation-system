import React, { useState, useEffect } from "react";
import "./Management.css";
import Calendar from "../../components/features/Calendar";
import { TODAY_DATE } from "../../utils/Date";
import useBoardAction from "../../action/features/boardAction";

function Management() {
  //action

  const { setBoardCalendarDate, setBoardIsReadOnly, setBoardRefresh } =
    useBoardAction();

  //redux

  const [managementSelectedDate, setManagementSelectedDate] =
    useState(TODAY_DATE);

  useEffect(() => {
    setBoardCalendarDate(TODAY_DATE);
    setBoardIsReadOnly(true);
    setBoardRefresh(false);
  }, []);

  return (
    <div className="management common__pageFrame">
      <Calendar
        setManagementSelectedDate={setManagementSelectedDate}
        managementSelectedDate={managementSelectedDate}
      />
    </div>
  );
}

export default Management;
