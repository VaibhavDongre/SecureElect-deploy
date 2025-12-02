import { useLocation ,useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

export default function VoteConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();

    //Data passed from VotePage
    const {electionTitle, candidateName} = location.state || {};

    return (
        <>
            <UserNavbar/>

            <div className="container mt-5" style={{ maxWidth: "600px"}}>
                <div className="card shadow p-4 text-center">

                    <div className="display-1 text-success">
                        ✓
                    </div>

                    <h2 className="fw-bold mt-3">Vote Cast Successfully!</h2>

                    <p className="mt-3 fs-5">
                        You voted for <strong>{candidateName}</strong> in 
                        <br />
                        <strong>{electionTitle}</strong>
                    </p>

                    <button 
                        className="btn btn-primary mt-4 w-100"
                        onClick={()=> navigate("/user/dashboard")}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </>
    )
}