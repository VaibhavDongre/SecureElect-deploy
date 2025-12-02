import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function AddCandidateModal({ electionId, reload, close }) {

  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");

  const addCandidate = async () => {
    if (!name.trim()) {
      return toast.error("Candidate name is required");
    }
    if (!faction.trim()) {
      return toast.error("Faction is required");
    }

    try {
      await API.post(`/admin/elections/${electionId}/candidates`, {
        name,
        faction
      });

      toast.success("Candidate added!");
      reload(); // refresh candidate list
      close();  // close modal

    } catch (err) {
        console.log(err);
      toast.error("Error adding candidate");
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Add Candidate</h5>
            <button className="btn-close" onClick={close}></button>
          </div>

          <div className="modal-body">

            <div className="mb-3">
              <label className="form-label">Candidate Name</label>
              <input
                className="form-control"
                placeholder="Enter candidate name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Faction (Party)</label>
              <input
                className="form-control"
                placeholder="Enter faction"
                value={faction}
                onChange={(e) => setFaction(e.target.value)}
              />
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={close}>Cancel</button>
            <button className="btn btn-primary" onClick={addCandidate}>Add</button>
          </div>

        </div>
      </div>
    </div>
  );
}
