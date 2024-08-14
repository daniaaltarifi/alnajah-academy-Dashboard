import React, { useState,useEffect } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; 
import { useNavigate } from "react-router-dom";
function TeacherAddCourse() {
  const [courseTitle, setCourseTitle] = useState('');
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
const [currentContext, setCurrentContext] = useState(null); // or 'link'
  const [videos, setVideos] = useState([]);
  const [links, setLinks] = useState([]);
const navigate=useNavigate()
useEffect(() => {
  const storedTeacherId = localStorage.getItem('email');
  setTeacherId(storedTeacherId || '');
  const inputElement = document.getElementById('teacherIdInput');
    if (inputElement) {
      inputElement.disabled = true;
    }
}, []);
const handleVideoFileChange = (index, e) => {
  const newVideos = [...videos];
  newVideos[index].url = e.target.files[0];
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

  const handleImg = (e) => {
    const file = e.target.files[0];
    setImg(file);
    console.log("img",img)
    
  };
  const handelDefaultVideo = (e) => {
    const file = e.target.files[0];
    setDefaultVideo(file);
    console.log("default video",defaultvideo)
  };


  const handleDeleteimg = (index) => {
    const newVideos = [...videos];
    newVideos[index] = { ...newVideos[index], url: null };
    setVideos(newVideos);
  };
  
  const handleDeleteSelectedFile = (index) => {
    const newVideos = [...videos];
    newVideos[index] = { ...newVideos[index], url: null };
    setVideos(newVideos);
  };
  
  const handleDepartment = (e) => {
    const selectedDepartmentId = e.target.value;
    setDepartment_id(selectedDepartmentId);
  };
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/department");
        setDepartmentData(response.data);
        console.log(departmentData)
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);
 
  const handlePost = async () => {
    if (!subject_name || !teacher_id || !department_id || !before_offer || !after_offer || !descr || !img || !displayInfo || !defaultvideo) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
  
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
      videos.forEach((video, index) => {
        formData.append('url', video.url);
        formData.append('title', video.title);
      });
      links.forEach((link, index) => {
        formData.append('link', link.link);
        formData.append('title', link.title);
      });
      console.log("link", links);
  
      const response = await axios.post(
        "http://localhost:8080/teacher/addcourseteacher",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("displayInfo", displayInfo);

      setTeacherCourse(response.data);
      Toastify({
        text: "Added completely",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#833988",
      }).showToast();
      navigate('/teachercourses');
    } catch (error) {
      console.log(`Error fetching post data: ${error}`);
      console.log("subject_name", subject_name);
      console.log("teacher_id", teacher_id);
      console.log("department_id", department_id);
      console.log("before_offer", before_offer);
      console.log("after_offer", after_offer);
      console.log("descr", descr);
      console.log("img", img);
      console.log("displayInfo", displayInfo);
      console.log("link", links);
      console.log("defaultvideo", defaultvideo);

    }
  };
  
  

  return (
    <>
      <NavBar title={"المواد"} />
      <div className="container ">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">اضافة مادة</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse" >اسم المادة</p>
            <input type="text" className="input_addcourse" onChange={(e)=>setSubjectName(e.target.value)}/>{" "}
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
            <input type="text" className="input_addcourse" onChange={(e)=>setAfter_offer(e.target.value)}/>{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">السعر قبل الخصم </p>
            <input type="text" className="input_addcourse" onChange={(e)=>setBefore_offer(e.target.value)}/>{" "}
          </div>
         
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">الوصف</p>
            <textarea
              type="text"
              className="input_textarea_addcourse"
              onChange={(e)=>setDescr(e.target.value)}
            ></textarea>
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
        </div>
        <hr />
      </div>

      {/* video_section */}
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12"></div>
          <div className="col-lg-8 col-md-6 col-sm-12">
          <div className="title_add_course">اضافة المواضيع</div>
          <div>
  <button className="btn btn_add_video ms-5" onClick={() => setCurrentContext('video')}>Video</button>
  <button className="btn btn_add_video " onClick={() => setCurrentContext('link')}>Link</button>
</div>
          {currentContext === 'video' && videos.map((video, index) => (
          <div key={index}>
            <p className="input_title_addcourse">عنوان الموضوع</p>
            <input
              type="text"
              className="input_addcourse"
              value={video.title}
              onChange={(e) => {
                const updatedVideos = [...videos];
                updatedVideos[index] = { ...updatedVideos[index], title: e.target.value };
                setVideos(updatedVideos);
              }}
              placeholder="Enter title"
              required
            />
            <div className="file_input_addvideo">
              <button className="btn_choose_video">اختيار ملف</button>
              <input
                type="file"
                className="choose_file_addcourse"
                onChange={(e) => handleVideoFileChange(index, e)}
                required
              />
              <span className="ps-5 selected_file_addvideo">قم بتحميل الملفات من هنا</span>
              {!video.url && <span className="selected_file_addcourse">No file selected</span>}
            </div>
            {video.url && (
              <div className="d-flex justify-content-around">
                <p className="selected_file_addcourse">{video.url.name}</p>
                <i
                  className="fa-solid fa-square-xmark fa-lg mt-2"
                  onClick={() => handleDeleteimg(index, 'video')}
                  style={{ color: '#944b43' }}
                ></i>
              </div>
            )}
          </div>
        ))}

        {currentContext === 'link' && links.map((link, index) => (
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
          </div>
        ))}

        <button
          type="button"
          className="btn btn_add_video float-start"
          onClick={currentContext === 'video' ? addVideoField : addLinkField}
        >
          {currentContext === 'video' ? 'Add Video' : 'Add Link'}
        </button>
          <button className="btn_addCourse px-5 py-2  mt-5"onClick={handlePost}> اضافة مادة </button>
      </div>
          </div>
        </div>
    </>
  );
}

export default TeacherAddCourse;
