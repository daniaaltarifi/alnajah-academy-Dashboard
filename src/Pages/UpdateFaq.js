import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
function AddFaq() {
  const navigate = useNavigate();
  const location = useLocation();
  const [faqId, setFaqId] = useState("");
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");
  const [faq, setFaq] = useState([]);
  useEffect(() => {
    // Check if location.state exists and contains the id
    if (location.state && location.state.id) {
      setFaqId(location.state.id);
      console.log("new" + faqId);
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);
  const handleUpdate = async () => {
    if (!ques || !ans) {
      Toastify({
        text: "Please Fill All Fields",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/faq/update/${faqId}`, // Use faqId here
        { ques, ans }
      );
      console.log(response.data);

      // Update the department data in state
      setFaq((prevAdd) =>
        prevAdd.map((data) => (data.id === faqId ? response.data : data))
      );

      Toastify({
        text: "Updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#F57D20",
      }).showToast();
      navigate("/faq");
    } catch (error) {
      console.log(`Error updating data: ${error}`);
    }
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
            <input
              type="text"
              className="input_addcourse"
              onChange={(e) => setQues(e.target.value)}
            />{" "}
          </div>
        </div>

        <div className="row mt-4  d-flex justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">الجواب</p>
            <input
              type="text"
              className="input_addcourse"
              onChange={(e) => setAns(e.target.value)}
            />{" "}
          </div>

          <div className=" d-flex justify-content-center align-items-center ">
            <button
              className="btn_addCourse px-5 py-2 mt-5 "
              onClick={handleUpdate}
            >
              حفظ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFaq;
