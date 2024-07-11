import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "../css/SidebBar.css";
import { useAuth } from "./AuthContext";


function SideBar() {

    const {logout} = useAuth();

    const handleSignout = () =>{
      logout();
  }

  const location = useLocation();
  const [dashboardImg, setDashboardImg] = useState("src/assets/Dashboard.svg");
  const [createProjectImage, setCreateProjectImage] = useState("src/assets/create-project.svg");
  const [projectListImage, setProjectListImage] = useState("src/assets/Project-list.svg");

  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard':
        setDashboardImg("src/assets/Dashboard-active.svg");
        setCreateProjectImage("src/assets/create-project.svg");
        setProjectListImage("src/assets/Project-list.svg");
        break;
      case '/add':
        setDashboardImg("src/assets/Dashboard.svg");
        setCreateProjectImage("src/assets/create-project-active.svg");
        setProjectListImage("src/assets/Project-list.svg");
        break;
      case '/list':
        setDashboardImg("src/assets/Dashboard.svg");
        setCreateProjectImage("src/assets/create-project.svg");
        setProjectListImage("src/assets/Project-list-active.svg");
        break;
      default:
        setDashboardImg("src/assets/Dashboard.svg");
        setCreateProjectImage("src/assets/create-project.svg");
        setProjectListImage("src/assets/Project-list.svg");
        break;
    }
  }, [location.pathname]);

    return (
        <>
            <div className="sidebar">
                <div className="link-container">
                    <ul className="nav nav-pills">
                        <li className={"nav-item m-2 ${location.pathname === '/dashboard' ? 'active' : ''}"}>
                            <Link to="/dashboard" >
                                <span className="menu-logo" > <img src={dashboardImg}  /></span>
                            </Link>
                        </li>
                        <li className={"nav-item m-2 ${location.pathname === '/list' ? 'active' : ''}"}>
                            <Link to="/list"  >
                                <span className="menu-logo"> <img src={projectListImage}  /></span>
                            </Link>
                        </li>
                        <hr style={{"width":"2rem"}} />
                        <li className={"nav-item m-2 ${location.pathname === '/add' ? 'active' : ''}"}>
                            <Link to="/add"  >
                                <span className="menu-logo"> <img src={createProjectImage} /></span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="signout-container">
                    <Link to="/" className="m-2" onClick={handleSignout}>
                        <span className="me-2 fs-6"> <img src="src\assets\Logout.svg" /></span>
                    </Link>
                </div>
            </div>
        </>
    );

}

export default SideBar;


