import { create } from 'zustand';
import { Patient, ViewMode } from '../types';
import { patients as initialPatients } from '../services/mockData';

interface PatientState {
  patients: Patient[];
  view: ViewMode;
  search: string;
  setView: (view: ViewMode) => void;
  setSearch: (search: string) => void;
  filteredPatients: () => Patient[];
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: initialPatients,
  view: 'grid',
  search: '',

  setView: (view) => set({ view }),
  setSearch: (search) => set({ search }),

  filteredPatients: () => {
    const { patients, search } = get();
    if (!search.trim()) return patients;
    const q = search.toLowerCase();
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.condition.toLowerCase().includes(q) ||
        p.doctor.toLowerCase().includes(q)
    );
  },
}));
