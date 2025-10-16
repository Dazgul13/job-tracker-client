import { useContext, useEffect, useState } from 'react';
import UserContext from "../context/UserContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from '../services/notificationService';

// This is the template for React
export default function Login() {


	const navigate = useNavigate();

	const user = useContext(UserContext);

	const [isRegister, setIsRegister] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);


	//Functions
	const submit = async() => {
		setError('');
		setIsLoading(true);

		try {
			const route = isRegister ? 'register' : 'login'

			const res = await api.post(`/api/auth/${route}`, { email, password})		

			user.setNewToken(res.data.token)
			showSuccess(`Welcome back! Successfully logged in.`);
			navigate('/')

		} catch (err) {
			const errorMessage = err.response?.data?.error || 'Something went wrong';
			setError(errorMessage);
			showError(errorMessage);
			console.log(err)
		} finally {
			setIsLoading(false);
		}
	}


	useEffect(() => {

		if(user.token) {
			navigate('/')
		}
	}, [])


	// This serves as <template> in vue
	return (
		<div className="container d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
		    <div className="card p-5 fade-in" style={{width: "100%", maxWidth: "450px"}}>

		      <div className="text-center mb-4">
		        <i className="bi bi-person-circle fs-1 text-success mb-3"></i>
		        <h3 className="fw-bold text-themed">Welcome Back</h3>
		        <p className="text-themed-muted">Sign in to your account</p>
		      </div>

		      <form onSubmit={(e) => {
		      		e.preventDefault()
		      		submit()
		      }}>

		        <div className="mb-3">
		          <label className="form-label text-themed-secondary">Email Address</label>
		          <input 
		            type="email" 
		            value={email} 
		            onChange={(e) => setEmail(e.target.value)} 
		            className="form-control" 
		            placeholder="Enter your email"
		            required
		          />
		        </div>

		        <div className="mb-4">
		          <label className="form-label text-themed-secondary">Password</label>
		          <input 
		            type="password" 
		            value={password} 
		            onChange={(e) => setPassword(e.target.value)} 
		            className="form-control" 
		            placeholder="Enter your password"
		            required
		          />
		        </div>

		        <button className="btn btn-success w-100 py-2" disabled={isLoading}>
		          {isLoading ? (
		            <>
		              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
		              Signing In...
		            </>
		          ) : (
		            <>
		              <i className="bi bi-box-arrow-in-right me-2"></i>
		              Sign In
		            </>
		          )}
		        </button>
		      </form>

		      <div className="mt-4 text-center">
		        <button className="btn btn-link text-success" onClick={() => navigate("/register")}>
		          <i className="bi bi-person-plus me-1"></i>
		          Need an account? Sign up
		        </button>
		      </div>

		      { error && (
		        <div className="alert alert-danger mt-3" role="alert">
		          <i className="bi bi-exclamation-triangle me-2"></i>
		          {error}
		        </div>
		      )}
		    </div>
		</div>
	)
}