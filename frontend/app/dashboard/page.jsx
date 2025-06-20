"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiAlertTriangle, FiTrendingUp, FiActivity, FiDatabase, FiSettings, FiUser, FiLogOut, FiBell } from 'react-icons/fi';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const router = useRouter();

  // Mock data - replace with real API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAlerts([
        { id: 1, type: 'warning', message: 'Oxygen supply at 25% capacity', time: '10 mins ago' },
        { id: 2, type: 'critical', message: 'ICU beds at 95% occupancy', time: '25 mins ago' },
        { id: 3, type: 'info', message: 'Antibiotic stock replenished', time: '2 hours ago' }
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const metrics = {
    beds: {
      total: 150,
      occupied: 112,
      available: 38,
      icu: { total: 20, occupied: 19 },
      isolation: { total: 15, occupied: 8 }
    },
    oxygen: {
      capacity: 5000, // liters
      remaining: 1250,
      usageRate: '250L/hr'
    },
    medicines: {
      antibiotics: { stock: 150, threshold: 50 },
      antivirals: { stock: 85, threshold: 30 },
      analgesics: { stock: 320, threshold: 100 }
    },
    patients: {
      total: 112,
      admissions: 8,
      discharges: 5,
      waiting: 14
    }
  };

  const predictions = {
    beds: [
      { day: 'Today', required: 22 },
      { day: 'Tomorrow', required: 28 },
      { day: 'Day 3', required: 31 },
      { day: 'Day 4', required: 29 },
      { day: 'Day 5', required: 26 }
    ],
    oxygen: [
      { hour: '6AM', usage: 200 },
      { hour: '9AM', usage: 280 },
      { hour: '12PM', usage: 320 },
      { hour: '3PM', usage: 290 },
      { hour: '6PM', usage: 250 },
      { hour: '9PM', usage: 180 }
    ]
  };

  const aiSummary = [
    "ICU bed capacity will likely be exceeded within 24 hours",
    "Oxygen supply at current usage will last approximately 5 hours",
    "Antibiotic stock needs replenishment within 2 days",
    "Isolation ward capacity is adequate for predicted admissions"
  ];

  const handleLogout = () => {
    // Add logout logic here
    router.push('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigateTo = (path) => {
    setActiveTab(path);
    setSidebarOpen(false);
    // In a real app, you would use router.push(path)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard | Hospital Resource Optimizer</title>
      </Head>

      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-800">Hospital Resource</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-1 rounded-md text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6">
          <div>
            <button
              onClick={() => navigateTo('dashboard')}
              className={`flex items-center w-full px-4 py-3 text-left ${activeTab === 'dashboard' ? 'bg-cyan-50 text-cyan-600 border-r-4 border-cyan-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiActivity className="h-5 w-5" />
              <span className="ml-3">Dashboard</span>
            </button>
            <button
              onClick={() => navigateTo('resources')}
              className={`flex items-center w-full px-4 py-3 text-left ${activeTab === 'resources' ? 'bg-cyan-50 text-cyan-600 border-r-4 border-cyan-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiDatabase className="h-5 w-5" />
              <span className="ml-3">Resource Management</span>
            </button>
            <button
              onClick={() => navigateTo('prediction')}
              className={`flex items-center w-full px-4 py-3 text-left ${activeTab === 'prediction' ? 'bg-cyan-50 text-cyan-600 border-r-4 border-cyan-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiTrendingUp className="h-5 w-5" />
              <span className="ml-3">Predictions & AI</span>
            </button>
            <button
              onClick={() => navigateTo('alerts')}
              className={`flex items-center w-full px-4 py-3 text-left ${activeTab === 'alerts' ? 'bg-cyan-50 text-cyan-600 border-r-4 border-cyan-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiAlertTriangle className="h-5 w-5" />
              <span className="ml-3">Alerts</span>
              {alerts.filter(a => a.type === 'critical').length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {alerts.filter(a => a.type === 'critical').length}
                </span>
              )}
            </button>
            <button
              onClick={() => navigateTo('export')}
              className={`flex items-center w-full px-4 py-3 text-left ${activeTab === 'export' ? 'bg-cyan-50 text-cyan-600 border-r-4 border-cyan-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiDatabase className="h-5 w-5" />
              <span className="ml-3">Export Center</span>
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className={`flex items-center w-full px-4 py-3 text-left ${activeTab === 'admin' ? 'bg-cyan-50 text-cyan-600 border-r-4 border-cyan-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiSettings className="h-5 w-5" />
              <span className="ml-3">Admin Panel</span>
            </button>
          </div>
          <div className="absolute bottom-0 w-full border-t border-gray-200">
            <button
              onClick={() => navigateTo('profile')}
              className={`flex items-center w-full px-4 py-3 text-left ${activeTab === 'profile' ? 'bg-cyan-50 text-cyan-600 border-r-4 border-cyan-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiUser className="h-5 w-5" />
              <span className="ml-3">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100"
            >
              <FiLogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 lg:hidden"
              >
                <FiMenu className="h-6 w-6" />
              </button>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 relative">
                <FiBell className="h-6 w-6" />
                {alerts.filter(a => a.type === 'critical').length > 0 && (
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              <div className="ml-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-semibold">
                  U
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </div>

        <main className="py-6 px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <>
              {/* Critical Alerts */}
              {alerts.filter(a => a.type === 'critical').length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-50 border-l-4 border-red-500 p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiAlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Critical Alerts</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc pl-5 space-y-1">
                          {alerts.filter(a => a.type === 'critical').map(alert => (
                            <li key={alert.id}>{alert.message} <span className="text-xs text-red-600">({alert.time})</span></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Resource Summary Cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-cyan-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Available Beds</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {metrics.beds.available} / {metrics.beds.total}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-cyan-500 rounded-full h-2"
                          style={{ width: `${(metrics.beds.available / metrics.beds.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>ICU: {metrics.beds.icu.occupied}/{metrics.beds.icu.total}</span>
                        <span>Isolation: {metrics.beds.isolation.occupied}/{metrics.beds.isolation.total}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-amber-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Oxygen Supply</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {(metrics.oxygen.remaining / 1000).toFixed(1)}k / {(metrics.oxygen.capacity / 1000).toFixed(1)}k L
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 rounded-full h-2"
                          style={{ width: `${(metrics.oxygen.remaining / metrics.oxygen.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Current usage: {metrics.oxygen.usageRate}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-emerald-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Medicine Stock</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              Critical Items
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Antibiotics</span>
                          <span>{metrics.medicines.antibiotics.stock}/{metrics.medicines.antibiotics.threshold}</span>
                        </div>
                        <div className="mt-1 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${metrics.medicines.antibiotics.stock < metrics.medicines.antibiotics.threshold ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ width: `${(metrics.medicines.antibiotics.stock / (metrics.medicines.antibiotics.threshold * 2)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Antivirals</span>
                          <span>{metrics.medicines.antivirals.stock}/{metrics.medicines.antivirals.threshold}</span>
                        </div>
                        <div className="mt-1 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${metrics.medicines.antivirals.stock < metrics.medicines.antivirals.threshold ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ width: `${(metrics.medicines.antivirals.stock / (metrics.medicines.antivirals.threshold * 2)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Patients</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {metrics.patients.total} (Adm: {metrics.patients.admissions}, Dis: {metrics.patients.discharges})
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Waiting</span>
                        <span>{metrics.patients.waiting}</span>
                      </div>
                      <div className="mt-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-purple-500 rounded-full h-1.5"
                          style={{ width: `${(metrics.patients.waiting / 20) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Charts and Predictions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white p-6 rounded-lg shadow lg:col-span-2"
                >
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Bed Requirement Forecast (Next 5 Days)</h2>
                  <div className="h-64">
                    <div className="flex h-full">
                      {predictions.beds.map((day, index) => (
                        <div key={day.day} className="flex-1 flex flex-col justify-end px-2">
                          <div className="flex justify-center">
                            <div
                              className="w-8 bg-cyan-500 rounded-t hover:bg-cyan-600 transition-colors duration-200"
                              style={{ height: `${(day.required / 40) * 100}%` }}
                              title={`${day.required} beds`}
                            ></div>
                          </div>
                          <div className="text-center text-xs text-gray-500 mt-2">{day.day}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
                      <span>0</span>
                      <span>20</span>
                      <span>40</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Oxygen Usage Pattern</h2>
                  <div className="h-64">
                    <div className="flex h-full items-end">
                      {predictions.oxygen.map((hour, index) => (
                        <div key={hour.hour} className="flex-1 flex flex-col justify-end px-1">
                          <div
                            className="w-full bg-amber-500 rounded-t hover:bg-amber-600 transition-colors duration-200"
                            style={{ height: `${(hour.usage / 400) * 100}%` }}
                            title={`${hour.usage}L at ${hour.hour}`}
                          ></div>
                          <div className="text-center text-xs text-gray-500 mt-1">{hour.hour}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                      <span>0</span>
                      <span>200</span>
                      <span>400L</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* AI Summary and Recent Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white p-6 rounded-lg shadow lg:col-span-2"
                >
                  <h2 className="text-lg font-medium text-gray-900 mb-4">AI Resource Summary</h2>
                  <div className="space-y-4">
                    {aiSummary.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-700">{item}</p>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="text-sm font-medium text-cyan-600 hover:text-cyan-500">
                        View detailed recommendations →
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Recent Alerts</h2>
                    <button className="text-sm font-medium text-cyan-600 hover:text-cyan-500">
                      View all
                    </button>
                  </div>
                  <div className="space-y-4">
                    {alerts.map(alert => (
                      <div key={alert.id} className="flex">
                        <div className="flex-shrink-0">
                          {alert.type === 'critical' && <FiAlertTriangle className="h-5 w-5 text-red-500" />}
                          {alert.type === 'warning' && <FiAlertTriangle className="h-5 w-5 text-amber-500" />}
                          {alert.type === 'info' && <FiAlertTriangle className="h-5 w-5 text-blue-500" />}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}