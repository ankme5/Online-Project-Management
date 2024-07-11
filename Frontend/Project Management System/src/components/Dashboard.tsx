import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import '../css/Dashboard.css';
import '../css/Common.css';
import SideBar from './SideBar'
import { useAuth } from './AuthContext';
import { Hidden, useMediaQuery } from '@mui/material';

const Dashboard: React.FC = () => {
    const [totalProjects, setTotalProjects] = useState(0);
    const [closedProjects, setClosedProjects] = useState(0);
    const [runningProjects, setRunningProjects] = useState(0);
    const [closureDelayProjects, setClosureDelayProjects] = useState(0);
    const [cancelledProjects, setCancelledProjects] = useState(0);

    const [departments, setDepartments] = useState<string[]>([]);
    const [totalCases, setTotalCases] = useState<number[]>([]);
    const [closedCases, setClosedCases] = useState<number[]>([]);

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    const isMobile = useMediaQuery('(max-width:600px)');
    
    const accessToken = "Bearer " + localStorage.getItem('authToken');

    //signout 

    const { logout } = useAuth();

    const handleSignout = () => {
        logout();
    }

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                console.log("calling all-counts API");
                const response = await fetch("http://localhost:8080/home/all-counts", {
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

                setTotalProjects(data.Total || 0);
                setClosedProjects(data.Closed || 0);
                setRunningProjects(data.Running || 0);
                setClosureDelayProjects(data.Running || 0);
                setCancelledProjects(data.Cancelled || 0);

            } catch (error) {
                console.log("getting error while fetching all data " + error);
            }
        };

        const fetchDeptWiseCount = async () => {
            try {
                console.log("calling Dept Wise Count API");
                const response = await fetch("http://localhost:8080/home/dept-totalCount", {
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

                const updatedDepartments = data.map((item: { department: string }) => item.department);
                const updatedTotalCases = data.map((item: { total: number }) => item.total);
                const updatedClosedCases = data.map((item: { closed: number }) => item.closed);

                setDepartments(updatedDepartments);
                setTotalCases(updatedTotalCases);
                setClosedCases(updatedClosedCases);

            } catch (error) {
                console.log("getting error while fetching Department Wise data " + error);
            }
        };

        // Call API functions
        fetchAllData();
        fetchDeptWiseCount();

        // Cleanup function for chart instance
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [accessToken]);

    useEffect(() => {
        // Function to initialize chart
        const updateChart = () => {
            if (chartRef.current && departments.length > 0) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                const ctx = chartRef.current.getContext('2d');
                if (ctx) {
                    chartInstance.current = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: departments,
                            datasets: [

                                {
                                    label: 'Total',
                                    data: totalCases,
                                    backgroundColor: 'rgba(4,90,168,255)',
                                    borderColor: 'rgba(60, 179, 113, 1)',
                                    borderWidth: 1,
                                    // barThickness:10,
                                    borderRadius: 4,
                                    categoryPercentage:0.6,
                                    barPercentage:0.5
                                

                                },
                                {
                                    label: 'Closed',
                                    data: closedCases,
                                    backgroundColor: 'rgb(108,180,92)',
                                    borderColor: 'rgb(108,180,92,1)',
                                    borderWidth: 1,
                                    // barThickness:10,
                                    borderRadius: 4,
                                    categoryPercentage:0.6,
                                    barPercentage:0.5


                                }
                            ]
                        },
                        options: {

                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 2
                                    },
                                    grid: {
                                        display: false

                                    }

                                },
                                x: {
                                    grid: {
                                        display: false,

                                    }
                                }
                            }
                        }
                    });
                }
            }
        };

        // Call chart update function
        updateChart();

        // Cleanup function for chart instance
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [departments, totalCases, closedCases]); // Depend on variables needed for chart rendering

    
    return (
        <>
            <div className="d-flex">
                <div className="col-auto sidebar-container">
                    <SideBar />
                </div>
                <div className="main">
                    <div className="brand">
                        <div className="col-sm-4 title-div">
                            <span className="page-title">Dashboard</span>
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
                        <div className='dashboard-container'>
                            <div className="summary">
                                <div>
                                    <p className="summary-text">Total Projects</p>
                                    <p className="summary-number">{totalProjects}</p>
                                </div>
                                <div>
                                    <p className="summary-text">Closed</p>
                                    <p className="summary-number">{closedProjects}</p>
                                </div>
                                <div>
                                    <p className="summary-text">Running</p>
                                    <p className="summary-number">{runningProjects}</p>
                                </div>
                                <div>
                                    <p className="summary-text">Closure Delay</p>
                                    <p className="summary-number">{closureDelayProjects}</p>
                                </div>
                                <div>
                                    <p className="summary-text">Cancelled</p>
                                    <p className="summary-number">{cancelledProjects}</p>
                                </div>
                            </div>
                            <p className="chart-title">Department Wise Total Vs Closed</p>
                            <div className="chart-container mt-2">
                                <canvas ref={chartRef} style={isMobile?{height:"300px",width:"100%"}:{}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Dashboard;
