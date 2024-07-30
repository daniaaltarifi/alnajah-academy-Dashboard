import React, { useState } from "react";
import NavBar from "../component/NavBar";
import "../Css/blog.css";
function AddBlog() {
  const [blogName, setBlogName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayInfo, setDisplayInfo] = useState([
    { id: 1, title: "Course 1" },
    // More courses
  ]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteSelectedFile = () => {
    setSelectedFile(null);
  };
  const handleAddButtonClick = () => {
    if (blogName) {
      // Add the new tag to the existing list
      setDisplayInfo((prevInfo) => [
        ...prevInfo,
        {
          title: blogName,
        },
      ]);

      // Clear the input field after adding
      setBlogName("");
    }
  };
  const handleDeleteCourse = (id) => {
    // Filter out the course with the specified ID
    const updatedDisplayInfo = displayInfo.filter((course) => course.id !== id);

    // Update the state with the new array
    setDisplayInfo(updatedDisplayInfo);
    console.log(" Display Info:", displayInfo);

    // Logging to verify
    console.log("Deleted entry ID:", id);
    console.log("Updated Display Info:", updatedDisplayInfo);
  };

  return (
    <>
      <NavBar title={"مدونة بصمة"} />
      <div className="container ">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">اضافة مقال</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">عنوان المقال</p>
            <input type="text" className="input_addcourse" />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">صاحب المقال</p>
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
            <p className="input_title_addcourse">الوصف</p>
            <textarea
              type="text"
              className="input_textarea_addcourse"
            ></textarea>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">اضف تاغ</p>
            <div className="input-wrapper">
              <input
                type="text"
                className="input_addtag"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
              />
              <button
                type="button"
                className="btn_add_tag"
                onClick={handleAddButtonClick}
              >
                اضافة
              </button>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="entries_container d-flex flex-wrap justify-content-evenly">
              {displayInfo.map((entry) => (
                <div key={entry.id} className="entry">
                  <div className="d-flex justify-content-between">
                    <p className="tag_data">
                      {entry.title}
                      <i
                        className="fa-solid fa-square-xmark fa-lg mt-2"
                        onClick={() => handleDeleteCourse(entry.id)}
                        style={{ color: "#944b43" }}
                      ></i>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12"></div>
            <div className="col-lg-8 col-md-6 col-sm-12">
              <p className="input_title_addcourse">اضف صورة </p>

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
                    className="fa-solid fa-square-xmark fa-lg mt-2"
                    onClick={handleDeleteSelectedFile}
                    style={{ color: "#944b43" }}
                  ></i>
                </div>
              )}
              {/*End when add video display name of it */}
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center ">
            <button className="btn_addCourse px-5 py-2 mt-4 ">اضافة</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBlog;
