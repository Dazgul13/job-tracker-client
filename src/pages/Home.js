import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { NavLink, useNavigate } from "react-router-dom";
import api from '../api';
import JobCard from '../components/JobCard';
import Loading from '../components/Loading';
import { showSuccess, showError } from '../services/notificationService';

export default function Home() {
  const user = useContext(UserContext);

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/api/jobs/');
      setJobs(res.data);
      if (res.data.length > 0) {
        showSuccess(`Loaded ${res.data.length} job applications`);
      }
    } catch (error) {
      showError('Failed to load job applications');
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    user.clearToken();
    navigate('/login');
  };

  useEffect(() => {
    if (!user.token) {
      navigate('/login');
    } else {
      fetchJobs();
    }
  }, []);

  // Get job statistics for dashboard
  const getJobStats = () => {
    const stats = {
      total: jobs.length,
      submitted: jobs.filter(job => job.status === 'application submitted').length,
      interview: jobs.filter(job => job.status === 'interview').length,
      accepted: jobs.filter(job => job.status === 'accepted').length,
      rejected: jobs.filter(job => job.status === 'rejected').length
    };
    return stats;
  };

  const stats = getJobStats();

  // This serves as <template> in vue
  return (
    <div id="home" className="container py-4">
      <div className="page-container fade-in">
        {/* Dashboard Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-white mb-3">
            <i className="bi bi-speedometer2 me-3"></i>
            Job Tracker Dashboard
          </h1>
          <p className="lead text-white-50">Track your job applications and stay organized</p>
        </div>

        {/* Statistics Cards */}
        {!isLoading && jobs.length > 0 && (
          <div className="row mb-5">
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card text-center slide-up" style={{animationDelay: '0.1s'}}>
                <div className="card-body">
                  <i className="bi bi-briefcase-fill fs-1 text-primary mb-2"></i>
                  <h3 className="fw-bold">{stats.total}</h3>
                  <p className="text-muted mb-0">Total Applications</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card text-center slide-up" style={{animationDelay: '0.2s'}}>
                <div className="card-body">
                  <i className="bi bi-clock-fill fs-1 text-secondary mb-2"></i>
                  <h3 className="fw-bold">{stats.submitted}</h3>
                  <p className="text-muted mb-0">Submitted</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card text-center slide-up" style={{animationDelay: '0.3s'}}>
                <div className="card-body">
                  <i className="bi bi-person-video2 fs-1 text-info mb-2"></i>
                  <h3 className="fw-bold">{stats.interview}</h3>
                  <p className="text-muted mb-0">Interviews</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card text-center slide-up" style={{animationDelay: '0.4s'}}>
                <div className="card-body">
                  <i className="bi bi-check-circle-fill fs-1 text-success mb-2"></i>
                  <h3 className="fw-bold">{stats.accepted}</h3>
                  <p className="text-muted mb-0">Accepted</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Job Button */}
        <div className="text-center mb-4">
          <NavLink to="/addJob" className="btn btn-success btn-lg px-5 py-3">
            <i className="bi bi-plus-circle-fill me-2"></i>
            Add New Job Application
          </NavLink>
        </div>

        {/* Jobs Section */}
        <div className="row">
          <div className="col-12">
            {/* Loading State */}
            {isLoading && (
              <Loading message="Loading your job applications..." size="large" />
            )}

            {/* Empty State */}
            {!isLoading && !jobs.length && (
              <div className="text-center py-5">
                <div className="card">
                  <div className="card-body py-5">
                    <i className="bi bi-inbox fs-1 text-muted mb-3"></i>
                    <h4 className="text-muted">No Job Applications Yet</h4>
                    <p className="text-muted mb-4">Start tracking your job applications by adding your first one!</p>
                    <NavLink to="/addJob" className="btn btn-success">
                      <i className="bi bi-plus-circle me-2"></i>
                      Add Your First Job
                    </NavLink>
                  </div>
                </div>
              </div>
            )}

            {/* Jobs List */}
            {!isLoading && jobs.length > 0 && (
              <div>
                <h3 className="text-white mb-4">
                  <i className="bi bi-list-ul me-2"></i>
                  Your Applications ({jobs.length})
                </h3>
                {jobs.map((job, index) => (
                  <div 
                    className="card job-card p-4 mb-3 slide-up" 
                    key={job._id}
                    style={{animationDelay: `${0.1 * (index + 1)}s`}}
                  >
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
