import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import UserNavbar from "../components/UserNavbar"; 
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  // Load elections from backend
    const loadElections = async () => {
    try {
      const res = await API.get("/user/elections");
      setElections(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load elections");
    }
  };

  useEffect(() => {
    const fetch = async () => {
        await loadElections();
    }
    fetch();
  }, []);

  return (
    <>
      <UserNavbar />

      <div className="container mt-4">
        <h2 className="fw-bold mb-4">Available Elections</h2>

        <div className="row">
          {elections.map((el) => (
            <div className="col-md-4 mb-4 d-flex" key={el.id}>
              <div className="card shadow-sm flex-fill d-flex flex-column">

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{el.title}</h5>
                  <p className="card-text">{el.description}</p>

                  {/* Status Badge */}
                  {el.active ? (
                    <span className="badge bg-success mb-2">Active</span>
                  ) : el.completed ? (
                    <span className="badge bg-secondary mb-2">Completed</span>
                  ) : (
                    <span className="badge bg-warning mb-2">Not Started</span>
                  )}

                  {/* BUTTONS AT BOTTOM */}
                  <div className="mt-auto">

                    {/* USER CAN VOTE IF: election is active AND NOT voted */}
                    {el.active && !el.hasVoted && (
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => navigate(`/vote/${el.id}`)}
                      >
                        Vote Now
                      </button>
                    )}

                    {/* SHOW ALREADY VOTED */}
                    {el.hasVoted && (
                      <button className="btn btn-outline-secondary w-100" disabled>
                        Already Voted
                      </button>
                    )}

                    {/* VIEW RESULTS IF COMPLETED */}
                    {el.completed && (
                      <button
                        className="btn btn-dark w-100 mt-2"
                        onClick={() => navigate(`/results/${el.id}`)}
                      >
                        View Results
                      </button>
                    )}

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
