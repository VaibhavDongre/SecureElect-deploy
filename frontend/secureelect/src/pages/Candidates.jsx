import { useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import API from "../services/api";
import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import AddCandidateModal from "../components/AddCandidateModal";

export default function Candidates() {

    const { id } = useParams(); //electionId from URL

    const [candidates, setCandidates] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const loadCandidates = useCallback(async () => {
        try {
            const res = await API.get(`/admin/elections/${id}/candidates`);
            setCandidates(res.data);
        } catch (error) {
            toast.error("Error fetching candidates");
            console.log(error);
        }
    }, [id]); 

    const deleteCandidate = async (candidateId) => {
        try {
            await API.delete(`/admin/elections/candidates/${candidateId}`);
            toast.success("Candidate removed");
            loadCandidates();
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove candidate");
        }
    }

    useEffect (() => {
        const fetchData = async () => {
            await loadCandidates();
        };
        fetchData();
    }, [loadCandidates])

    return (
        <>
            <AdminNavbar/>

            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="fw-bold">Candidates</h2>
                    <button
                        className="btn btn-primary"
                        onClick={()=>setShowModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Candidate
                    </button>
                </div>

                <div className="card shadow-sm p-3">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Faction</th>
                                <th>Votes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((c) => (
                                <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.faction}</td>
                                <td>{c.votes}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm"
                                    onClick={()=>deleteCandidate(c.id)}>
                                    Delete
                                    </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <AddCandidateModal 
                        electionId={id}
                        reload={loadCandidates}
                        close={()=>setShowModal(false)}
                    />
                )}
            </div>
        </>
    )

}