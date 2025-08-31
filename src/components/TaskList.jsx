import React, { useState, useEffect } from "react";
import TimeTracker from "./TimeTracker";

const TaskList = ({ role, filters, sortBy, onTaskUpdate, onTaskDelete, onEditTask }) => {
  const [tasks, setTasks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (role === "developer") {
      storedTasks = storedTasks.filter(
        (task) => task.assignee === currentUser.name
      );
    }

    if (filters.status !== "All") {
      storedTasks = storedTasks.filter((task) => task.status === filters.status);
    }
    if (filters.priority !== "All") {
      storedTasks = storedTasks.filter((task) => task.priority === filters.priority);
    }
    if (filters.assignee !== "All") {
      storedTasks = storedTasks.filter((task) => task.assignee === filters.assignee);
    }

    if (sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      storedTasks.sort(
        (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    } else if (sortBy === "dueDate") {
      storedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    setTasks(storedTasks);
  }, [filters, sortBy, role, onTaskUpdate]);

  const handleStatusChange = (taskId, newStatus) => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    onTaskUpdate();
  };

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = storedTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      onTaskDelete();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-purple-100 text-purple-800";
      case "Pending Approval":
        return "bg-orange-100 text-orange-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li key={task.id} className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                <p>
                  <span className="font-semibold text-gray-700">Assignee:</span> {task.assignee}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Due Date:</span> {task.dueDate}
                </p>
              </div>

              {role === "developer" && (
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleStatusChange(task.id, "Pending Approval")}
                    disabled={task.status === "Closed" || task.status === "Pending Approval"}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    Close Bug
                  </button>
                  <button
                    onClick={() => onEditTask(task)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}

              {role === "manager" && task.status === "Pending Approval" && (
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleStatusChange(task.id, "Closed")}
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(task.id, "Open")}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-700 transition-colors"
                  >
                    Re-open
                  </button>
                </div>
              )}
              
              {role === "developer" && <TimeTracker task={task} onTaskUpdate={onTaskUpdate} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;