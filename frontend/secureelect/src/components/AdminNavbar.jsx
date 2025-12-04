import { Link,useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand fw-bold" to="/admin/dashboard">
                SecureElect Admin
            </Link>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to="/admin/dashboard" className="nav-link">
                            Elections
                        </Link>
                    </li>

                    <li className="nav-item">
                        <button
                            className="btn btn-danger ms-3"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
