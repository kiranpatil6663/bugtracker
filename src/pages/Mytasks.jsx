import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import FilterSortBar from "../components/FilterSortBar";
import TaskForm from "../components/TaskForm";

export default function MyTasks() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const role = currentUser?.role;

  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
    assignee: "All",
  });
  const [sortBy, setSortBy] = useState("priority");

  const refreshTasks = () => {
    setRefresh(!refresh);
    setShowForm(false);
    setTaskToEdit(null);
  };

  const startEditTask = (task) => {
    setShowForm(true);
    setTaskToEdit(task);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          My Tasks 📋
        </h1>
        
        {showForm && role === "developer" ? (
          <TaskForm onTaskAdded={refreshTasks} taskToEdit={taskToEdit} />
        ) : (
          <>
            <FilterSortBar
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <TaskList
              role={role}
              filters={filters}
              sortBy={sortBy}
              onTaskUpdate={refreshTasks}
              onTaskDelete={refreshTasks}
              onEditTask={startEditTask}
            />
          </>
        )}
      </div>
    </>
  );
}