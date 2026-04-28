import React from 'react';
import { Patient } from '../types';

const statusConfig = {
  active: { label: 'Active', className: 'bg-green-100 text-green-700' },
  discharged: { label: 'Discharged', className: 'bg-gray-100 text-gray-600' },
  critical: { label: 'Critical', className: 'bg-red-100 text-red-700' },
};

export function PatientGridCard({ patient }: { patient: Patient }) {
  const status = statusConfig[patient.status];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
          {patient.name[0]}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.className}`}>
          {status.label}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 text-sm">{patient.name}</h3>
      <p className="text-xs text-gray-500 mt-0.5">Age {patient.age} · {patient.bloodType}</p>
      <p className="text-xs text-gray-600 mt-2 font-medium">{patient.condition}</p>
      <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
        <p className="text-xs text-gray-400">{patient.doctor}</p>
        <p className="text-xs text-gray-400">Room {patient.room} · {patient.lastVisit}</p>
      </div>
    </div>
  );
}

export function PatientListRow({ patient }: { patient: Patient }) {
  const status = statusConfig[patient.status];
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shrink-0">
            {patient.name[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{patient.name}</p>
            <p className="text-xs text-gray-400">Age {patient.age}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{patient.condition}</td>
      <td className="px-4 py-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.className}`}>
          {status.label}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">{patient.doctor}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{patient.room}</td>
      <td className="px-4 py-3 text-xs text-gray-400">{patient.lastVisit}</td>
    </tr>
  );
}
