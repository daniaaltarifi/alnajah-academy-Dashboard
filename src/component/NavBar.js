import React, { useState,useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/sidebar.css'
const Navbar = ({ title }) => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null); // Create a ref for the notification dropdown

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };
  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 col-md-6 col-sm-12">
          <p className="title_page_navbar">{title}</p>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="icon_profile_navbar">
            <img
              src={require("../assets/profile.png")}
              alt="profile img"
              className="img-fluid img_icon_navbar"
            />
            <p
              className="dropdown-toggle list_profile_icon_navbar mx-3"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              مسلّم يوسف
            </p>
            <ul className="dropdown-menu">
              <li>
                <Link to="/profile" className="dropdown-item">
                  حسابي
                </Link>
              </li>
              <li>
                <Link to="/login" className="dropdown-item">
                  تسجيل الخروج
                </Link>
              </li>
            </ul>

            <div className="notification-wrapper" ref={notificationRef}>
              <i
                className="fa-regular fa-bell mt-1"
                onClick={toggleNotification}
                style={{ color: "#833988", cursor: "pointer" }}
              ></i>
              {isNotificationOpen && (
                <div className="notification-dropdown">
                  <ul className='notif_list'>
                    <li>
                      <div className="notif_cont">
                        <p> هناك طلب شراء مادة من قبل محمد احمد <i className="fa-solid fa-xmark" style={{color:"#F57D20"}}></i></p>
                      </div>
                    </li>
                    <li>
                      <div className="notif_cont">
                        <p>هناك طلب شراء مادة من قبل <i className="fa-solid fa-xmark" style={{color:"#F57D20"}}></i></p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
