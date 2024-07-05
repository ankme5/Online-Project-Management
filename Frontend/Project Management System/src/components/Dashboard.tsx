import React, { useEffect, useRef, useState } from 'react';
import '../css/Dashboard.css';
import '../css/Common.css';
import Chart from 'chart.js/auto';
import NavBar from './NavBar';

const Dashboard: React.FC = () => {
    const [totalProjects, setTotalProjects] = useState(0);
    const [closedProjects, setClosedProjects] = useState(0);
    const [runningProjects, setRunningProjects] = useState(0);
    const [closureDelayProjects, setClosureDelayProjects] = useState(0);
    const [cancelledProjects, setCancelledProjects] = useState(0);

    const departments = ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR'];
    const totalCases = [15, 20, 10];  // These should be updated with the API response
    const closedCases = [5, 10, 8];   // These should be updated with the API response

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    const accessToken = "Bearer " + localStorage.getItem('authToken');

    useEffect(() => {
        // API Call to fetch data
        const fetchData = async () => {
            try {
                console.log("calling all-counts");
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

                // Update state variables with the fetched data
                setTotalProjects(data.Total || 0);
                setClosedProjects(data.Closed || 0);
                setRunningProjects(data.Running || 0);
                setClosureDelayProjects(data.Registered || 0);
                setCancelledProjects(data.Cancel || 0);

                // Update chart data
                // Assuming you get data like { department: 'STR', total: 15, closed: 5 } from the API
                // Update totalCases and closedCases accordingly here
                // For now, using the static data as example
                // const updatedTotalCases = data.map(d => d.total);
                // const updatedClosedCases = data.map(d => d.closed);
                // setTotalCases(updatedTotalCases);
                // setClosedCases(updatedClosedCases);

            } catch (error) {
                console.log("getting error while fetching all data " + error);
            }
        };
        fetchData();

        // Chart mapping
        if (chartRef.current) {
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
                                backgroundColor: 'rgba(60, 179, 113, 1)',
                                borderColor: 'rgba(60, 179, 113, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Closed',
                                data: closedCases,
                                backgroundColor: 'rgba(106, 90, 205, 1)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 5
                                }
                            }
                        }
                    }
                });
            }
        }

        // Cleanup function
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [accessToken, departments, totalCases, closedCases]);

    return (
        <>
            <NavBar />
            <div className='main'>
                <span className="page-title">Dashboard</span>
                <div className="container">
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
                    <div className="chart-container">
                        <p className="chart-title">Department Wise Total Vs Closed</p>
                        <canvas ref={chartRef} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
