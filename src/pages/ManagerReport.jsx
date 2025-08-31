import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const ManagerReport = () => {
    const [tasks, setTasks] = useState([]);
    const [developerTimeData, setDeveloperTimeData] = useState([]);
    const [taskTrendData, setTaskTrendData] = useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
        processTimeData(storedTasks);
        processTaskTrend(storedTasks);
    }, []);

    const processTimeData = (tasks) => {
        const devTime = {};
        tasks.forEach(task => {
            if (task.timeLogs && task.timeLogs.length > 0) {
                const totalDurationMs = task.timeLogs.reduce((sum, log) => sum + log.duration, 0);
                const totalHours = totalDurationMs / (1000 * 60 * 60);

                if (devTime[task.assignee]) {
                    devTime[task.assignee] += totalHours;
                } else {
                    devTime[task.assignee] = totalHours;
                }
            }
        });

        const data = Object.keys(devTime).map(dev => ({
            name: dev,
            'Total Hours': parseFloat(devTime[dev].toFixed(2))
        }));
        setDeveloperTimeData(data);
    };

    const processTaskTrend = (tasks) => {
        const dailyCounts = {};
        tasks.forEach(task => {
            const createDate = new Date(task.createdDate || Date.now()).toISOString().split('T')[0];
            const closeDate = task.status === 'Closed' ? new Date().toISOString().split('T')[0] : null;

            if (!dailyCounts[createDate]) dailyCounts[createDate] = { open: 0, closed: 0 };
            dailyCounts[createDate].open++;

            if (closeDate && closeDate !== createDate) {
                if (!dailyCounts[closeDate]) dailyCounts[closeDate] = { open: 0, closed: 0 };
                dailyCounts[closeDate].closed++;
            }
        });

        const dates = Object.keys(dailyCounts).sort();
        const data = dates.map(date => ({
            date: date,
            'Open Tasks': dailyCounts[date].open,
            'Closed Tasks': dailyCounts[date].closed
        }));

        setTaskTrendData(data);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                    Manager Reports 📈
                </h1>

                {/* Developer Time Report as a simple table */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Time Spent by Developer</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Developer
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Hours
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {developerTimeData.map((dev) => (
                                <tr key={dev.name}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {dev.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {dev['Total Hours']}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Developer Time Report as a Bar Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Time Spent by Developer (