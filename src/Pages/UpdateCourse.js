import React, { useState } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
import axios from "axios";

function UpdateCourse() {
  const [courseTitle, setCourseTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayInfo, setDisplayInfo] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleAddButtonClick = () => {
    if (courseTitle && selectedFile) {
      setDisplayInfo([
        ...displayInfo,
        {
          title: courseTitle,
          fileName: selectedFile.name // Store the original file name
        }
      ]);
      // Clear the form fields after adding
      setCourseTitle('');
      setSelectedFile(null);
    }
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
      <NavBar title={"المواد"} />
      <div className="container ">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">تعديل مادة</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">اسم المادة</p>
            <input type="text" className="input_addcourse" />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">اسم الاستاذ</p>
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
            </select>
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
            <p className="input_title_addcourse">السعر بعد الخصم </p>
            <input type="text" className="input_addcourse" />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">السعر قبل الخصم </p>
            <input type="text" className="input_addcourse" />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">الكوبون </p>
            <input type="text" className="input_addcourse" />{" "}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">الوصف</p>
            <textarea
              type="text"
              className="input_textarea_addcourse"
            ></textarea>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">صورة المادة</p>
            <div className="file-input-container">
              <input type="file" className="choose_file_addcourse" />{" "}
              <span className="ps-5">اختر صورة </span>
              {selectedFile && <span>{selectedFile.name}</span>}
              {!selectedFile && (
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
                onChange={handleFileChange}
              />
              <span className="ps-5 selected_file_addcourse">اختر فيديو</span>
              {selectedFile && (
                <span className="selected_file_addcourse">
                  {selectedFile.name}
                </span>
              )}
              {!selectedFile && (
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
            <p className="input_title_addcourse">عنوان الموضوع </p>
            <input
              type="text"
              className="input_addcourse"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
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

            <button
              type="button"
              className="btn btn_add_video float-start"
              onClick={handleAddButtonClick}
            >
              اضافة
            </button>

            <hr />
            <div className="entries_container">
        {displayInfo.map((entry, index) => (
          <div key={index} className="entry">
            <h2>{entry.title}</h2>
            <div className="d-flex justify-content-between">
                <p className="selected_file_addcourse">{entry.fileName}</p>
                <i
                  className="fa-solid fa-square-xmark fa-lg mt-2"onClick={() => handleDeleteCourse(entry.id)}
                  style={{ color: "#944b43" }}
                ></i>
              </div>
          </div>
        ))}
      </div>
          <button className="btn_addCourse px-5 py-2 ">حفظ</button>
          </div>
        </div>
      </div>
    </>
  );
}

 export default UpdateCourse;

