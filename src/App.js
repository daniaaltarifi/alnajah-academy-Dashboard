import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js'
import SideBar from './component/SideBar.js';
import Department from './Pages/Department.js';
import Courses from './Pages/Courses.js';
import AddCourse from './Pages/AddCourse.js';
function App() {
  return (
    <Router>
   <div className="App" dir='rtl'>
      <SideBar />
      <div className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/department' element={<Department />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/addcourse' element={<AddCourse />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
