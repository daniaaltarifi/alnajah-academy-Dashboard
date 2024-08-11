import React, { useState ,useEffect} from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
import { useNavigate,useLocation } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; 
import axios from "axios";
function UpdateAbout() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayInfo, setDisplayInfo] = useState([]);
 
  const [about, setAbout] = useState([])
const [title, setTitle] = useState("")
const [descr, setDescr] = useState("")
const [about_id, setAbout_id] = useState('');
const location = useLocation();

useEffect(() => {
  // Check if location.state exists and contains the id
  if (location.state && location.state.id) {
    setAbout_id(location.state.id);
  } else {
    console.warn('No ID found in location.state');
  }
}, [location.state]);
const navigate = useNavigate()
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteSelectedFile=()=>{
    setSelectedFile(null);
  }

 
  const handleUpdate = async () => {

    if (!title || !descr || !selectedFile) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('descr', descr);
      formData.append('img', selectedFile);

      const response = await axios.put(
        `http://localhost:8080/about/update/${about_id}`,
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      setAbout((prevAdd) =>
        prevAdd.map((data) =>
          data.id === about_id ? response.data : data
        )
      );
      Toastify({
        text: "Updated completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#833988",
      }).showToast();
navigate('/about')
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };
  return (
    <>
      <NavBar title={"عن بصمة"} />
      <div className="container ">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">تعديل عن بصمة</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">العنوان</p>
            <input type="text" className="input_addcourse" onChange={(e)=>setTitle(e.target.value)}/>{" "}
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
          <div className="col-lg-8 col-md-6 col-sm-12">
          <p className="input_title_addcourse">الصورة  </p>

          <div className="file_input_addvideo">
              <button className="btn_choose_video">اختيار ملف</button>
              <input
                type="file"
                className="choose_file_addcourse"
                onChange={handleFileChange}
              />
              <span className="ps-5 selected_file_addvideo">
                قم بتحميل الملفات من هنا
              </span>
              {!selectedFile && (
                <span className="selected_file_addcourse">
                  No file selected
                </span>
              )}
            </div>
            {/* when add video display name of it */}
            {selectedFile && (
              <div className="d-flex justify-content-around">
                <p className="selected_file_addcourse">{selectedFile.name}</p>
                <i
                  className="fa-solid fa-square-xmark fa-lg mt-2"onClick={handleDeleteSelectedFile}
                  style={{ color: "#944b43" }}
                ></i>
              </div>
            )}
            {/*End when add video display name of it */}
          </div>
          <div className="d-flex justify-content-center align-items-center ">

        <button className="btn_addCourse px-5 py-2 " onClick={handleUpdate}>حفظ</button>
          </div>
     
        </div>

      </div>

    
    </>
  );
}

export default UpdateAbout;
