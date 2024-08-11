import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
function UpdateCoupon() {
  const navigate = useNavigate();
  const location = useLocation();
  const [couponId, setCouponId] = useState("");
  const [coupon_code, setCoupon_code] = useState("");
  const [ans, setAns] = useState("");
  const [coupons, setCoupons] = useState([]);
  useEffect(() => {
    // Check if location.state exists and contains the id
    if (location.state && location.state.id) {
      setCouponId(location.state.id);
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);
  const handleUpdate = async () => {
    if (!coupon_code) {
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
        `http://localhost:8080/coupon/update/${couponId}`, // Use couponId here
        { coupon_code, ans }
      );
      // Update the department data in state
      setCoupons((prevAdd) =>
        prevAdd.map((data) => (data.id === couponId ? response.data : data))
      );

      Toastify({
        text: "Updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#F57D20",
      }).showToast();
      navigate("/coupon");
    } catch (error) {
      console.log(`Error updating data: ${error}`);
    }
  };
  return (
    <>
      <NavBar title={"الكوبونات"} />
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">تعديل كوبون</div>
          </div>
        </div>
        <div className="row mt-4  d-flex justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">رمز الكوبون</p>
            <input
              type="text"
              className="input_addcourse"
              onChange={(e) => setCoupon_code(e.target.value)}
            />{" "}
          </div>
        </div>

        <div className="row mt-4  d-flex justify-content-center align-items-center">
         

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

export default UpdateCoupon;
