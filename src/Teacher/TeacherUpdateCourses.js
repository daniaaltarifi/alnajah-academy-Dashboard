import React, { useState,useEffect } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; 
import { useNavigate,useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";


function TeacherUpdateCourse() {
  const [teacherData, setTeacherData] = useState({});
  const [defaultvideo, setDefaultVideo] = useState(null);
  const [displayInfo, setDisplayInfo] = useState([]);
const [subject_name, setSubjectName] = useState("")
const [teacher_id, setTeacherId] = useState("")
const [department_id,setDepartment_id] = useState("")
const [before_offer,setBefore_offer]= useState("")
const [after_offer,setAfter_offer]= useState("")
const [descr,setDescr]= useState("")
const [img,setImg]= useState(null)
const [title,setTitle]= useState("")
const [url,setUrl]= useState(null)
const [departmentData, setDepartmentData] = useState([])
const [teacherCourse, setTeacherCourse] = useState([])
const navigate=useNavigate()
const location = useLocation();
const [updateTeacherId, setUpdateTeacherId] = useState("");
const [currentContext, setCurrentContext] = useState(null); // or 'link'
  const [videos, setVideos] = useState([]);
  const [links, setLinks] = useState([]);
  const [book, setBook] = useState(null);
  const [CourseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const storedTeacherId = localStorage.getItem("email");
    setTeacherId(storedTeacherId || "");
    const inputElement = document.getElementById("teacherIdInput");
    if (inputElement) {
      inputElement.disabled = true;
    }
  }, []);


  useEffect(() => {
    if (location.state && location.state.id) {
      setUpdateTeacherId(location.state.id);
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);

  useEffect(() => {
    if (updateTeacherId) {
      const teacherEmail = localStorage.getItem("email");
      if (teacherEmail) {
        getTeacherCourseById(teacherEmail, updateTeacherId);
      }
    }
  }, [updateTeacherId]);


 const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://ba9maacademy.kasselsoft.online/department");
      setDepartmentData(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`https://ba9maacademy.kasselsoft.online/courses/links/${updateTeacherId}`);
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`https://ba9maacademy.kasselsoft.online/courses/videos/${updateTeacherId}`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    if (updateTeacherId) {
      fetchLinks();
      fetchVideos();
    }
  }, [updateTeacherId]);
  const getTeacherCourseById = async (teacherEmail, updateTeacherId) => {
    try {
      const response = await axios.get(
        `https://ba9maacademy.kasselsoft.online/teacher/teacher-course/${updateTeacherId}?teacherEmail=${encodeURIComponent(teacherEmail)}`
      );
      const course = response.data;

      // Update the state with the course data
      setSubjectName(course.subject_name || "");
      setDepartment_id(course.department_id || "");
      setBefore_offer(course.before_offer || "");
      setAfter_offer(course.after_offer || "");
      setDescr(course.descr || "");
      setImg(course.img || null);
      setDefaultVideo(course.defaultvideo || null);
      setVideos(course.videos || []);
      setLinks(course.links || []);
      setBook(course.file_book || null);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };



  const handleImg = (e) => {
    const file = e.target.files[0];
    setImg(file);
    
  };
  const handelDefaultVideo = (e) => {
    const file = e.target.files[0];
    setDefaultVideo(file);
  };
 
 
  const handleDepartment = (e) => {
    const selectedDepartmentId = e.target.value;
    setDepartment_id(selectedDepartmentId);
  };

  



  const handleBookChange = (e) => {
    const file = e.target.files[0];
    setBook(file);
  };
  
  const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 2 GB in bytes


 
const handleVideoFileChange = (index, e) => {
  const newVideos = [...videos];
  newVideos[index].url = e.target.files[0];
  if (newVideos[index].url && newVideos[index].url.size > MAX_FILE_SIZE) {
    Toastify({
      text: "File size exceeds the 1 GB limit",
      duration: 3000,
      gravity: "top",
      position: 'right',
      background: "#CA1616",
    }).showToast();
    return; // Prevent file from being uploaded
  }
  setVideos(newVideos);
};
const handleLinkChange = (index, e) => {
  const newLinks = [...links];
  if (e.target.name === 'title') {
    newLinks[index].title = e.target.value;
    setLinks(newLinks);
  } else if (e.target.name === 'link') {
    newLinks[index].link = e.target.value;
    setLinks(newLinks);
  }
};

const addVideoField = () => {
  setVideos([...videos, { title: '', url: null }]);
};

// Add a new link field
const addLinkField = () => {
  setLinks([...links, { title: '', link: '' }]);
};

  const handleUpdate = async () => {
    setLoading(true)
   
    try {
      const formData = new FormData();
      formData.append('subject_name', subject_name);
      formData.append('email', teacher_id);
      formData.append('department_id', department_id);
      formData.append('before_offer', before_offer);
      formData.append('after_offer', after_offer);
      formData.append('descr', descr);
      formData.append('img', img);
      formData.append('defaultvideo', defaultvideo);
      formData.append('file_book', book); 
      videos.forEach((video, index) => {
        formData.append(`id`, video.id);  // Append the video ID
        formData.append(`title`, video.title); // Append the title
       
        formData.append(`videoFiles`, video.url);
      });
      links.forEach((link, index) => {
        formData.append(`videoLinks[${index}].id`, link.id);
        formData.append(`videoLinks[${index}].title`, link.title);
        formData.append(`videoLinks[${index}].link`, link.link);
      
      });
  
      const response = await axios.put(
        `https://ba9maacademy.kasselsoft.online/teacher/updatecourseteacher/${updateTeacherId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTeacherCourse((prevAdd) =>
        prevAdd.map((data) =>
          data.id === updateTeacherId ? response.data : data
        )
      );
      Toastify({
        text: "Updated completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
navigate('/teachercourses')
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };
  

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`https://ba9maacademy.kasselsoft.online/courses/videos/${id}`);
      setVideos(videos.filter(video => video.id !== id));
      Toastify({
        text: "Video deleted successfully",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#833988",
    }).showToast();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };
  
  const deleteLink = async (id) => {
    try {
      await axios.delete(`https://ba9maacademy.kasselsoft.online/courses/videos/${id}`);
      setLinks(links.filter(link => link.id !== id));
      Toastify({
        text: "Link deleted successfully",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'lift', // 'left', 'center', 'right'
        backgroundColor: "#833988",
    }).showToast();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };
  
  return (
    <>
      <NavBar title={"المواد"} />
      <div className="container ">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">تعديل مادة</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse" >اسم المادة</p>
            <input type="text" className="input_addcourse"  value={subject_name } onChange={(e)=>setSubjectName(e.target.value)}/>{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">اسم الاستاذ</p>
            <input type="text" className="input_addcourse" id="teacherIdInput" value={teacher_id} onChange={(e)=>setTeacherId(e.target.value)} />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">القسم </p>
            <select
              name="department"
              value={department_id}
              onChange={handleDepartment}
              id="lang"
              className="select_dep"
            >
              <option value="">اختر قسم</option>
              {departmentData.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.title}
                </option>  
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">السعر بعد الخصم </p>
            <input type="text" className="input_addcourse"  value={after_offer} onChange={(e)=>setAfter_offer(e.target.value)}/>{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">السعر قبل الخصم </p>
            <input type="text" className="input_addcourse"     value={before_offer} onChange={(e)=>setBefore_offer(e.target.value)}/>{" "}
          </div>
         
        </div>
        <div className="row mt-4">
        

          <div className="col-lg-4 col-md-6 col-sm-12">
  <p className="input_title_addcourse">كتاب المادة</p>
  <div className="file-input-container">
    <input
      type="file"
      className="choose_file_addcourse"
      onChange={handleBookChange}
    />
    <span className="ps-5 selected_file_addcourse">اختر كتاب</span>
    {book && <span className="selected_file_addcourse">{book.name}</span>}
    {!book && (
      <span className="selected_file_addcourse">No file selected</span>
    )}
  </div>
</div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">صورة المادة</p>
            <div className="file-input-container">
              <input type="file" className="choose_file_addcourse"onChange={handleImg} />{" "}
              <span className="ps-5">اختر صورة </span>
              {img && <span>{img.name}</span>}
              {!img && (
                <span className="selected_file_addcourse">
                  No file selected
                </span>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">فيديو المقدمة</p>
            <div className="file-input-container">
              <input
                type="file"
                
                className="choose_file_addcourse"
                onChange={handelDefaultVideo}
              
              />
              <span className="ps-5 selected_file_addcourse">اختر فيديو</span>
              {defaultvideo && (
                <span className="selected_file_addcourse">
                  {defaultvideo.name}
                </span>
              )}
              {!defaultvideo && (
                <span className="selected_file_addcourse">
                  No file selected
                </span>
              )}
            </div>
          </div>
    

          <div className="col-lg-12 col-md-6 col-sm-12">
            <p className="input_title_addcourse">الوصف</p>
            <textarea
              type="text"
              value={descr} 
              className="input_textarea_addcourse"
              onChange={(e)=>setDescr(e.target.value)}
            ></textarea>
          </div>
        </div>
        <hr />
      </div>
       {/* video_section */}
       <div className="container">
        <div className="row">
          
          <div className="col-lg-8 col-md-6 col-sm-12">
          <div className="title_add_course">اضافة المواضيع</div>
          <div>




            
          <button onClick={addVideoField} className="btn btn_add_video ms-5">إضافة فيديو جديد</button>
 
</div>

{videos.map((video, index) => (
                    <div key={index}>
                       

                        {/* File input for video */}
                        <div className="file_input_addvideo">
                            <button className="btn_choose_video">اختيار ملف</button>
                            <input
                                type="file"
                                className="choose_file_addcourse"
                                onChange={(e) => handleVideoFileChange(index, e)}
                                required
                            />
                            {!video.url && <span className="selected_file_addcourse">No file selected</span>}
                        </div>
                        {video.url && (
        <div className="d-flex justify-content-around mt-3">
          <p className="selected_file_addcourse">{video.title}</p>
          <i
            className="fa-solid fa-square-xmark fa-lg mt-2"
            onClick={() => deleteVideo(video.id)}
            style={{ color: '#944b43' }}
          ></i>
        </div>
      )}
                    </div>
                ))}
 <button onClick={addLinkField} className="btn btn_add_video ms-5">إضافة رابط جديد</button>
                {links.map((link, index) => (
                    <div key={index}>
                        <p className="input_title_addcourse">عنوان الموضوع</p>
                        <input
                            type="text"
                            name="title"
                            className="input_addcourse"
                            value={link.title}
                            onChange={(e) => handleLinkChange(index, e)}
                            placeholder="Enter title"
                            required
                        />
                        <input
                            type="text"
                            name="link"
                            className="input_addcourse"
                            value={link.link}
                            onChange={(e) => handleLinkChange(index, e)}
                            placeholder="Enter link URL"
                            required
                        />
 <i
            className="fa-solid fa-square-xmark fa-lg mt-2"
            onClick={() => deleteLink(link.id)}
            style={{ color: '#944b43' }}
          ></i>
                        
                    </div>
                ))}


<div className="col-lg-12">
<button className="btn_addCourse px-5 py-2  mt-5"onClick={handleUpdate} >  {loading && (
                             <Spinner animation="border" variant="warning"   size="sm" // Small size spinner
                             className="spinner_course"/>
                            )}
                            اضافة مادة </button>
                             {/* Show spinner if loading */}
                             </div>
      </div>
        </div>
      </div>
    </>
  );
}

export default TeacherUpdateCourse;