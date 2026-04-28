export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'active' | 'discharged' | 'critical';
  lastVisit: string;
  doctor: string;
  room: string;
  bloodType: string;
}

export interface AnalyticsData {
  month: string;
  admissions: number;
  discharges: number;
  critical: number;
}

export type ViewMode = 'grid' | 'list';
