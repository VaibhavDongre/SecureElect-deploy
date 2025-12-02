import { useParams } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import API from "../services/api";
import { Pie, Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js"


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

export default function AdminResults () {

    const {electionId} = useParams();

    const [results, setResults] = useState([]);
    const [stats, setStats] = useState(null);

        //Chart labels (candidate names)
    const labels = results.map( c => c.name);

    //Pie chart data
    const pieData = {
        labels: labels,
        datasets: [
            {
                data: results.map(c => c.votes),
                backgrooundColor: [
                    "#007bff", "#28a745", "#ffc107", "#dc3545", "#6610f2"
                ]
            }
        ]
    };

    //Bar char data
    const barData = {
        labels: labels,
        datasets: [
            {
                label: "Votes",
                data: results.map(c => c.votes),
                backgrooundColor: "#0d6efd"
            }
        ]
    };

    const loadResults = async()=>{
        try {
            const res = await API.get(`/admin/elections/${electionId}/results`);
            setResults(res.data);

            const statRes = await API.get(`/admin/elections/${electionId}/stats`);
            setStats(statRes.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load results");
        }
    }

    useEffect(() => {
        const fetchData = async ()=>{
            await loadResults();
        };
        fetchData();
    },[])


    return (
        <>
            <AdminNavbar />

            <div className='container mt-4'>
                <h2 className='fw-bold mb-4'>Election Results</h2>

                {!stats ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {/* Winner Section */}
                        <div className='card shadow-sm p-3 mb-4'>
                            <h4 className='fw-bold'>Winner</h4>

                            {results.length > 0 ? (
                                <div>
                                    <h5 className='text-success'>
                                        {results[0].name} ({results[0].faction})
                                    </h5>
                                    <p>Total Votes: ({results[0].votes})</p>
                                </div>
                            ) : (
                                <p>No candidates found.</p>
                            )}
                        </div>

                        {/*Candidate Table*/}
                        <div className='card shadow-sm p-3 mb-4'>
                            <h4 className='fw-bold'>
                                All Candidates
                            </h4>
                            
                            <table className='table table-striped mt-3'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Faction</th>
                                        <th>Votes</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {results.map((c) => (
                                        <tr key={c.id}>
                                            <td>{c.name}</td>
                                            <td>{c.faction}</td>
                                            <td>{c.votes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Charts Section */}
                            <div className="row mt-4">

                            {/* Pie Chart */}
                            <div className="col-md-6 mb-4">
                                <div className="card shadow-sm p-3">
                                <h5 className="fw-bold mb-3">Vote Distribution</h5>
                                <Pie data={pieData} />
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <div className="col-md-6 mb-4">
                                <div className="card shadow-sm p-3">
                                <h5 className="fw-bold mb-3">Votes per Candidate</h5>
                                <Bar data={barData} />
                                </div>
                            </div>

                            </div>

                        </div>
                    </>
                )}
            </div>
        </>
    )
}