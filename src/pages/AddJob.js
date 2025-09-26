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
    <div id="add-job" className="mx-auto my-5 px-2">
      <h1 className="text-center">Add Job</h1>
      <AddJobForm />
      <div className="d-flex justify-content-end">
        <NavLink to="/" className="btn btn-sm btn-dark mb-3">Go Back</NavLink>
      </div>
    </div>
  )
}