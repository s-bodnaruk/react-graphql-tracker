import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";

import {
  startTimerMutation,
  stopTimerMutation,
} from "../../graphql/mutations/timerMutations";

import { getTimer } from "../../utils/timer";
import { setToLocalStorage } from "../../utils/storage";

import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

import "./styles.css";

let timeInterval = null;

const Header = ({
  taskFromStorage,
  chosenTask,
  mutateTasks,
  setTaskFromStorage,
  setErrorMessage,
}) => {
  const initialTimer = getTimer(new Date(taskFromStorage?.startdate));

  const [time, setTime] = useState(initialTimer);

  useEffect(() => {
    if (!timeInterval) {
      timeInterval = setInterval(() => {
        setTime(getTimer(new Date(taskFromStorage?.startdate)));
      }, 1000);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [taskFromStorage]);

  const [startTimerecord] = useMutation(startTimerMutation, {
    errorPolicy: "none",
  });

  const [stopTimerecord] = useMutation(stopTimerMutation, {
    errorPolicy: "none",
  });

  const startTimer = () => {
    if (!taskFromStorage || taskFromStorage.running === false) {
      startTimerecord({
        variables: { input: { taskid: chosenTask.id } },
      })
        .then(({ data }) => {
          setToLocalStorage("task", data.startTimerecord);
          setTaskFromStorage(data.startTimerecord);
        })
        .catch((error) => {
          setErrorMessage("Can not start timer. Please, try again later.");
        });

      return;
    }

    if (taskFromStorage.running === true) {
      stopTimerecord({
        variables: { input: { taskid: taskFromStorage.task.id } },
      })
        .then(({ data }) => {
          mutateTasks(data.stopTimerecord);
          startTimerecord({
            variables: { input: { taskid: chosenTask.id } },
          })
            .then(({ data }) => {
              setToLocalStorage("task", data.startTimerecord);
              setTaskFromStorage(data.startTimerecord);
            })
            .catch((error) => {
              setErrorMessage("Can not stop timer. Please, try again later.");
            });
        })
        .catch((error) => {
          setErrorMessage("Can not start timer. Please, try again later.");
        });
    }
  };

  const stopTimer = () => {
    stopTimerecord({
      variables: { input: { taskid: chosenTask.id } },
    })
      .then(({ data }) => {
        setToLocalStorage("task", data.stopTimerecord);
        setTaskFromStorage(data.stopTimerecord);
        mutateTasks(data.stopTimerecord);
      })
      .catch((error) => {
        setErrorMessage("Can not stop timer. Please, try again later.");
      });
  };

  return (
    <div>
      {taskFromStorage?.running === true &&
      taskFromStorage?.task.id === chosenTask?.id ? (
        <div className="headerContainer">
          <div>
            <p>Current running task ID is {taskFromStorage?.task?.id}</p>
            <p>Started: {taskFromStorage?.startdate}</p>
            <p>Notes: {taskFromStorage?.notes || "none"}</p>
          </div>
          <h1>{time}</h1>
          <div className="buttonContainer">
            <Button
              onClick={stopTimer}
              type="primary"
              size="large"
              icon={<PauseCircleOutlined />}
            >
              Stop
            </Button>
          </div>
        </div>
      ) : (
        <div className="headerContainer">
          <div>
            You chose task '{chosenTask?.name}'. Id: {chosenTask?.id}. Would you
            like to start new timerecord?
          </div>
          <div className="buttonContainer">
            <Button
              onClick={startTimer}
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
            >
              Start
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
