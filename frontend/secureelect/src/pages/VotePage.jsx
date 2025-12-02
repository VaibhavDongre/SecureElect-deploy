import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import UserNavbar from "../components/UserNavbar";

export default function VotePage() {
  const { electionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Title passed from UserDashboard 
  const electionTitle = location.state?.electionTitle || `Election #${electionId}`;

  // Load candidates for this election
  const loadCandidates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get(`/user/${electionId}/candidates`);
      setCandidates(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load candidates");
    } finally {
      setLoading(false);
    }
  }, [electionId]);

  useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  // Submit vote for a specific candidate
  const castVote = async (candidate) => {
    try {
      await API.post("/user/vote", {
        electionId,
        candidateId: candidate.id,
      });

      toast.success("Vote submitted successfully!");

      // Go to confirmation page with details
      navigate("/vote/confirmation", {
        state: {
          electionTitle: electionTitle,
          candidateName: candidate.name,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit vote");
    }
  };

  return (
    <>
      <UserNavbar />

      <div className="container mt-4">
        <h2 className="fw-bold mb-3">Choose Your Candidate</h2>
        <p className="text-muted mb-4">{electionTitle}</p>

        {loading ? (
          <p>Loading candidates...</p>
        ) : candidates.length === 0 ? (
          <p>No candidates available for this election.</p>
        ) : (
          <div className="row">
            {candidates.map((cand) => (
              <div className="col-md-4 mb-3" key={cand.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{cand.name}</h5>
                    <p className="card-text text-muted">
                      Faction: <strong>{cand.faction}</strong>
                    </p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => castVote(cand)}
                    >
                      Vote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
