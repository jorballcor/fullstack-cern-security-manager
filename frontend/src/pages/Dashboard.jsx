// src/pages/Dashboard.jsx

export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Open Incidents</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">5</p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Access Logs Today</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">312</p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Active Users</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">42</p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Restricted Areas</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">7</p>
        </div>
      </div>
    </div>
  );
}
