import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';
import { patients } from '../services/mockData';

const stats = [
  { label: 'Total Patients', value: '12', delta: '+2 this week', color: 'blue' },
  { label: 'Active Cases', value: '7', delta: 'Currently admitted', color: 'green' },
  { label: 'Critical', value: '3', delta: 'Requires attention', color: 'red' },
  { label: 'Discharged', value: '3', delta: 'This month', color: 'gray' },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  green: 'bg-green-50 text-green-700 border-green-100',
  red: 'bg-red-50 text-red-700 border-red-100',
  gray: 'bg-gray-50 text-gray-600 border-gray-200',
};


export default function Dashboard() {
  const { loading } = useAuth();
  const { user } = useAuthStore();

  if (loading) return null;

  const criticalPatients = patients.filter((p) => p.status === 'critical');

  return (
    <Layout>
      <div className="px-6 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back, {user?.email?.split('@')[0]}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`rounded-xl border p-5 ${colorMap[s.color]}`}
            >
              <p className="text-xs font-medium uppercase tracking-wide opacity-70">{s.label}</p>
              <p className="text-3xl font-bold mt-1">{s.value}</p>
              <p className="text-xs mt-1 opacity-70">{s.delta}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
          <Link
            to="/analytics"
            className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Analytics</p>
              <p className="text-sm text-gray-500">View admission trends & stats</p>
            </div>
          </Link>

          <Link
            to="/patients"
            className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Patients</p>
              <p className="text-sm text-gray-500">Browse all patient records</p>
            </div>
          </Link>
        </div>

        {/* Critical alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Critical Patients
          </h2>
          <div className="space-y-3">
            {criticalPatients.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-semibold text-sm">
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.condition} · {p.doctor}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  {p.room}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
