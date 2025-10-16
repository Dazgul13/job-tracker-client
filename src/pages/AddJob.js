import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from "../context/UserContext";
import AddJobForm from "../components/AddJobForm";

export default function AddJob(){

  const user = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if(!user.token){
      navigate('/login')
    }
  }, [])

  return(
    <div id="add-job" className="container py-4">
      <div className="page-container fade-in">
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold text-white mb-3">
            <i className="bi bi-plus-circle-fill me-3"></i>
            Add New Job Application
          </h1>
          <p className="lead text-white-50">Track your next career opportunity</p>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body p-4">
                <AddJobForm />
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <NavLink to="/" className="btn btn-outline-light">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Dashboard
          </NavLink>
        </div>
      </div>
    </div>
  )
}