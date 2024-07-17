import React from "react";
import { Link } from "react-router-dom";
import "../Css/sidebar.css";
function NavBar({ title }) {
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-lg-10 col-md-6 col-sm-12">
            <p className="title_page_navbar">{title}</p>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="icon_profile_navbar">
            <img
                src={require("../assets/profile.png")}
                alt="profile img"
                className="img-fluid  img_icon_navbar"
              />
              <p
                className="dropdown-toggle list_profile_icon_navbar mx-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                مسلّم يوسف{" "}
              </p>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile" className="dropdown-item" href="#">
                    حسابي
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="dropdown-item" href="#">
                    {" "}
                    تسجيل الخروج
                  </Link>
                </li>
              </ul>
              <i class="fa-regular fa-bell mt-1" style={{color: "#833988"}}></i>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
