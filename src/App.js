import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { UserContext, UserProvider } from "./UserContext";
import Home from "./Pages/Home.js";
import SideBar from "./component/SideBar.js";
import SideTeacher from "./component/SideTeacher.js";
import Department from "./Pages/Department.js";
import Courses from "./Pages/Courses.js";
import AddCourse from "./Pages/AddCourse.js";
import UpdateCourse from "./Pages/UpdateCourse.js";
import Teacher from "./Pages/Teacher.js";
import AddTeacher from "./Pages/AddTeacher.js";
import UpdateTeacher from "./Pages/UpdateTeacher.js";
import Order from "./Pages/Order.js";
import Library from "./Pages/Library.js";
import AddLibrary from "./Pages/AddLibrary.js";
import UpdateLibrary from "./Pages/UpdateLibrary.js";
import Blogs from "./Pages/Blogs.js";
import AddBlog from "./Pages/AddBlog.js";
import Comments from "./Pages/Comments.js";
import Profile from "./Pages/Profile.js";
import Login from "./Pages/Login.js";
import Users from "./Pages/Users.js";
import Admin from "./Pages/Admin.js";
import Faq from "./Pages/Faq.js";
import AddFaq from "./Pages/AddFaq.js";
import UpdateFaq from "./Pages/UpdateFaq.js";
import UpdateBlog from "./Pages/UpdateBlog.js";
import Coupon from "./Pages/Coupon.js";
import TeacherCourses from "./Teacher/TeacherCourses.js";
import TeacherAddCourse from "./Teacher/TeacherAddCourse.js";
import AddCouponCode from "./Pages/AddCouponCode.js";
import UpdateCoupon from "./Pages/UpdateCoupon.js";
import TeacherUpdateCourse from "./Teacher/TeacherUpdateCourses.js";
import Slider from "./Pages/Slider.js";
import UpdateSlider from "./Pages/UpdateSlider.js";
import AddSlider from "./Pages/AddSlider.js";
import About from "./Pages/About.js";
import UpdateAbout from "./Pages/UpdateAbout.js";
import AvailableCards from "./Pages/AvailableCards.js";
import AddAvailableCards from "./Pages/AddAvailableCard.js";
import UpdateAvailableCard from "./Pages/UpdateAvailablecard.js";
import Goverment from "./Pages/Goverment.js";
import AddGoverment from "./Pages/AddGoverment.js";
function AppContent() {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const showApp = location.pathname !== "/";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!showApp) {
    return <Login />;
  }

  if (user.role === "admin") {
    return <AppRouterAdmin />;
  }

  if (user.role === "teacher") {
    return <AppRouterTeacher />;
  }

  return null;
}

const AppRouterAdmin = () => {
  return (
    <div className="App" dir="rtl">
      <SideBar />
      <div className="main-content">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/updatecourse" element={<UpdateCourse />} />
        
          <Route path="/addteacher" element={<AddTeacher />} />
          <Route path="/updateteacher" element={<UpdateTeacher />} />
          <Route path="/order" element={<Order />} />
          <Route path="/library" element={<Library />} />
          <Route path="/addlibrary" element={<AddLibrary />} />
          <Route path="/updatelibrary" element={<UpdateLibrary />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/updateblog" element={<UpdateBlog />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/addfaq" element={<AddFaq />} />
          <Route path="/updatefaq" element={<UpdateFaq />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/addcoupon" element={<AddCouponCode />} />
          <Route path="/updatecoupon" element={<UpdateCoupon />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/addslider" element={<AddSlider />} />
          <Route path="/updateslider" element={<UpdateSlider />} />
          <Route path="/about" element={<About />} />
          <Route path="/updateabout" element={<UpdateAbout />} />
          <Route path="/availablecards" element={<AvailableCards />} />
          <Route path="/addavailablecard" element={<AddAvailableCards />} />
          <Route path="/updateavailablecard" element={<UpdateAvailableCard />} />
          <Route path="/goverment" element={<Goverment />} />
          <Route path="/addgoverment" element={<AddGoverment />} />


        </Routes>
      </div>
    </div>
  );
};

const AppRouterTeacher = () => {
  return (
    <div className="App" dir="rtl">
      <SideTeacher />
      <div className="main-content">
        <Routes>
        <Route path="/profile/:id" element={<Profile />} />
         {/* <Route index element={<HomChef />} /> */}
          <Route path="/teachercourses" element={<TeacherCourses />} />
          <Route path="/teacheraddcourses" element={<TeacherAddCourse />} />
          <Route path="/teacherupdatecourses" element={<TeacherUpdateCourse />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;