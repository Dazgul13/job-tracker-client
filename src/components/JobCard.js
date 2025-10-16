import React from 'react';
import { NavLink } from 'react-router-dom';

export default function JobCard({ job }) {
  // Function to return badge class based on job status
  const badgeColor = (status) => {
    switch (status) {
      case 'application submitted':
        return 'badge bg-secondary';
      case 'interview':
        return 'badge bg-primary';
      case 'rejected':
        return 'badge bg-danger';
      case 'accepted':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h4 className="fw-bolder job-title">{job.title}</h4>
        <h5 className="job-company">{job.company}</h5>
        <h6 className="job-location">{job.location}</h6>
        <span className={badgeColor(job.status)}>{job.status}</span>
        <span className="d-block mt-3 text-themed-secondary">Notes: {job.notes}</span>
      </div>

      <NavLink to={`/editJob/${job._id}`} className="btn btn-sm btn-success">
        <i className="bi bi-pencil-fill me-1"></i>
        Edit
      </NavLink>
    </div>
  );
}
