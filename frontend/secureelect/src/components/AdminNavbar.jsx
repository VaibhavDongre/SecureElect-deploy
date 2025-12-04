import { Link,useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between align-items-center">

            <Link to="/admin/dashboard" className="navbar-brand fw-bold">
                SecureElect Admin
            </Link>

            <div className="d-flex align-items-center">

                <Link to="/admin/dashboard" className="btn btn-outline-light me-3">
                    Elections
                </Link>

                <button className="btn btn-danger" onClick={logout}>
                    Logout
                </button>

            </div>
        </nav>
    );
}
