import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import "../Css/order.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
function Order() {
  const [activeButton, setActiveButton] = useState("btn1");
  const [departmentOrder, setDepartmentOrder] = useState([]);
  const [courseOrder, setCourseOrder] = useState([]);
  const [courseUsers, setCourseUsers] = useState([]);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  // Handler function to change the color of the clicked button
  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  // Function to determine button color
  const getButtonColor = (buttonId) => {
    return activeButton === buttonId ? "#833988" : "#F57D20";
  };
  const fetchDepartmentOrder = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/getcourseusers");
      const data = response.data;
      // Filter to only include unapproved payments
      const unapprovedPayments = data.filter(payment => payment.department_id !== null);
      setDepartmentOrder(unapprovedPayments);
    } catch (error) {
      console.log(`Error getting data from backend: ${error}`);
    }
  };
  const fetchCourseOrder = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/getcourseusers");
      const data = response.data;
      // Filter to only include unapproved payments
      const unapprovedPayments = data.filter(payment => payment.course_id !== null);
      setCourseOrder(unapprovedPayments);
    } catch (error) {
      console.log(`Error getting data from backend: ${error}`);
    }
  };
  useEffect(() => {
    fetchDepartmentOrder();
    fetchCourseOrder()
  }, []);
    const handleApproved = async (id) => {
      try {
        await axios.put(`http://localhost:8080/api/payments/${id}/approve`, { payment_status: 'approved' });
        // Update payment status in the local state
        setDepartmentOrder((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === id ? { ...payment, payment_status: 'approved' } : payment
          )
        );
        await fetchDepartmentOrder();
        await fetchCourseOrder();

      } catch (error) {
        console.error('Error updating payment status:', error);
      }

  };
  const handleDeleteCourseUsers = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete/payments/${id}`);
      setDepartmentOrder((prevData) => prevData.filter((data) => data.payment_id !== id));
      setCourseOrder((prevData) => prevData.filter((data) => data.payment_id !== id));
      Toastify({
        text: "Order deleted successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#F57D20",
      }).showToast();

    } catch (error) {
      console.error("Error deleting department:", error);
    }
  }; 
  useEffect(() => {
    fetchDepartmentOrder();
  }, []);
  return (
    <>
      <NavBar title={"طلبات الشراء "} />
      <div className="container text-center">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12  mb-4">
            <div className="d-flex cont_btn_order">
              <button
                className="courses_dep px-5 py-4 background_btn"
                style={{ backgroundColor: getButtonColor("btn1") }}
                onClick={() => handleClick("btn1")}
              >
                المواد
              </button>
              <button
                className="courses_dep px-5 py-4  background_btn"
                style={{ backgroundColor: getButtonColor("btn2") }}
                onClick={() => handleClick("btn2")}
              >
                الاقسام
              </button>
            </div>
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12"></div>
        </div>
        <div className="row">
          {activeButton === "btn1" ? (
            <Table striped hover>
              <thead>
                <tr className="table_head_cardprice">
                  <th className="desc_table_cardprice">اسم الطالب</th>
                  <th className="desc_table_cardprice">الايميل</th>
                  <th className="desc_table_cardprice">العنوان</th>
                  <th className="desc_table_cardprice">رقم الهاتف</th>
                  <th className="desc_table_cardprice">اسم المادة</th>
                  <th className="desc_table_cardprice">الاجراء</th>
                </tr>
              </thead>
              <tbody>
              {courseOrder.map((course) => (
                  <tr key={course.id}>
                    <td>{course.student_name}</td>
                    <td>{course.email}</td>
                    <td>{course.address}</td>
                    <td>{course.phone}</td>
                    <td>{course.subject_name}</td>
                    <td>{course.payment_status}</td>
                  
                    <td>
                       {course.payment_status !== "approved" && (
                        <div>

                        <button  type="button"
                        className="btn btn-success ms-2" onClick={() => handleApproved(course.payment_id
                        )}>
                          Accept
                        </button>
                         <button type="button" className="btn btn-danger" onClick={()=>handleDeleteCourseUsers(course.payment_id)} 
                         >
                           رفض
                         </button>
                        </div>

                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : activeButton === "btn2" ? (
            <Table striped hover>
              <thead>
                <tr className="table_head_cardprice">
                  <th className="desc_table_cardprice">اسم الطالب</th>
                  <th className="desc_table_cardprice">الايميل</th>
                  <th className="desc_table_cardprice">العنوان</th>
                  <th className="desc_table_cardprice">رقم الهاتف</th>
                  <th className="desc_table_cardprice">القسم</th>
                  <th className="desc_table_cardprice">حالة الطلب</th>

                  <th className="desc_table_cardprice">الاجراء</th>
                </tr>
              </thead>
              <tbody>
                {departmentOrder.map((department) => (
                  <tr key={department.id}>
                    <td>{department.student_name}</td>
                    <td>{department.email}</td>
                    <td>{department.address}</td>
                    <td>{department.phone}</td>
                    <td>{department.department_name}</td>
                    <td>{department.payment_status}</td>
                  
                    <td>
                       {department.payment_status !== "approved" && (
                        <div>

                        <button  type="button"
                        className="btn btn-success ms-2" onClick={() => handleApproved(department.payment_id
                        )}>
                          Accept
                        </button>
                         <button type="button" className="btn btn-danger" onClick={()=>handleDeleteCourseUsers(department.payment_id)} 
                         >
                           رفض
                         </button>
                        </div>

                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Order;
