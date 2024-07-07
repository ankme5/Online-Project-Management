import './App.css'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CreateProject from './components/CreateProject';
import Display from './components/Display';
import Dashboard from './components/Dashboard';
import SideBar from './components/SideBar';

const App: React.FC = () => {
    return (
        <>
         
            <AuthProvider>
                <Routes>
                    <Route path="*" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="signout" element={<Login />} />
                        <Route path="list" element={<Display />} />
                        <Route path='add' element={<CreateProject />} />
                    </Route>
                </Routes>
            </AuthProvider>

        </>
    );
}

export default App
