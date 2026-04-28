import React from 'react';
import { usePatientStore } from '../store/patientStore';
import Layout from '../components/Layout';
import ViewToggle from '../components/ViewToggle';
import { PatientGridCard, PatientListRow } from '../components/PatientCard';

export default function PatientDetails() {
  const { view, search, setView, setSearch, filteredPatients } = usePatientStore();

  const patients = filteredPatients();

  return (
    <Layout>
      <div className="px-6 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
            <p className="text-sm text-gray-500 mt-0.5">{patients.length} records found</p>
          </div>
          <ViewToggle view={view} onChange={setView} />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, condition, or doctor…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-[var(--radius-ui)] border border-gray-300 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>

        {/* Status filter chips */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'active', 'critical', 'discharged'].map((s) => (
            <button
              key={s}
              onClick={() => setSearch(s === 'all' ? '' : s)}
              className={`px-5 py-2 rounded-[var(--radius-ui)] text-sm font-medium capitalize transition ${
                (s === 'all' && !search) || search === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {patients.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm">No patients found</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {patients.map((p) => <PatientGridCard key={p.id} patient={p} />)}
          </div>
        ) : (
          <div className="bg-white rounded-[var(--radius-ui)] border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {['Patient', 'Condition', 'Status', 'Doctor', 'Room', 'Last Visit'].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {patients.map((p) => <PatientListRow key={p.id} patient={p} />)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
