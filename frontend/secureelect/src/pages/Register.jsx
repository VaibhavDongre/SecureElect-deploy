import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { useState } from "react";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await API.post("/register", {
                name: form.name,
                email: form.email,
                password: form.password
            });

            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error("Registration failed. Try again.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
            <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
                <h3 className="fw-bold text-center mb-4">Create Account</h3>

                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input 
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-lebel">Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <a href="/login" className="text-decoration-none">Login</a>
                </p>
            </form>
        </div>
    );
}
