// lib/mockData.ts
// lib/mockData.ts

// Define a proper type
export type TimesheetEntry = {
  id: number;
  project: string;
  typeOfWork: string;
  description: string;
  hours: number;
};

// Store entries with correct type
let timesheetEntries: TimesheetEntry[] = [
  {
    id: 1,
    project: 'Ticktock Redesign',
    typeOfWork: 'Design',
    description: 'Initial wireframes',
    hours: 6,
  },
  {
    id: 2,
    project: 'Client Portal',
    typeOfWork: 'Development',
    description: 'Login API integration',
    hours: 8,
  },
];

// Return all entries
export function getEntries(): TimesheetEntry[] {
  return timesheetEntries;
}

// Add a new entry
export function addEntry(entry: Omit<TimesheetEntry, 'id'>): void {
  timesheetEntries.push({
    id: timesheetEntries.length + 1,
    ...entry,
  });
}
