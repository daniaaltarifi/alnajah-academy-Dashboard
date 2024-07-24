import React, { useState } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
function AddCourse() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
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
              {!selectedFile && <span>No file selected</span>}
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
            <input type="text" className="input_addcourse" />
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
                    className="fa-solid fa-square-xmark fa-lg mt-3"
                    style={{ color: "#944b43" }}
                  ></i>
            </div>
              )}
              {/*End when add video display name of it */}

              {/* <hr /> */}
    <button type="button" className="btn btn_add_video">اضافة</button>
          </div>
        </div>
       
      </div>
    </>
  );
}

export default AddCourse;
