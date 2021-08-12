import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Footer from "./pages/Footer";

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const ls = JSON.parse(window.localStorage.getItem('taskList'));
    if(ls) {
      setList(ls);
    }
    document.title = "Todo App";
  }, []);

  useEffect(() => {
    localStorage.removeItem('taskList');
    localStorage.setItem('taskList', JSON.stringify(list));
  }, [list]);
  
  const addItem = (obj) => {
    setList(obj);
  }

  return (
    <>
      <div className="container">
        <div className="my-4 box">
          <AddTask setList={addItem}/>
          <hr />
          <TaskList listData={list} setList={setList}/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
