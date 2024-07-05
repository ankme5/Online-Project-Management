import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Container, TablePagination, Button, Card, CardContent, Typography, useMediaQuery
} from '@mui/material';
import '../css/Display.css'

interface Project {
    id: number;
    project_name: string;
    reason: string;
    type: string;
    division: string;
    category: string;
    location: string;
    status: string;
}

const Display: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const isMobile = useMediaQuery('(max-width:600px)');

    const accessToken = "Bearer " + localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData= async () => {
            try {
                console.log("calling all-projects");
                const response =await fetch("http://localhost:8080/home/all-projects", {
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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
        <>
            <NavBar />
            <div className="main">
                <span className='page-title'>Project Listing</span>
                <div className="list-container">
                    <div className="card shadow p-5">
                        <Container>
                            {!isMobile ? (
                                <TableContainer component={Paper}>
                                    <Table className="project-table">
                                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableRow>
                                                <TableCell sx={{ color: '#333' }}>Project Name</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Reason</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Type</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Division</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Category</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Location</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Status</TableCell>
                                                <TableCell sx={{ color: '#333' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
                                                <TableRow key={project.id} sx={{ backgroundColor: project.status === 'Completed' ? '#e0ffe0' : '#fff' }}>
                                                    <TableCell>{project.project_name}</TableCell>
                                                    <TableCell>{project.reason}</TableCell>
                                                    <TableCell>{project.type}</TableCell>
                                                    <TableCell>{project.division}</TableCell>
                                                    <TableCell>{project.category}</TableCell>
                                                    <TableCell>{project.location}</TableCell>
                                                    <TableCell>{project.status}</TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" color="primary" size="small">Start</Button>
                                                        <Button variant="contained" color="secondary" size="small">Close</Button>
                                                        <Button variant="contained" color="primary" size="small">Cancel</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
                                    <Card key={project.id} className="project-card">
                                        <CardContent>
                                            <Typography variant="h6">{project.project_name}</Typography>
                                            <Typography variant="body2"><strong>Reason:</strong> {project.reason}</Typography>
                                            <Typography variant="body2"><strong>Type:</strong> {project.type}</Typography>
                                            <Typography variant="body2"><strong>Division:</strong> {project.division}</Typography>
                                            <Typography variant="body2"><strong>Category:</strong> {project.category}</Typography>
                                            <Typography variant="body2"><strong>Location:</strong> {project.location}</Typography>
                                            <Typography variant="body2"><strong>Status:</strong> {project.status}</Typography>
                                            <div className="card-actions">
                                                <Button variant="contained" color="primary" size="small">Start</Button>
                                                <Button variant="contained" color="secondary" size="small">Close</Button>
                                                <Button variant="contained" color="primary" size="small">Cancel</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}

                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={projects.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                labelRowsPerPage=""
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Display;
