import React, { useEffect } from "react";

import { getFromLocalStorage } from "../../utils/storage";

import "./styles.css";

const Task = ({ tasks, setTaskFromStorage, setChosenTaskId, taskFromStorage }) => {
  const chooseTask = (id) => {
    setChosenTaskId(id);
  };

  useEffect(() => {
    const currentTask = getFromLocalStorage("task");
    setTaskFromStorage(currentTask);
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div className="taskContainer" onClick={() => chooseTask(task.id)}>
          <div className="taskColumnLeft">
            <p >Id: {task.id}</p>
            <p>Name: {task.name}</p>
            <p>Total spent: {task.taskTotalTimespent}</p>
            {task.id === taskFromStorage?.task?.id &&
            taskFromStorage?.running === true ? (
              <b className="activeTask">Task is running</b>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
