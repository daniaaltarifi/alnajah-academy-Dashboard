import React, { useState } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
function UpdateLibrary() {
  const [teacherName, setTeacherName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayInfo, setDisplayInfo] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteSelectedFile=()=>{
    setSelectedFile(null);
  }
  
  return (
    <>
      <NavBar title={"مكتبة بصمة"} />
      <div className="container ">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">تعديل كتاب</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">اسم الكتاب</p>
            <input type="text" className="input_addcourse" />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">اسم الكاتب</p>
            <input type="text" className="input_addcourse" />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">القسم </p>
            <select
              name="department"
              // value={selectedDepartment}
              // onChange={handleDepartment}
              id="lang"
              className="select_dep"
            >
              <option value="">اختر قسم</option>
              {/* {department.map((dep) => ( */}
              <option>{/* {dep.title} */}department</option>
              {/* ))} */}
            </select>{" "}
          </div>
        </div>
      
        <div className="row mt-4">
        <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">عدد الصفحات</p>
            <input type="text" className="input_addcourse" />{" "}
          </div>
          <div className="col-lg-8 col-md-6 col-sm-12">
          <p className="input_title_addcourse">رفع الكتاب </p>

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

        <button className="btn_addCourse px-5 py-2 mt-5">حفظ</button>
          </div>
     
        </div>

      </div>

    
    </>
  );
}

export default UpdateLibrary;
