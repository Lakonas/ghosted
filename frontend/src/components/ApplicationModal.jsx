import { useState } from 'react';
import api from '../api/axios';
import './ApplicationModal.css';

const ApplicationModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    company: '',
    role: '',
    job_url: '',
    location: '',
    salary_min: '',
    salary_max: '',
    notes: '',
    applied_at: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/applications', form);
      onAdd(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Application</h2>
        <form onSubmit={handleSubmit}>
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
          <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
          <input name="job_url" placeholder="Job URL" value={form.job_url} onChange={handleChange} />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <input name="salary_min" type="number" placeholder="Salary min" value={form.salary_min} onChange={handleChange} />
          <input name="salary_max" type="number" placeholder="Salary max" value={form.salary_max} onChange={handleChange} />
          <input name="applied_at" type="date" value={form.applied_at} onChange={handleChange} />
          <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
          <div className="modal-actions"> {/* NEW */}
            <button className="btn-ghost" type="button" onClick={onClose}>Cancel</button> {/* NEW */}
            <button className="btn-primary" type="submit">Add</button> {/* NEW */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;