import React, { useState } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
function AddFaq() {
  const [question, setQuestion] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayInfo, setDisplayInfo] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteSelectedFile=()=>{
    setSelectedFile(null);
  }
    const handleDeleteCourse = (id) => {
    // Delete the selected course by its ID
    const updatedDisplayInfo = displayInfo.filter(course => course.id !== id);
    setDisplayInfo(updatedDisplayInfo);
    console.log(displayInfo)
  };
  return (
    <>
      <NavBar title={"الاسئلة المتكررة"} />
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">تعديل سؤال</div>
          </div>
        </div>
        <div className="row mt-4  d-flex justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">السؤال</p>
            <input type="text" className="input_addcourse" />{" "}
          </div>
        
        
        </div>
      
        <div className="row mt-4  d-flex justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="input_title_addcourse">الجواب</p>
          <input type="text" className="input_addcourse" />{" "}
          </div>
         
          <div className=" d-flex justify-content-center align-items-center ">

        <button className="btn_addCourse px-5 py-2 mt-5 ">حفظ</button>
          </div>
     
        </div>

      </div>

    
    </>
  );
}

export default AddFaq;
