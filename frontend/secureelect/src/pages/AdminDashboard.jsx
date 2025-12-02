import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";
import API from "../services/api";
import CreateElectionModal from "../components/CreateElectionModal";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

    const [elections, setElections] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Fetch all elections
    const loadElections = async () => {
        try {
            const res = await API.get("/admin/elections");
            const filtered = res.data.filter(el => !el.archived); //hide
            setElections(filtered);
        } catch (err) {
            console.log(err);
            toast.error("Error loading elections");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await loadElections();
        }
        fetchData();
    }, []);

    // Start election
    const startElection = async (id) => {
        try {
            await API.put(`/admin/elections/start/${id}`);
            toast.success("Election started!");
            loadElections();
        } catch (err) {
            console.log(err);
            toast.error("Failed to start election");
        }
    };

    // End election
    const endElection = async (id) => {
        try {
            await API.put(`/admin/elections/end/${id}`);
            toast.success("Election ended!");
            loadElections();
        } catch (err) {
            console.log(err);
            toast.error("Failed to end the election");
        }
    };

    //delete
    const deleteElection = async (id) => {
        if (!window.confirm("Are you sure you want to delete this completed election?")) return;

        try {
            await API.delete(`/admin/elections/${id}`);
            toast.success("Election deleted successfully");
            loadElections();
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete election");
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="fw-bold">Elections</h2>

                    <button className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Create Election
                    </button>
                </div>

                <div className="card shadow-sm">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Start</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {elections.map((el) => (
                                <tr key={el.id}>
                                    <td>{el.title}</td>

                                    <td>
                                        {el.active ? (
                                            <span className="badge bg-success">Active</span>
                                        ) : el.completed ? (
                                            <span className="badge bg-secondary">Completed</span>
                                        ) : (
                                            <span className="badge bg-warning">Not Started</span>
                                        )}
                                    </td>

                                    <td>
                                        {el.completed ? (
                                            <span className="text-muted">Completed</span>
                                        ) : el.active ? (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => endElection(el.id)}
                                            >
                                                End
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => startElection(el.id)}
                                            >
                                                Start
                                            </button>
                                        )}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => navigate(`/admin/elections/${el.id}/candidates`)}
                                        >
                                            Candidates
                                        </button>

                                        <button
                                            className="btn btn-dark btn-sm me-2"
                                            onClick={() => navigate(`/admin/elections/${el.id}/results`)}
                                        >
                                            Results
                                        </button>

                                        {/* 🗑 Show Delete button ONLY if completed */}
                                        {el.completed && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteElection(el.id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <CreateElectionModal
                        reload={loadElections}
                        close={() => setShowModal(false)}
                    />
                )}
            </div>
        </>
    );
}
