import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import "../Css/department.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DeletePopUp from "../component/DeletePopUp";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; 
import axios from "axios";
function Department() {
  const [showPost, setShowPost] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [titlePopup, setTitlePopup] = useState("");
  const [descriptionPopup, setDescriptionPopup] = useState("");
  const [title, setTitle] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  const [currentId, setCurrentId] = useState(null); 
  const [del, setDel] = useState([]);

  const handleClose = () => {
    setShowPost(false);
    setShowUpdate(false);
  };
  const handleShow = () => setShowPost(true);
  const handleShowForUpdate = (id) => {
    setCurrentId(id); // Set the current ID
    setShowUpdate(true); // Show the modal
  };

  const handleCloseModal = () => {
    setSmShow(false);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/department/");
      const data = response.data;
      setDepartmentData(data);
    } catch (error) {
      console.log(`Error getting data from frontend: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  });
  const handlePost = async () => {
    if (!title) {
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
      const response = await axios.post(
        "http://localhost:8080/department/add",
        { title }
      );
      setDepartmentData(response.data);
      Toastify({
        text: "Added completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', 'right'
        backgroundColor: "#F57D20",
      }).showToast();

      handleClose();
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };
  const handleUpdate = async () => {
    if (!title) {
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
        `http://localhost:8080/department/update/${currentId}`, // Use currentId here
        { title }
      );
      // Update the department data in state
      setDepartmentData((prevAdd) =>
        prevAdd.map((data) => (data.id === currentId ? response.data : data))
      );

      Toastify({
        text: "Updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#F57D20",
      }).showToast();

      handleClose(); // Close the modal after successful update
    } catch (error) {
      console.log(`Error updating data: ${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/department/delete/${currentId}`
      );

      // Remove the deleted department from state
      setDepartmentData((prevData) =>
        prevData.filter((data) => data.id !== currentId)
      );

      Toastify({
        text: "Department deleted successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#F57D20",
      }).showToast();

      handleCloseModal(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleOpenModal = (id) => {
    setCurrentId(id);
    setTitlePopup("حذف قسم"); // Set your modal title dynamically
    setDescriptionPopup("هل أنت متأكد من حذف هذا القسم ؟"); // Set your modal description dynamically
    setSmShow(true);
  };
  return (
    <>
      <NavBar title="الأقسام" />
      <section className="margin_section">
        <Button onClick={handleShow} className="add_btn">
          <span className="plus_icon">+</span>
          اضف قسم{" "}
        </Button>
        <Modal show={showPost} onHide={handleClose} dir="rtl">
          <Modal.Title className="modal_title">اضافة قسم</Modal.Title>

          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="text_field "> عنوان القسم </Form.Label>
                <Form.Control
                  type="text"
                  className="input_filed_modal"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
            <Button onClick={handlePost} className="buy_department_btn">
              اضافة{" "}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container-fluid ">
          <div className="row d-flex justify-content-center align-items-center">
            {Array.isArray(departmentData) &&departmentData.map((card, id) => (
              <div className="col-lg-3 col-md-6 col-sm-12 col_depa" key={card.id}>
                <div className=" info_cont_depa">
                  <div className="d-flex ">
                    <img
                      src={require("../assets/department.png")}
                      alt="department"
                      className="img-fluid icon_department"
                    />

                    <p className="coupoun_department">{card.coupon}</p>
                  </div>
                  <div className="d-flex">
                    <p className="info_department"> 20 مادة </p>
                    <p className="info_department"> 2 طالب </p>
                  </div>
                </div>

                <p className="title_depa">{card.title}</p>
                <div className="btn_handle_cont">
                  <button
                    className="btn_handle_depa"
                    onClick={() => handleShowForUpdate(card.id)}
                  >
                    <i
                      className="fa-regular fa-pen-to-square"
                      style={{ color: "#fff" }}
                    ></i>
                  </button>
                  <button
                    className="btn_handle_depa"
                    onClick={() => handleOpenModal(card.id)}
                  >
                    <i
                      className="fa-regular fa-trash-can"
                      style={{ color: "#fff" }}
                    ></i>
                  </button>

                  <DeletePopUp
                    show={smShow}
                    onHide={handleCloseModal}
                    title={titlePopup}
                    description={descriptionPopup}
                    handleDelete={handleDelete}
                  />
                </div>
                <Modal show={showUpdate} onHide={handleClose} dir="rtl">
                  <Modal.Title className="modal_title">تعديل قسم</Modal.Title>

                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="text_field ">
                          {" "}
                          عنوان القسم{" "}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="input_filed_modal"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
                    <Button
                      onClick={handleUpdate}
                      className="buy_department_btn"
                    >
                      تعديل{" "}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Department;
