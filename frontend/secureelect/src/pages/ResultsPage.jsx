import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import UserNavbar from "../components/UserNavbar";

export default function ResultsPage() {
  const { electionId } = useParams();
  const [results, setResults] = useState([]);

  const loadResults = async () => {
    try {
      const res = await API.get(`/user/elections/${electionId}/results`);
      setResults(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load results");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        await loadResults();
    }
    fetchData();
  }, []);

  return (
    <>
      <UserNavbar />

      <div className="container mt-4">
        <h2 className="fw-bold mb-4">Election Results</h2>

        {results.length === 0 ? (
          <p>No results available.</p>
        ) : (
          <div className="card p-3 shadow-sm">
            {results.map((c) => (
              <div key={c.id} className="mb-3 border-bottom pb-2">
                <h5 className="mb-1">{c.name}</h5>
                <p className="text-muted mb-1">
                  Faction: <strong>{c.faction}</strong>
                </p>
                <span className="badge bg-dark">Votes: {c.votes}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
