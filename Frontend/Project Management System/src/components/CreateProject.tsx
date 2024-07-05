import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CreateProject.css';
import '../css/Common.css'
import 'react-datepicker/dist/react-datepicker.css';
import NavBar from './NavBar';

const CreateProject: React.FC = () => {

    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleEndDateChange = (date: Date | null) => {
        if (date && date >= new Date()) {
            setEndDate(date);
        } else {
            alert("End date cannot be earlier than today.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="main">
                <span className='page-title'>Create Project</span>
                <div className="form-container">
                    <div className='card shadow p-5'>
                        <form>
                            <div className="status">
                                <span>Status : </span>
                                <span id="status">Registered</span>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="themeName">Project Theme Name</label>
                                    <input type="text" className="form-control" id="themeName" placeholder="Enter theme name" />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="division">Division</label>
                                    <select id="reason" className="form-control">
                                        <option>Choose...</option>
                                        <option>Division 1</option>
                                        <option>Division 2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className='col-md-6'>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="reason">Reason</label>
                                        <select id="reason" className="form-control">
                                            <option>Choose...</option>
                                            <option>Reason 1</option>
                                            <option>Reason 2</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="type">Type</label>
                                        <select id="type" className="form-control">
                                            <option>Choose...</option>
                                            <option>Type 1</option>
                                            <option>Type 2</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="category">Category</label>
                                        <select id="category" className="form-control">
                                            <option>Choose...</option>
                                            <option>Category 1</option>
                                            <option>Category 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="priority">Priority</label>
                                        <select id="priority" className="form-control">
                                            <option>Choose...</option>
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="department">Department</label>
                                        <select id="department" className="form-control">
                                            <option>Choose...</option>
                                            <option>Department 1</option>
                                            <option>Department 2</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="location">Location</label>
                                        <select id="location" className="form-control">
                                            <option>Choose...</option>
                                            <option>Location 1</option>
                                            <option>Location 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input type="date" className="form-control" id="startDate" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="endDate">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="endDate"
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
        </>
    );
}

export default CreateProject;
