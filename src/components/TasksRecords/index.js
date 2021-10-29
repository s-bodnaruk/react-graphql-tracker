import React from "react";

import "./styles.css";

const TaskRecords = ({ chosenTask }) => {
  return (
    <div className="timeRecordsBlock">
      {chosenTask ?
        chosenTask.timerecords.map((record) => (
          <div className="taskBlock">
            <div>Task started: {record.startdate}</div>
            <div>Record id: {record.id}</div>
          </div>
        )) : <b className="warningText">Please select the task...</b>}
    </div>
  );
};

export default TaskRecords;
