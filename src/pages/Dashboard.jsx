import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterSortBar from "../components/FilterSortBar";

const Dashboard = () => {
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
    setTaskToEdit(null);
    setShowForm(false);
  };

  const startEditTask = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Welcome to {role}'s Dashboard 
        </h1>

        {(role === "developer") && (
          <div className="text-center mb-6">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setTaskToEdit(null);
              }}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
            >
              {showForm ? "Cancel Creation" : "Create New Task"}
            </button>
          </div>
        )}

        {showForm && (role === "manager" || role === "developer") && (
          <TaskForm onTaskAdded={refreshTasks} taskToEdit={taskToEdit} />
        )}
        
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
      </div>
    </>
  );
};

export default Dashboard;