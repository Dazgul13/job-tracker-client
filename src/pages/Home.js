import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { NavLink, useNavigate } from "react-router-dom";
import api from '../api';
import JobCard from '../components/JobCard';  // Import JobCard component

export default function Home() {
  const user = useContext(UserContext);

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    const res = await api.get('/api/jobs/');
    setJobs(res.data);
    setIsLoading(false);
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

  // This serves as <template> in vue
  return (
    <div id="home" className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Change the App title to "My Job Tracker - React */}
        <h2 className="text-success fw-bold">My Job Tracker - React</h2>
        <button className="btn btn-outline-danger btn-sm rounded-pill px-3 " onClick={logout}>Logout</button>
      </div>

      {/* react-router-dom uses NavLink instead of RouterLink in vue-router */}
      <NavLink to="/addJob" className="btn btn-success d-block py-2 fs-4">Add New Job</NavLink>

      <hr />

      {/* React uses JS expression to conditionally render elements */}
      {/* Anything inside a {} is a JS expression. You can add any js code as long as it evaluates to a certain value or JSX element */}
      {/* That includes ternary operators and the logical operator &&which we will use to conditionally render elements such as loading state similar to a v-if directive in Vue*/}
      {/* We can also use the map method to loop over arrays to render multiple elements in a loop similar to a v-for directive in Vue*/}

      {/* <!-- Loading State --> */}
      {/* v-if equivalent. Uses logical operator &&. This means the element will only render if isLoading is true */}
      {
        isLoading && (
          <div className="text-center my-5 py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )
      }

      {/* <!-- Empty States --> */}
      {/* v-if equivalent. Using ternary operator to conditionally render elements */}
      {
        !isLoading && !jobs.length
          // under ? is the element to render if the condition is true
          ? (
            <div>
              <h5 className="text-center">No Jobs.</h5>
            </div>
          )
          // under : is the element to render if the condition is false
          // To render elements from a loop, we use the map method of the array we want to loop over.
          // in this example, we are mapping over the jobs array.
          // The map method should return a JSX element.
          : jobs.map(job => {
            return (
              <div className="card p-4 mb-2" key={job._id}>
                <JobCard job={job} />
              </div>
            )
          })
      }
    </div>
  )
}
