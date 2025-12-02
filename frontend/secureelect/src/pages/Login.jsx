import React, { useState } from 'react'
import API from "../services/api.js"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);

      toast.success("Login successful!");

      //Svae JWT + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", res.data.email);

      if (res.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <div className="card p-4 shadow" style={{width: "380px"}}>
        <h3 className="text-center mb-3">SecureElect Login</h3>

        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label>Email</label>
                <input 
                    type="email"
                    name="email"
                    className='form-control'
                    placeholder='Enter your email'
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='mb-3'>
                <label>Password</label>
                <input 
                    type="password"
                    name="password"
                    className='form-control'
                    placeholder='Enter you password'
                    value={form.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button className='btn btn-primary w-100'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
