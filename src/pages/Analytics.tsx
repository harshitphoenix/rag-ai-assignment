import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';
import { analyticsData, conditionDistribution } from '../services/mockData';

const PIE_COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#6b7280'];

export default function Analytics() {
  const { loading } = useAuth();
  if (loading) return null;

  return (
    <Layout>
      <div className="px-6 py-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Hospital performance — last 6 months</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Admissions', value: '322', sub: 'Last 6 months' },
            { label: 'Total Discharges', value: '294', sub: 'Last 6 months' },
            { label: 'Avg Occupancy', value: '78%', sub: 'Bed utilisation' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Line chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Admissions vs Discharges</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="admissions" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} name="Admissions" />
              <Line type="monotone" dataKey="discharges" stroke="#059669" strokeWidth={2} dot={{ r: 4 }} name="Discharges" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar + Pie row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Critical Cases per Month</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="critical" fill="#ef4444" radius={[4, 4, 0, 0]} name="Critical" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Condition Distribution</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={conditionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={3}
                >
                  {conditionDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
