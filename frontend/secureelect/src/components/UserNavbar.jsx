import { Link, useNavigate } from "react-router-dom";

export default function UserNavbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-primary px-4 d-flex justify-content-between align-items-center">

            {/* LEFT SIDE */}
            <Link to="/user/home" className="navbar-brand fw-bold">
                SecureElect User
            </Link>

            {/* RIGHT SIDE BUTTONS */}
            <div className="d-flex align-items-center">

                <Link to="/user/home" className="btn btn-outline-light me-3">
                    Home
                </Link>

                <Link to="/user/vote" className="btn btn-outline-light me-3">
                    Vote
                </Link>

                <button className="btn btn-light" onClick={logout}>
                    Logout
                </button>

            </div>
        </nav>
    );
}
