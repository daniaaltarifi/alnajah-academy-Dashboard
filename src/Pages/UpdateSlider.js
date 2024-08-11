import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
import { useNavigate, useLocation } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import axios from "axios";
function UpdateSlider() {
  const [img, setImg] = useState(null);
  const [slider_img, setSlider_img] = useState(null);

  const [displayInfo, setDisplayInfo] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [title, seTtitle] = useState("");
  const [descr, setDescr] = useState("");
  const [page, setPage] = useState("");
  const [slider_id, setSlider_id] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Check if location.state exists and contains the id
    if (location.state && location.state.page) {
      setSlider_id(location.state.page);
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };
  const handleslider_imgChange = (e) => {
    const file = e.target.files[0];
    setSlider_img(file);
  };
  const handleDeleteimg = () => {
    setImg(null);
  };

  const handleUpdate = async () => {
    if (!slider_id || !slider_img) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("descr", descr);
      formData.append("page", page);
      formData.append("img", img);
      formData.append("slider_img", slider_img);

      const response = await axios.put(
        `http://localhost:8080/sliders/update/${slider_id}`,
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      setSliders((prevAdd) =>
        prevAdd.map((data) => (data.id === slider_id ? response.data : data))
      );
      Toastify({
        text: "Updated completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', 'right'
        backgroundColor: "#833988",
      }).showToast();
      navigate("/slider");
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };
  useEffect(() => {
   
    const inputElement = document.getElementById('page_disabled');
      if (inputElement) {
        inputElement.disabled = true;
      }
  }, []);
  return (
    <>
      <NavBar title={"الصور"} />
      <div className="container ">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">تعديل صورة</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">العنوان</p>
            <input
              type="text"
              className="input_addcourse"
              onChange={(e) => seTtitle(e.target.value)}
            />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">الصفحة</p>
            <input
              type="text"
              className="input_addcourse"
              id="page_disabled"
              value={slider_id}
              onChange={(e) => setSlider_id(e.target.value)}
            />{" "}
          </div>
          {/* <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">اسم المادة</p>
            <input type="text" className="input_addcourse" />{" "}
          </div> */}
          {/* <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">القسم </p>
            <select
              name="department"
              value={slider_id}
              onChange={handleDepartment}
              id="lang"
              className="select_dep"
            >
              <option value="">اختر قسم</option>
              {sliderData.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.title}
                </option>
              ))}
            </select>
          </div> */}
        </div>

        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">الوصف</p>
            <textarea
              type="text"
              className="input_textarea_addcourse"
              onChange={(e) => setDescr(e.target.value)}
            ></textarea>
          </div>
          <div className="col-lg-8 col-md-6 col-sm-12">
            <p className="input_title_addcourse">صورة صغيرة </p>

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
              {!img && (
                <span className="selected_file_addcourse">
                  No file selected
                </span>
              )}
            </div>
            {/* when add video display name of it */}
            {img && (
              <div className="d-flex justify-content-around">
                <p className="selected_file_addcourse">{img.name}</p>
                <i
                  className="fa-solid fa-square-xmark fa-lg mt-2"
                  onClick={handleDeleteimg}
                  style={{ color: "#944b43" }}
                ></i>
              </div>
            )}
            {/* slider img */}
            <p className="input_title_addcourse">صورة كبيرة </p>

            <div className="file_input_addvideo">
              <button className="btn_choose_video">اختيار ملف</button>
              <input
                type="file"
                className="choose_file_addcourse"
                onChange={handleslider_imgChange}
              />
              <span className="ps-5 selected_file_addvideo">
                قم بتحميل الملفات من هنا
              </span>
              {!slider_img && (
                <span className="selected_file_addcourse">
                  No file selected
                </span>
              )}
            </div>
            {slider_img && (
              <div className="d-flex justify-content-around">
                <p className="selected_file_addcourse">{slider_img.name}</p>
                <i
                  className="fa-solid fa-square-xmark fa-lg mt-2"
                  onClick={handleDeleteimg}
                  style={{ color: "#944b43" }}
                ></i>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center ">
            <button className="btn_addCourse px-5 py-2 " onClick={handleUpdate}>
              حفظ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateSlider;
