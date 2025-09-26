import { useState } from "react";
import api from "../api"; 
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle registration
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {


      const res = await api.post(`/api/auth/register`, {
        email,
        password,
      });

      // If successful, redirect to login (or auto-login if token is returned)
      console.log("Registration successful:", res.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.error;
      setError(typeof message === "string" ? message : "Something went wrong");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h4 className="mb-3 text-center">Register</h4>

        <form onSubmit={submit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
            placeholder="Password"
          />

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        <div className="mt-3 text-center">
          <button
            type="button"
            className="btn btn-link text-success"
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </button>
        </div>

        {error && <p className="text-danger text-center">{error}</p>}
      </div>
    </div>
  );
}
