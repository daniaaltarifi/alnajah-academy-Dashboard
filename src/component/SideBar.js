import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from "cdbreact";
import { NavLink } from "react-router-dom";
import '../Css/sidebar.css'
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleBackground = (e) => {
    // Remove background from previously active link
    if (activeLink) {
      activeLink.style.background = "";
      activeLink.style.padding = "";
      activeLink.style.borderRadius = "";
    }

    // Apply background to the clicked link
    const currentLink = e.currentTarget;
    currentLink.style.background = "#F57D20";
    currentLink.style.padding = "10px";
    currentLink.style.borderRadius = "10px";

    // Update state to track the active link
    setActiveLink(currentLink);
  };
  
  return (
    <div id="viewport" >
    <div id="sidebar" >
      <header>
       <Link to="" className="link_logo"><img src={require("../assets/ba9ma2.png")} alt="logo" className="logo img-fluid"/></Link>
      </header>
      <div className="nav">
        <li>
          <Link to="/" lassName="background_icon" onClick={handleBackground}>
            <img src={require("../assets/home.png")} alt=""className="img-fluid icon_sidebar" /> 
          </Link>
        </li>
        <li>
        <Link to="/department" onClick={handleBackground} className="background_icon">
            <img src={require("../assets/department.png")} alt=""className="img-fluid icon_sidebar" /> 
          </Link>
        </li>
        <li>
        <Link to="/courses">
            <img src={require("../assets/teacher.png")} alt=""className="img-fluid icon_sidebar" /> 
          </Link>
        </li>
        <li>
        <Link to="#">
            <img src={require("../assets/purchase.png")} alt=""className="img-fluid icon_sidebar" /> 
          </Link>
        </li>
        <li>
        <Link to="#">
            <img src={require("../assets/library.png")} alt=""className="img-fluid icon_sidebar" /> 
          </Link>
        </li>
        <li>
        <Link to="#">
            <img src={require("../assets/blog.png")} alt=""className="img-fluid icon_sidebar" /> 
          </Link>
        </li>
        <li>
        <Link to="#">
            <img src={require("../assets/comment.png")} alt=""className="img-fluid icon_sidebar" /> 
          </Link>
        </li>
      </div>
    </div>
   
  </div>

  );
};

export default Sidebar;
