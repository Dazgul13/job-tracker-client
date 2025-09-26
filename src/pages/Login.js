import { useContext, useEffect, useState } from 'react';
import UserContext from "../context/UserContext";
import api from "../api";
import { useNavigate } from "react-router-dom";

// This is the template for React
export default function Login() {


	const navigate = useNavigate();

	const user = useContext(UserContext);

	const [isRegister, setIsRegister] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");


	//Functions
	const submit = async() => {

		setError('')

		try {
			const route = isRegister ? 'register' : 'login'

			const res = await api.post(`/api/auth/${route}`, { email, password})		

			user.setNewToken(res.data.token)

			navigate('/')

		} catch (err) {

			setError(err.reponse?.data?.error || 'Something went wrong');
			console.log(err)
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
		    <div className="card p-4" style={{width: "100%", maxWidth: "400px"}}>

		      <h4 className="mb-3 text-center">Login</h4>

		      <form onSubmit={(e) => {
		      		e.preventDefault()
		      		submit()
		      }}>

		        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />

		        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" placeholder="Password" />

		        <button className="btn btn-success w-100">Login</button>
		      </form>

		      <div className="mt-3 text-center">
		        <button className="btn btn-link text-success" onClick={() => Login}>
		          Need an account?
		        </button>
		      </div>

		      { error && <p className="text-danger text-center">{error}</p> }
		    </div>
		</div>
	)
}