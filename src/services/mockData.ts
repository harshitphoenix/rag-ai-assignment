import { Patient, AnalyticsData } from '../types';

export const patients: Patient[] = [
  { id: 'p1', name: 'Alice Johnson', age: 45, condition: 'Hypertension', status: 'active', lastVisit: '2026-04-20', doctor: 'Dr. Smith', room: '101A', bloodType: 'A+' },
  { id: 'p2', name: 'Bob Martinez', age: 62, condition: 'Diabetes Type 2', status: 'active', lastVisit: '2026-04-18', doctor: 'Dr. Patel', room: '203B', bloodType: 'O-' },
  { id: 'p3', name: 'Carol White', age: 38, condition: 'Asthma', status: 'discharged', lastVisit: '2026-04-15', doctor: 'Dr. Lee', room: '-', bloodType: 'B+' },
  { id: 'p4', name: 'David Kim', age: 71, condition: 'Heart Failure', status: 'critical', lastVisit: '2026-04-25', doctor: 'Dr. Smith', room: 'ICU-3', bloodType: 'AB+' },
  { id: 'p5', name: 'Eva Brown', age: 29, condition: 'Appendicitis', status: 'active', lastVisit: '2026-04-24', doctor: 'Dr. Patel', room: '305A', bloodType: 'O+' },
  { id: 'p6', name: 'Frank Davis', age: 55, condition: 'COPD', status: 'active', lastVisit: '2026-04-22', doctor: 'Dr. Lee', room: '108C', bloodType: 'A-' },
  { id: 'p7', name: 'Grace Wilson', age: 48, condition: 'Pneumonia', status: 'critical', lastVisit: '2026-04-26', doctor: 'Dr. Smith', room: 'ICU-1', bloodType: 'B-' },
  { id: 'p8', name: 'Henry Taylor', age: 33, condition: 'Fractured Femur', status: 'active', lastVisit: '2026-04-23', doctor: 'Dr. Patel', room: '212A', bloodType: 'O+' },
  { id: 'p9', name: 'Iris Anderson', age: 60, condition: 'Kidney Disease', status: 'active', lastVisit: '2026-04-21', doctor: 'Dr. Lee', room: '115B', bloodType: 'AB-' },
  { id: 'p10', name: 'Jack Thomas', age: 77, condition: 'Stroke', status: 'critical', lastVisit: '2026-04-27', doctor: 'Dr. Smith', room: 'ICU-2', bloodType: 'A+' },
  { id: 'p11', name: 'Karen Jackson', age: 42, condition: 'Migraine', status: 'discharged', lastVisit: '2026-04-10', doctor: 'Dr. Patel', room: '-', bloodType: 'O-' },
  { id: 'p12', name: 'Leo Harris', age: 54, condition: 'Cholecystitis', status: 'discharged', lastVisit: '2026-04-12', doctor: 'Dr. Lee', room: '-', bloodType: 'B+' },
];

export const analyticsData: AnalyticsData[] = [
  { month: 'Nov', admissions: 42, discharges: 38, critical: 5 },
  { month: 'Dec', admissions: 55, discharges: 50, critical: 8 },
  { month: 'Jan', admissions: 48, discharges: 44, critical: 6 },
  { month: 'Feb', admissions: 60, discharges: 55, critical: 9 },
  { month: 'Mar', admissions: 52, discharges: 49, critical: 7 },
  { month: 'Apr', admissions: 65, discharges: 58, critical: 11 },
];

export const conditionDistribution = [
  { name: 'Cardiac', value: 28 },
  { name: 'Respiratory', value: 22 },
  { name: 'Diabetes', value: 18 },
  { name: 'Ortho', value: 15 },
  { name: 'Other', value: 17 },
];
