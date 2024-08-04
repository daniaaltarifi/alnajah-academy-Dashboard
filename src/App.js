import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home.js";
import SideBar from "./component/SideBar.js";
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
function AppContent() {
  const location = useLocation(); // Get the current location
  const showApp = location.pathname != "/";
  if (!showApp) {
    return <Login />;
  }
  return (
    <div className="App" dir="rtl">
      <SideBar />
      <div className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/updatecourse" element={<UpdateCourse />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/addteacher" element={<AddTeacher />} />
          <Route path="/updateteacher" element={<UpdateTeacher />} />
          <Route path="/order" element={<Order />} />
          <Route path="/library" element={<Library />} />
          <Route path="/updateteacher" element={<UpdateTeacher />} />
          <Route path="/addlibrary" element={<AddLibrary />} />
          <Route path="/updatelibrary" element={<UpdateLibrary />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/updateblog" element={<UpdateBlog />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/addfaq" element={<AddFaq />} />
          <Route path="/updatefaq" element={<UpdateFaq />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
}
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
export default App;
