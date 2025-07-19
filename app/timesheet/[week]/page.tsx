'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { timesheetData } from '@/utils/mockTimesheetData';
import '../../../styles/timesheet.css';

export default function TimesheetPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode'); // 'view', 'update', or 'create'
  const maxHours = 40;

  const emptyEntries = {
    'Jan 21': [],
    'Jan 22': [],
    'Jan 23': [],
    'Jan 24': [],
    'Jan 25': [],
  };

  const { weekRange, totalHours, entries } =
    mode === 'create'
      ? { weekRange: '21 – 26 January, 2024', totalHours: 0, entries: emptyEntries }
      : timesheetData;

  return (
    <div className="timesheet-container">
      <header className="timesheet-header">
        <h1>ticktock</h1>
        <div className="user">John Doe ▾</div>
      </header>

      <main>
        <h2>This week’s timesheet</h2>
        <p className="week-range">{weekRange}</p>

        <div className="progress">
          <span>{totalHours}/{maxHours} hrs</span>
          <div className="progress-bar">
            <div
              className="fill"
              style={{ width: `${(totalHours / maxHours) * 100}%` }}
            ></div>
          </div>
        </div>

        {Object.entries(entries).map(([day, tasks]) => (
          <div key={day} className="day-section">
            <div className="day-label">{day}</div>

            {tasks.length === 0 && mode === 'create' && (
              <div className="task-row">
                <input type="text" placeholder="Task" />
                <input type="number" placeholder="Hours" />
                <input type="text" placeholder="Project" />
                <button className="menu-btn">⋮</button>
              </div>
            )}

            {tasks.map((task, index) => (
              <div className="task-row" key={index}>
                {mode === 'view' ? (
                  <>
                    <span>{task.task}</span>
                    <span>{task.hours} hrs</span>
                    <span>{task.project}</span>
                  </>
                ) : (
                  <>
                    <input type="text" defaultValue={task.task} />
                    <input type="number" defaultValue={task.hours} />
                    <select className="project-dropdown" defaultValue={task.project}>
                      <option>Project A</option>
                      <option>Project B</option>
                    </select>

                    <div className="dropdown-menu">
                      <button>⋯</button>
                      <div className="dropdown-content">
                        <button>Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}

            {mode !== 'view' && (
              <div className="add-task-row">
                <button className="add-task-btn">+ Add new task</button>
              </div>
            )}
          </div>
        ))}
      </main>

      <footer>© 2024 tentwenty. All rights reserved.</footer>
    </div>
  );
}
