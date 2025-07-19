'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../../styles/dashboard.css';
import '../../styles/timesheet.css';
import BonusModal from '@/components/BonusModal';

type Entry = {
  project: string;
  typeOfWork: string;
  description: string;
  hours: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);

  // Redirect if not logged in
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  // Fetch bonus entries from localStorage and API (if available)
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const localData = localStorage.getItem('entries');
        const parsedLocal = localData ? JSON.parse(localData) : [];

        const res = await fetch('/api/timesheets');
        const apiData = await res.json();

        const combined = [...parsedLocal, ...apiData];
        setEntries(combined);
      } catch (error) {
        console.error('Failed to fetch entries:', error);
        setEntries([]);
      }
    };

    fetchEntries();
  }, [showModal]);

  // Delete entry by index
  const handleDelete = (index: number) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
    localStorage.setItem('entries', JSON.stringify(updated));
  };

  const timesheets = [
    { week: 1, date: '1 – 5 January, 2024', status: 'completed' },
    { week: 2, date: '8 – 12 January, 2024', status: 'completed' },
    { week: 3, date: '15 – 19 January, 2024', status: 'incomplete' },
    { week: 4, date: '22 – 26 January, 2024', status: 'completed' },
    { week: 5, date: '28 January – 1 February, 2024', status: 'missing' },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'badge green';
      case 'incomplete': return 'badge yellow';
      case 'missing': return 'badge pink';
      default: return 'badge gray';
    }
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="brand">ticktock</h1>
        <div className="user-info">John Doe ▾</div>
      </header>

      <main className="dashboard-main">
        <h2 className="section-title">Your Timesheets</h2>

        <button onClick={() => setShowModal(true)} className="open-bonus">+ Bonus Entry</button>
        {showModal && <BonusModal onClose={() => setShowModal(false)} />}

        <table className="timesheet-table">
          <thead>
            <tr>
              <th>Week #</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map(({ week, date, status }) => (
              <tr key={week}>
                <td>{week}</td>
                <td>{date}</td>
                <td>
                  <span className={getStatusClass(status)}>
                    {status.toUpperCase()}
                  </span>
                </td>
                <td className="action">
                  <Link
                    href={`/timesheet/${week}?mode=${
                      status === 'missing'
                        ? 'create'
                        : status === 'incomplete'
                        ? 'update'
                        : 'view'
                    }`}
                  >
                    {status === 'missing'
                      ? 'Create'
                      : status === 'incomplete'
                      ? 'Update'
                      : 'View'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="section-title" style={{ marginTop: '40px' }}>New Entries</h2>

        <table className="timesheet-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Type</th>
              <th>Description</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? entries.map((entry, i) => (
              <tr key={i}>
                <td>{entry.project}</td>
                <td>{entry.typeOfWork}</td>
                <td>{entry.description}</td>
                <td>{entry.hours}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(i)}>
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>No New entries yet.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="status-info-box">
          <h3>Statuses</h3>
          <p><strong>completed</strong> = 40 hours added by the user</p>
          <p><strong>incomplete</strong> = less than 40 hours added by the user</p>
          <p><strong>missing</strong> = no hours added by the user</p>
          <p className="dev-credit">TenTwenty Developers</p>
        </div>

        <footer className="dashboard-footer">
          © 2024 tentwenty. All rights reserved.
        </footer>
      </main>
    </div>
  );
}