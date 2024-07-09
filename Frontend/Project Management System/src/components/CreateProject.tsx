import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CreateProject.css';
import '../css/Common.css';
import SideBar from './SideBar';
import { useAuth } from './AuthContext';

const CreateProject: React.FC = () => {


    //signout 

    const { logout } = useAuth();

    const handleSignout = () => {
        logout();
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const [projectData, setProjectData] = useState({
        project_name: '',
        reason: '',
        type: '',
        division: '',
        category: '',
        priority: '',
        department: '',
        start_date: currentDate,
        end_date: '',
        location: '',
        status: 'Registered'
    });

    const accessToken = "Bearer " + localStorage.getItem('authToken');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/home/add-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                body: JSON.stringify(projectData)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status.toUpperCase() === "SUCCESS") {
                    alert("Project added successfully!");
                } else {
                    console.log('Unsuccessful:', data.message);
                }
            } else {
                const errorData = await response.json();
                console.log('Unsuccessful:', errorData.message);
            }
        } catch (error) {
            console.error('Error in Creating Project:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setProjectData({ ...projectData, [id]: value });
    };

    const getTodaysDate = ():string=> {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
        
    }

    return (

        <div className="d-flex">
            <div className="col-auto sidebar-container">
                <SideBar />
            </div>
            <div className="main">
                <div className="brand">
                    <div className="col-sm-4 title-div">
                        <span className="page-title">Create Project</span>
                    </div>
                    <div className="col-sm-4 logo-div">
                        <img src="src/assets/Logo.svg" alt="Logo" />
                    </div>
                    <div className="col-sm-4 brand-logout">
                        <a href="" onClick={handleSignout}>
                            <span className="me-2 fs-6"> <img src="src\assets\Logout.svg" /></span>
                        </a>
                    </div>
                </div>
                <div className="container">
                    <div className='card shadow p-4'>
                        <form onSubmit={handleSubmit} className='form-box'>
                            <div className="status">
                                <span>Status: </span>
                                <span id="status">Registered</span>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="project_name">Project Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="project_name"
                                        placeholder="Enter Project Theme"
                                        value={projectData.project_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="division">Division</label>
                                    <select
                                        id="division"
                                        className="form-control"
                                        value={projectData.division}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Choose...</option>
                                        <option value="Compressior">Division 1</option>
                                        <option value="">Division 2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className='col-md-6'>
                                    <div className="form-group">
                                        <label htmlFor="reason">Reason</label>
                                        <select
                                            id="reason"
                                            className="form-control"
                                            value={projectData.reason}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option value="Business">Business</option>
                                            <option value="Dealership">Dealership</option>
                                            <option value="Transport">Transport</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="type">Type</label>
                                        <select
                                            id="type"
                                            className="form-control"
                                            value={projectData.type}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option value="Internal">Internal</option>
                                            <option value="External">External</option>
                                            <option value="Vendor">Vendor</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <select
                                            id="category"
                                            className="form-control"
                                            value={projectData.category}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option value="Quality A">Quality A</option>
                                            <option value="Quality B">Quality B</option>
                                            <option value="Quality C">Quality C</option>
                                            <option value="Quality D">Quality D</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="priority">Priority</label>
                                        <select
                                            id="priority"
                                            className="form-control"
                                            value={projectData.priority}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="department">Department</label>
                                        <select
                                            id="department"
                                            className="form-control"
                                            value={projectData.department}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option value="HR">HR</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Strategy">Strategy</option>
                                            <option value="Quality">Quality</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Information Technology">Information Technology</option>
                                            <option value="Legal">Legal</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="location">Location</label>
                                        <select
                                            id="location"
                                            className="form-control"
                                            value={projectData.location}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Choose...</option>
                                            <option value="Pune">Pune</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="start_date">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="start_date"
                                        value={projectData.start_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="end_date">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="end_date" min={getTodaysDate()}
                                        value={projectData.end_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
