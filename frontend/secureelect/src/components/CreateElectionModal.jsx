import { useState } from "react"
import { toast } from "react-toastify";
import API from "../services/api";

export default function CreateElectionModal ({close, reload}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const createElection = async () => {
        if (!title.trim()) return toast.error("The title is required");

        try {
            await API.post("/admin/elections", {
                title,
                description
            });

            toast.success("Election created successfully!");
            reload(); //to refresh election list
            close(); //Close modal
        } catch (error) {
            toast.error("Failed to create the election", error);
        }
    }

    return(
        <div className="modal fade show d-block" tabIndex="-1" style={{background: "rgba(0,0,0,0.6"}}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Create Election</h5>
                        <button className="btn-close" onClick={close}></button>
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Election Title</label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) =>  setTitle(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                placeholder="Enter description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={close}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={createElection}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}