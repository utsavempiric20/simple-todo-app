import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const loadData = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const [tasks, setTasks] = useState(loadData);
  const [userInput, setUserInput] = useState("");

  const addTask = (event) => {
    event.preventDefault();
    const date = new Date();
    const taskData = { id: date, taskMessage: userInput, isChecked: false };
    setTasks([...tasks, taskData]);
    setUserInput("");
  };

  const handleDelete = (id) => {
    const deletedItems = tasks.filter((item) => {
      return id !== item.id;
    });
    setTasks(deletedItems);
  };

  const handleChecked = (id) => {
    const checkedItems = tasks.filter((item) => {
      if (id === item.id) {
        item.isChecked = !item.isChecked;
        return item;
      }
      return item;
    });
    setTasks(checkedItems);
  };

  const handleUpdate = (id) => {
    let updateValue = prompt("Enter a value :");
    console.log(updateValue);
    const updatedItems = tasks.map((item) =>
      id === item.id ? { ...item, taskMessage: updateValue } : item
    );
    setTasks(updatedItems);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <form onSubmit={addTask}>
        <input
          placeholder="Enter task"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {tasks.map((item, index) => {
        return (
          <div key={item.id}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={!item.isChecked}
                id="flexCheckDefault"
                defaultChecked={item.isChecked}
                onClick={() => handleChecked(item.id)}
              />
              <label
                onClick={() => handleUpdate(item.id)}
                className="form-check-label"
                style={{
                  textDecoration: item.isChecked ? "line-through" : "none",
                }}
              >
                {item.taskMessage}
              </label>
              <button id={item.id} onClick={() => handleDelete(item.id)}>
                delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
