import { ToastContainer } from 'react-toastify'
import './App.css'
import Login from './pages/Login'
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { Route, Routes } from 'react-router-dom'
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AdminNavbar from './components/AdminNavbar';
import CreateElectionModal from './components/CreateElectionModal';
import Candidates from './pages/Candidates';
import VotePage from './pages/VotePage';
import ResultsPage from './pages/ResultsPage';
import Register from './pages/Register';
import AdminResults from './pages/AdminResults';
import VoteConfirmation from './pages/VoteConfirmation';

function App() {
  
  return (
    <>
    <ToastContainer/>
    <Routes>
      Public Routes
      <Route path='/' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />

      {/*Admin Routes*/}
      <Route 
        path='/admin/dashboard' 
        element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        }/>
      <Route 
        path='/admin/elections/:id/candidates'
        element={
          <AdminRoute>
            <Candidates />
          </AdminRoute>
        }
      />  

      <Route
        path='/admin/elections/:electionId/results'
        element={<AdminResults/>}
      />

      <Route 
        path='/vote/confirmation'
        element={<VoteConfirmation/>}
      />

      {/*User Routes*/}
      <Route 
        path='/user/dashboard' 
        element={
          <ProtectedRoute>
            <UserDashboard/>
          </ProtectedRoute>
        }/>

    <Route 
      path="/vote/:electionId" 
      element={<VotePage />} />  


    <Route 
      path='/results/:electionId'
      element={<ResultsPage/>}
    />
    </Routes>
    </>
  )
}

export default App
