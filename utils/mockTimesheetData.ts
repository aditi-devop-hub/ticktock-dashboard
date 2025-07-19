// utils/mockTimesheetData.ts
type TimesheetTask = {
  task: string;
  hours: number;
  project: string;
};

type TimesheetData = {
  weekRange: string;
  totalHours: number;
  entries: {
    [date: string]: TimesheetTask[];
  };
};

export const timesheetData: TimesheetData = {
  weekRange: '21 – 26 January, 2024',
  totalHours: 20,
  entries: {
    'Jan 21': [
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
    ],
    'Jan 22': [
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
    ],
    'Jan 23': [
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
    ],
    'Jan 24': [
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
      { task: 'Homepage Development', hours: 4, project: 'Project Name' },
    ],
    'Jan 25': [],
  }
};
