import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import EditJobForm from "../components/EditJobForm";

export default function EditJob() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams(); // job id from URL

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  }, []);

  return (
    <div id="edit-job" className="mx-auto my-5 px-2">
      <div className="d-flex justify-content-end">
        <NavLink to="/" className="btn btn-sm btn-dark mb-3">
          Go Back
        </NavLink>
      </div>
      <h1 className="text-center">Edit Job</h1>
      <EditJobForm jobId={id} />

    </div>
  );
}
