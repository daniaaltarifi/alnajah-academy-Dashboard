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

  
  return (
//     <div id="viewport">
//     <div id="sidebar">
//       <header>
//        <Link to="" className="link_logo"><img src={require("../assets/ba9ma2.png")} alt="logo" className="logo img-fluid"/></Link>
//       </header>
//       <ul className="nav">
//         <li>
//           <Link to="#">
//             <img src={require("../assets/home.png")} alt=""className="img-fluid icon_sidebar" /> 
//           </Link>
//         </li>
//         <li>
//         <Link to="#">
//             <img src={require("../assets/department.png")} alt=""className="img-fluid icon_sidebar" /> 
//           </Link>
//         </li>
//         <li>
//         <Link to="#">
//             <img src={require("../assets/teacher.png")} alt=""className="img-fluid icon_sidebar" /> 
//           </Link>
//         </li>
//         <li>
//         <Link to="#">
//             <img src={require("../assets/purchase.png")} alt=""className="img-fluid icon_sidebar" /> 
//           </Link>
//         </li>
//         <li>
//         <Link to="#">
//             <img src={require("../assets/library.png")} alt=""className="img-fluid icon_sidebar" /> 
//           </Link>
//         </li>
//         <li>
//         <Link to="#">
//             <img src={require("../assets/blog.png")} alt=""className="img-fluid icon_sidebar" /> 
//           </Link>
//         </li>
//         <li>
//         <Link to="#">
//             <img src={require("../assets/comment.png")} alt=""className="img-fluid icon_sidebar" /> 
//           </Link>
//         </li>
//       </ul>
//     </div>
   
//   </div>
<div style={{ display: "flex", height: "100vh",overflow: "scroll initial" }}>
        
<CDBSidebar
  textColor="#fff"
  backgroundColor="#833988"

>
  <CDBSidebarHeader  prefix={<i className="fa fa-bars fa-large"></i>}>
    Sidebar Header
  </CDBSidebarHeader>

  <div className="d-flex justify-content-center align-items-center">
    <img
      src={require("../assets/ba9ma2.png")}
      alt="logo"
      height={"100vh"}
      width={"100vh"}
      className="img-fluid"
    />
  </div>

  <CDBSidebarContent className="sidebar-content">
    <CDBSidebarMenu>
      <NavLink exact to="/" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="columns"></CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="/tables" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="table"></CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="/profile" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="user"> </CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="/analytics" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="chart-line"></CDBSidebarMenuItem>
      </NavLink>
      <NavLink
        exact
        to="/hero404"
        target="_blank"
        activeClassName="activeClicked"
      >
        <CDBSidebarMenuItem icon="exclamation-circle">
        </CDBSidebarMenuItem>
      </NavLink>
    </CDBSidebarMenu>
  </CDBSidebarContent>

  <CDBSidebarFooter style={{ textAlign: "center" }}>
    <div style={{ padding: "20px 5px" }}>Sidebar Footer</div>
  </CDBSidebarFooter>
</CDBSidebar>
</div>
  );
};

export default Sidebar;
