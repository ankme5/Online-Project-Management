import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Common.css';
import '../css/Display.css';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TablePagination, Button, Card, CardContent, Typography, useMediaQuery, TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/Display.css'
import SideBar from "./SideBar";
import { LineController } from "chart.js";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface Project {
    id: number;
    project_name: string;
    reason: string;
    type: string;
    division: string;
    category: string;
    location: string;
    status: string;
    priority: string;
    department: string;
    start_date: Date;
    end_date: Date;
}

const Display: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const isMobile = useMediaQuery('(max-width:600px)');

    const accessToken = "Bearer " + localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("calling all-projects");
                const response = await fetch("http://localhost:8080/home/all-projects", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.log("getting error while fetching all data " + error);
            }
        };



        fetchData();
    }, []);

    //pagination
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    //filters
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(0); // Reset to the first page after search
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortCriteria(event.target.value);
        setPage(0); // Reset to the first page after sorting
    };

    const sortedProjects = [...projects].sort((a, b) => {
        switch (sortCriteria) {
            case "ProjectName":
                return a.project_name.localeCompare(b.project_name);
            case "Status":
                return a.status.localeCompare(b.status);
            case "Priority":
                return a.priority.localeCompare(b.priority);
            case "Reason":
                return a.reason.localeCompare(b.reason);
            case "Type":
                return a.type.localeCompare(b.type);
            case "Division":
                return a.division.localeCompare(b.division);
            case "Category":
                return a.category.localeCompare(b.category);
            case "Location":
                return a.location.localeCompare(b.location);
            case "Department":
                return a.department.localeCompare(b.department);
            default:
                return 0;
        }
    });

    const filteredProjects = sortedProjects.filter(project =>
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedProjects = filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // actions buttons

    const updateStatus = async (id: number, status: string) => {

        try {
            const response = await fetch("http://localhost:8080/home/update-status/" + id + "/" + status, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                }
            }
            );

            if (response.ok) {
                setProjects(prevProjects => prevProjects.map(project =>
                    project.id === id ? { ...project, status } : project
                ));
                console.log('Status updated successfully');
            } else {
                console.error('Failed to update status');
            }

        } catch (error) {
            console.log(error);
        }

    }

    //date formating

    const formatDate = (input_date: Date) => {
        const date = new Date(input_date);
        const formattedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: '2-digit' });

        // Convert 'Month DD, YYYY' to 'Month-DD,YYYY'
        const [monthDay, year] = formattedDate.split(', ');
        const [month, day] = monthDay.split(' ');

        return `${month}-${day},${year}`;
    };


    //signout 

    const { logout } = useAuth();

    const handleSignout = () => {
        logout();
    }

    return (
        <div className="d-flex">
            <div className="col-auto sidebar-container">
                <SideBar />
            </div>
            <div className="main">
                <div className="brand">
                    <div className="col-sm-4 title-div">
                        <span className="page-title">Project Listing</span>
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
                    <div className="card shadow p-3">
                        <div className="search-filter-section">
                            <TextField
                                variant="standard"
                                className="search-input"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Search"
                                onChange={handleSearch}
                            />
                            <FormControl variant="standard" className="sort-select">
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    value={sortCriteria}
                                    onChange={handleSortChange}
                                    label="Sort By"
                                >
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="ProjectName">Project Name</MenuItem>
                                    <MenuItem value="Reason">Reason</MenuItem>
                                    <MenuItem value="Type">Type</MenuItem>
                                    <MenuItem value="Division">Division</MenuItem>
                                    <MenuItem value="Category">Category</MenuItem>
                                    <MenuItem value="Priority">Priority</MenuItem>
                                    <MenuItem value="Department">Department</MenuItem>
                                    <MenuItem value="Location">Location</MenuItem>
                                    <MenuItem value="Status">Status</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="project-table-container">
                            {!isMobile ? (
                                <TableContainer component={Paper} className="table-fixed-height">
                                    <Table>
                                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableRow>
                                                <TableCell sx={{ color: '#333' }}>Project Name</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Reason</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Type</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Division</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Category</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Priority</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Department</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Location</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Status</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {displayedProjects.map((project) => (
                                                <TableRow key={project.id}>
                                                    <TableCell>{project.project_name}</TableCell>
                                                    <TableCell>{project.reason}</TableCell>
                                                    <TableCell>{project.type}</TableCell>
                                                    <TableCell>{project.division}</TableCell>
                                                    <TableCell>{project.category}</TableCell>
                                                    <TableCell>{project.priority}</TableCell>
                                                    <TableCell>{project.department}</TableCell>
                                                    <TableCell>{project.location}</TableCell>
                                                    <TableCell>{project.status}</TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" color="success" onClick={() => updateStatus(project.id, "Running")} className="m-1" size="small" >Start</Button>
                                                        <Button variant="contained" color="info" onClick={() => updateStatus(project.id, "Closed")} className="m-1" size="small">Close</Button>
                                                        <Button variant="contained" color="inherit" onClick={() => updateStatus(project.id, "Cancelled")} className="m-1" size="small">Cancel</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                displayedProjects.map((project) => (
                                    <Card key={project.id} className="project-card">
                                        <CardContent>

                                            <Typography variant="h6">{project.project_name}</Typography>
                                            <Typography variant="body2"><>{formatDate(project.start_date)} to {formatDate(project.end_date)}</></Typography>
                                            <Typography variant="body2"><strong>Reason:</strong> {project.reason}</Typography>
                                            <Typography variant="body2"><strong>Type:</strong> {project.type}</Typography>
                                            <Typography variant="body2"><strong>Division:</strong> {project.division}</Typography>
                                            <Typography variant="body2"><strong>Category:</strong> {project.category}</Typography>
                                            <Typography variant="body2"><strong>Priority:</strong> {project.priority}</Typography>
                                            <Typography variant="body2"><strong>Department:</strong> {project.department}</Typography>
                                            <Typography variant="body2"><strong>Location:</strong> {project.location}</Typography>
                                            <Typography variant="body2"><strong>Status:</strong> {project.status}</Typography>
                                            <div className="card-actions">
                                                <Button variant="contained" id="start" color="primary" size="small" onClick={() => updateStatus(project.id, "Running")}>Start</Button>
                                                <Button variant="contained" id="close" color="secondary" size="small" onClick={() => updateStatus(project.id, "Closed")}>Closed</Button>
                                                <Button variant="contained" id="cancel" color="primary" size="small" onClick={() => updateStatus(project.id, "Cancelled")}>Cancel</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                            <div >
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={filteredProjects.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                                    className="pagination-container"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Display;
