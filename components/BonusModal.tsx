'use client';

import React, { useState } from 'react';
import './BonusModal.css';

export default function BonusModal({ onClose }: { onClose: () => void }) {
  const [project, setProject] = useState('');
  const [typeOfWork, setTypeOfWork] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (msg: string, success = true) => {
    const toast = document.createElement('div');
    toast.className = `toast ${success ? 'success' : 'error'}`;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleSubmit = async () => {
    if (!project || !typeOfWork || !description.trim()) {
      showToast('Please fill in all required fields.', false);
      return;
    }

    const entry = { project, typeOfWork, description, hours };
    setIsLoading(true);

    try {
      // 1. Save to localStorage
      const existing = JSON.parse(localStorage.getItem('entries') || '[]');
      const updated = [...existing, entry];
      localStorage.setItem('entries', JSON.stringify(updated));

      // 2. Optionally sync to backend API
      const res = await fetch('/api/timesheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
        showToast('✅ Entry added successfully!', true);
      } else {
        showToast('Saved locally. Failed to sync with server.', false);
      }

      onClose();
    } catch (err) {
      console.error('Error adding entry:', err);
      showToast('❌ Something went wrong!', false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add New Entry</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <label>
            Select Project <span className="required">*</span>
            <select value={project} onChange={(e) => setProject(e.target.value)}>
              <option disabled value="">Select a project</option>
              <option>Ticktock Redesign</option>
              <option>Client Portal</option>
              <option>AI Assistant</option>
              <option>Landing Page Optimization</option>
            </select>
          </label>

          <label>
            Type of Work <span className="required">*</span>
            <select value={typeOfWork} onChange={(e) => setTypeOfWork(e.target.value)}>
              <option disabled value="">Select work type</option>
              <option>Bug Fixes</option>
              <option>Development</option>
              <option>Design</option>
              <option>Testing</option>
              <option>Documentation</option>
            </select>
          </label>

          <label>
            Task Description <span className="required">*</span>
            <textarea
              placeholder="Write task details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <p className="note">Note: This is an optional bonus entry log</p>

          <label className="hour-selector">
            Hours
            <div className="hours">
              <button onClick={() => setHours((h) => Math.max(0, h - 1))}>−</button>
              <span>{hours}</span>
              <button onClick={() => setHours((h) => h + 1)}>+</button>
            </div>
          </label>
        </div>

        <div className="modal-footer">
          <button className="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Add entry'}
          </button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
