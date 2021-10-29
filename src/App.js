import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";

import Header from "./components/Header/index";
import Task from "./components/Task/index";
import TaskRecords from "./components/TasksRecords/index";

import { getTasks } from "./graphql/queries/tasksQueries";

import { getFromLocalStorage } from "./utils/storage";

import { Spin, notification } from "antd";

import "./App.css";

const App = () => {
  const [chosenTaskId, setChosenTaskId] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskFromStorage, setTaskFromStorage] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const { loading, error, data } = useQuery(getTasks, {
    errorPolicy: "none",
  });

  useEffect(() => {
    if (data && !tasks.length) {
      setTasks(data.tasks);
    }
  }, [data]);

  useEffect(() => {
    const currentTask = getFromLocalStorage("task");
    setTaskFromStorage(currentTask);
  }, []);

  const chosenTask = tasks?.find((task) => task.id === chosenTaskId);

  const mutateTasks = (record) => {
    const tasksCopy = JSON.parse(JSON.stringify(tasks));

    setTasks(
      tasksCopy.map((task) => {
        if (record.task.id === task.id) {
          task.timerecords = [...task.timerecords, record];
        }

        return task;
      })
    );
  };

  if (error) return <div>No data</div>;

  const openNotification = () => {
    notification.error({
      key: "error",
      message: "Error",
      description: errorMessage,
    });
    setErrorMessage(null);
  };

  return (
    <div className="App">
      {errorMessage && openNotification()}
      {!chosenTask ? (
        <div>Please, choose a task</div>
      ) : (
        <Header
          chosenTask={chosenTask}
          taskFromStorage={taskFromStorage}
          setTaskFromStorage={setTaskFromStorage}
          mutateTasks={mutateTasks}
          setErrorMessage={setErrorMessage}
        />
      )}
      {loading ? (
        <div className="loadingSpinner">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <div className="taskContainer">
          {tasks.length > 0 ? (
            <Task
              tasks={tasks}
              setTaskFromStorage={setTaskFromStorage}
              taskFromStorage={taskFromStorage}
              setChosenTaskId={setChosenTaskId}
            />
          ) : null}
          <TaskRecords chosenTask={chosenTask} />
        </div>
      )}
    </div>
  );
};

export default App;
