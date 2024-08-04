

import SideBar from '../component/SideBar.js';
import NavBar from '../component/NavBar.js';
import '../Css/home.css'
import axios from "axios";
import { useEffect, useState } from 'react';
function Home() {
  const [departmentData, setDepartmentData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  const length=[
    {
      id:1,title:"الأقسام",numLength:departmentData.length
    },
    {
      id:2,title:"المواد",numLength:coursesData.length
    }, {
      id:3,title:"الطلاب",numLength:users.length
    }, {
      id:4,title:"المعلمين",numLength:teachers.length
    },
    {
      id:5,title:"الكتب",numLength:libraries.length
    },
    {
      id:6,title:"المقالات",numLength:blogs.length
    }, {
      id:7,title:"التعليقات",numLength:comments.length
    },
  ]
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const [departmentResponse,coursesResponse,usersResponse,teachersResponse,libraryResponse,blogResponse,commentsResponse]=await Promise.all([
         axios.get("http://localhost:8080/department/"),
         axios.get("http://localhost:8080/courses/"),
         axios.get("http://localhost:8080/api/getusers"),
         axios.get("http://localhost:8080/teacher/"),
         axios.get("http://localhost:8080/library/"),
         axios.get("http://localhost:8080/blog/"),
         axios.get("http://localhost:8080/connects/comment"),
        ])
        const usersData = usersResponse.data;
        const student = usersData.filter(user => user.role === 'student');
        setDepartmentData(departmentResponse.data);
        setCoursesData(coursesResponse.data);
        setUsers(student);
        setTeachers(teachersResponse.data);
        setLibraries(libraryResponse.data)
        setBlogs(blogResponse.data);
        setComments(commentsResponse.data)
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
   
fetchData()
  },[])
  return (
    <>
            <NavBar title="الاحصاءات"/>
<section className="margin_section">

    <div className="container-fluid ">
    <div className="row d-flex justify-content-center align-items-center">
      {length.map((card,id)=>(

      <div className="col-lg-3 col-md-6 col-sm-12 box_home"key={card.id}>
        <div className="d-flex">

        <img src={require('../assets/department.png')} alt="department" className="img-fluid icon_home" />

     <p className="title_section_home">{card.title}</p>
        </div>
     <p className="num_length_home">{card.numLength}</p>
      </div>
      ))}
      
     
    </div>
  </div>
  </section>

    </>
  );
}

export default Home;