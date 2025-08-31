import React, { useState, useEffect } from "react";

const USERS = [
  { email: "manager@test.com", password: "1234", role: "manager", name: "Manager" },
  { email: "dev1@test.com", password: "1234", role: "developer", name: "Developer 1" },
  { email: "dev2@test.com", password: "1234", role: "developer", name: "Developer 2" },
  { email: "dev3@test.com", password: "1234", role: "developer", name: "Developer 3" },
];
const developers = USERS.filter(u => u.role === "developer");

const TaskForm = ({ onTaskAdded, taskToEdit = null }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
    assignee: developers[0]?.name || "",
    dueDate: "",
    createdBy: currentUser.name,
    createdDate: new Date().toISOString(),
    timeLogs: [],
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (taskToEdit) {
      const updatedTasks = storedTasks.map((t) =>
        t.id === taskToEdit.id ? { ...task } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const newTask = { ...task, id: Date.now(), createdDate: new Date().toISOString() };
      storedTasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    setTask({
      title: "",
      description: "",
      priority: "Low",
      status: "Open",
      assignee: developers[0]?.name || "",
      dueDate: "",
      createdBy: currentUser.name,
      createdDate: new Date().toISOString(),
      timeLogs: [],
    });

    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        {taskToEdit ? "Edit Task" : "Create New Task"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Assignee</label>
          <select
            name="assignee"
            value={task.assignee}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-400"
          >
            {developers.map((dev) => (
              <option key={dev.name} value={dev.name}>{dev.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-400"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-400"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1 text-gray-600">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-400"
          rows="3"
        ></textarea>
      </div>
      <button
        type="submit"
        className="mt-6 w-full py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors"
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;