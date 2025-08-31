import React, { useState, useEffect } from "react";

const USERS = [
  { email: "manager@test.com", password: "1234", role: "manager", name: "Manager" },
  { email: "dev1@test.com", password: "1234", role: "developer", name: "Developer 1" },
  { email: "dev2@test.com", password: "1234", role: "developer", name: "Developer 2" },
  { email: "dev3@test.com", password: "1234", role: "developer", name: "Developer 3" },
];
const developers = USERS.filter(u => u.role === "developer");

const FilterSortBar = ({ filters, setFilters, sortBy, setSortBy }) => {
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    const allDevelopers = developers.map((dev) => dev.name);
    setAssignees(["All", ...allDevelopers]);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <label className="text-gray-600 font-medium">Status:</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400"
        >
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Pending Approval</option>
          <option>Closed</option>
        </select>
      </div>

      <div className="flex items-center space-x-2 w-full md:w-auto">
        <label className="text-gray-600 font-medium">Priority:</label>
        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="flex items-center space-x-2 w-full md:w-auto">
        <label className="text-gray-600 font-medium">Assignee:</label>
        <select
          name="assignee"
          value={filters.assignee}
          onChange={handleFilterChange}
          className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400"
        >
          {assignees.map((assignee) => (
            <option key={assignee}>{assignee}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2 w-full md:w-auto">
        <label className="text-gray-600 font-medium">Sort by:</label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400"
        >
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;