import React from 'react';
import Navbar from '../components/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const timeData = [
    { name: 'Developer 1', 'Total Hours': 25.4 },
    { name: 'Developer 2', 'Total Hours': 18.2 },
    { name: 'Developer 3', 'Total Hours': 31.0 }
];

const trendData = [
    { date: 'Aug 28', 'Open Tasks': 5, 'Closed Tasks': 2 },
    { date: 'Aug 29', 'Open Tasks': 7, 'Closed Tasks': 3 },
    { date: 'Aug 30', 'Open Tasks': 6, 'Closed Tasks': 5 },
    { date: 'Aug 31', 'Open Tasks': 8, 'Closed Tasks': 4 }
];

const ManagerReport = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                    Manager Reports 
                </h1>

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
                            {timeData.map((dev) => (
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

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Time Spent by Developer (Chart)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={timeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Total Hours" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                
            </div>
        </>
    );
};

export default ManagerReport;