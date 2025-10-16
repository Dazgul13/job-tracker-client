import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { showSuccess, showError } from '../services/notificationService';

export default function AddJobForm() {

    // form states
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const addJob = async (e) => {
        e.preventDefault();

        try{
            setIsLoading(true);

            const res = await api.post("/api/jobs", {
                title: title,
                company: company,
                location: location,
                status: status,
                notes: notes
            });

            // clear the form
            setTitle("");
            setCompany("");
            setLocation("");
            setStatus("");
            setNotes("");

            showSuccess(`Job application for ${company} added successfully!`);
            navigate("/")
        }catch(error){
            console.error("Failed to add job:", error);
            showError("Failed to add job application. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(title !== "" && company !== "" && location !== "" && status !== ""){
            setIsFormValid(true);
        }else{
            setIsFormValid(false);
        }
    }, [title, company, location, status, notes])

    return (
        <form className="mb-3 d-flex flex-column gap-2" onSubmit={(e) => addJob(e)}>
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
                   <option value="selected disabled hidden">Choose status</option>
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
               ></textarea>
               </label>


               <button className="btn btn-success" disabled={!isFormValid || isLoading}>
                   {isLoading ? (
                       <>
                           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                           Saving...
                       </>
                   ) : (
                       <>
                           <i className="bi bi-plus-circle me-2"></i>
                           Save Job
                       </>
                   )}
               </button>
           </form>
           )
}