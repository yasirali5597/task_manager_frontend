
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const[complecate,setComplicate] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


  const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(res.data);
  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data);
  }
};

useEffect(() => {
  fetchTasks();
}, []);

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/tasks/${editId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    setTitle("");
    fetchTasks();
  } catch (error) {
    console.error("Task save error:", error.response?.data);
  }
};

  // Delete
  // const deleteTask = async (id) => {
  //   await axios.delete(`http://localhost:5000/api/tasks/${id}`);
  //   fetchTasks();
  // };

const deleteTask = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    fetchTasks();
  } catch (error) {
    console.log("DELETE error:", error.response?.data);
  }
};

  // mark coded but this is not works 
 const completeTask = async (id) => {
  try {
    await axios.patch(
      `http://localhost:5000/api/tasks/complete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    fetchTasks();
  } catch (error) {
    console.log("COMPLETE error:", error.response?.data);
  }
};


  return (

<div className="p-2 max-w-xl mx-auto">
  {/* Header */}
  <div className="flex justify-between mb-3 bg-red-400 h-14 items-center rounded">
    <div>
      <h1 className="text-2xl font-bold text-white ml-3">
        📝 Task Manager
      </h1>
      <p className="text-xs text-white ml-3">
        CRUD Operations Dashboard
      </p>
    </div>

    <button
      onClick={logout}
      className="border h-8 w-20 bg-red-600 rounded mr-4 text-white hover:bg-red-700"
    >
      Logout
    </button>
  </div>

  {/* Task Info */}
  <div className="flex justify-between text-sm text-gray-600 mb-2">
    <p>Total Tasks: <b>{tasks.length}</b></p>
    <p>
      Completed:{" "}
      <b>{tasks.filter(task => task.completed).length}</b>
    </p>
  </div>

  {/* Input */}
  <div className="flex gap-2 mb-4">
    <input
      className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter your task here..."
    />

    <button
      className={`text-white px-4 rounded ${
        editId ? "bg-emerald-500" : "bg-blue-500"
      }`}
      onClick={handleSubmit}
    >
      {editId ? "Update" : "Add"}
    </button>
  </div>

  {/* Edit Mode Info */}
  {editId && (
    <p className="text-xs text-emerald-600 mb-2">
      ✏ Editing task — update and click “Update”
    </p>
  )}

  {/* Task List */}
  {tasks.length === 0 ? (
    <p className="text-center text-gray-500 mt-6">
      No tasks yet. Add your first task 🚀
    </p>
  ) : (
    tasks.map(task => (
      <div
        key={task._id}
        className="flex justify-between items-center border p-2 mb-2 rounded hover:bg-gray-50"
      >
        <span
          className={`${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </span>

        <div className="flex gap-2">
          {!task.completed && (
            <button
              onClick={() => completeTask(task._id)}
              className="bg-emerald-500 text-white px-2 rounded hover:bg-emerald-600"
              
            >
              ✔
            </button>
          )}

          <button
            onClick={() => {
              setEditId(task._id);
              setTitle(task.title);
            }}
            className="bg-yellow-500 text-white px-2 rounded hover:bg-yellow-600"
          >
            ✏
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
          >
            🗑
          </button>
        </div>
      </div>
    ))
  )}
</div>
  )}
  