import { Link,useNavigate } from "react-router-dom";

export default function UserNavbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return(
        <nav className="navbar navbar-dark bg-dark px-4">
            <Link to="/admin/dashboard" className="navbar-brand">
                SecureElect Admin
            </Link>
    
            <div>
                <Link to="/admin/dashboard" className="btn btn-outline-light me-2">
                    Elections
                </Link>
            </div>

            <button className="btn btn-danger" onClick={logout}>
                Logout
            </button>
        </nav>
    )
}