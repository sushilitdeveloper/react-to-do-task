import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const ls = JSON.parse(window.localStorage.getItem('taskList'));
    if(ls) {
      setList(ls);
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('taskList');
    localStorage.setItem('taskList', JSON.stringify(list));
  }, [list]);
  return (
    <>
      <div className="container">
        <div className="my-4 box">
          <AddTask setList={setList}/>
          <hr />
          <TaskList listData={list} setList={setList}/>
        </div>
      </div>
    </>
  );
}

export default App;
