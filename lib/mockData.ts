// lib/mockData.ts

let timesheetEntries: any[] = [
  {
    id: 1,
    project: 'Ticktock Redesign',
    typeOfWork: 'Design',
    description: 'Initial wireframes',
    hours: 6
  },
  {
    id: 2,
    project: 'Client Portal',
    typeOfWork: 'Development',
    description: 'Login API integration',
    hours: 8
  }
];

export function getEntries() {
  return timesheetEntries;
}

export function addEntry(entry: any) {
  timesheetEntries.push({
    id: timesheetEntries.length + 1,
    ...entry
  });
}
