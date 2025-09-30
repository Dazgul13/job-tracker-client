import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function EditJobForm({ jobId }) {
  // form states
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // fetch job data to pre-fill form
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/api/jobs/${jobId}`);
        const job = res.data;

        setTitle(job.title);
        setCompany(job.company);
        setLocation(job.location);
        setStatus(job.status);
        setNotes(job.notes);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };

    fetchJob();
  }, [jobId]);

  // handle update
  const updateJob = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await api.put(`/api/jobs/${jobId}`, {
        title,
        company,
        location,
        status,
        notes,
      });

      setIsLoading(false);

      navigate("/");
    } catch (error) {
      console.error("Failed to update job:", error);
      setIsLoading(false);
    }
  };

  // handle delete
  const deleteJob = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      setIsLoading(true);

      await api.delete(`/api/jobs/${jobId}`);

      setIsLoading(false);

      navigate("/");
    } catch (error) {
      console.error("Failed to delete job:", error);
      setIsLoading(false);
    }
  };

  // form validation
  useEffect(() => {
    if (title && company && location && status) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, company, location, status, notes]);

  return (
    <form
      className="mb-3 d-flex flex-column gap-2"
      onSubmit={(e) => updateJob(e)}
    >
      <label>
        <span>Job Title:</span>
        <input
          className="form-control"
          placeholder="Enter job title..."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Company Name:</span>
        <input
          className="form-control"
          placeholder="Enter company..."
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>
      <label>
        <span>Location:</span>
        <input
          className="form-control"
          placeholder="Enter location..."
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label>
        <span>Status:</span>
        <select
          className="form-select"
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value= "" disabled hidden>
            Choose status
          </option>
          <option value="application submitted">Application Submitted</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
        </select>
      </label>
      <label>
        <span>Notes:</span>
        <textarea
          className="form-control"
          placeholder="Enter notes..."
          required
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>

      <button
        className="btn btn-success"
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "Saving..." : "Update"}
      </button>

      <button
        type="button"
        className="btn btn-danger mt-2"
        onClick={deleteJob}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Delete Job"}
      </button>
    </form>
  );
}
