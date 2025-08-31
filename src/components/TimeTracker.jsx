import React, { useState, useEffect } from "react";

const TimeTracker = ({ task, onTaskUpdate }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const startTracking = () => {
    setIsTracking(true);
    setStartTime(Date.now());
  };

  const stopTracking = () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const updatedTask = {
      ...task,
      timeLogs: [
        ...(task.timeLogs || []),
        {
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
          duration: duration,
        },
      ],
    };

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTasks = storedTasks.map((t) =>
      t.id === task.id ? updatedTask : t
    );
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setIsTracking(false);
    setStartTime(null);
    onTaskUpdate();
  };

  const calculateTotalTime = () => {
    const totalDurationMs = (task.timeLogs || []).reduce(
      (sum, log) => sum + log.duration,
      0
    );
    const totalMinutes = Math.floor(totalDurationMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-700">Time Spent:</span>
        <span className="text-gray-900 font-bold">{calculateTotalTime()}</span>
      </div>
      <div className="mt-3">
        {!isTracking ? (
          <button
            onClick={startTracking}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
          >
            Start Timer
          </button>
        ) : (
          <button
            onClick={stopTracking}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
          >
            Stop Timer
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeTracker;