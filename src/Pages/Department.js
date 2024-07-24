import React, { useState } from "react";
import NavBar from "../component/NavBar";
import "../Css/department.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DeletePopUp from "../component/DeletePopUp";
function Department() {
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [titlePopup, setTitlePopup] = useState(""); 
  const [descriptionPopup, setDescriptionPopup] = useState(""); 
  const length = [
    {
      id: 1,
      title: "MSDDDOO3",
      numLength: "2",
    },
    {
      id: 2,
      title: "MSDDDOO3",
      numLength: "2",
    },
    {
      id: 3,
      title: "MSDDDOO3",
      numLength: "2",
    },
    {
      id: 4,
      title: "MSDDDOO3",
      numLength: "2",
    },
  ];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOpenModal = () => {
    setSmShow(true);
    setTitlePopup("حذف قسم"); // Set your modal title dynamically
    setDescriptionPopup("هل أنت متأكد من حذف هذا القسم ؟"); // Set your modal description dynamically
  };

  const handleCloseModal = () => {
    setSmShow(false);
  };
  return (
    <>
      <NavBar title="الأقسام" />
      <section className="margin_section">
        <Button onClick={handleShow} className="add_btn">
          <span className="plus_icon">+</span>
          اضف قسم{" "}
        </Button>
        <Modal show={show} onHide={handleClose} dir="rtl">
          <Modal.Title className="modal_title">اضافة قسم</Modal.Title>

          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="text_field "> عنوان القسم </Form.Label>
                <Form.Control type="text" className="input_filed_modal" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="text_field text-center">
                  الكوبون{" "}
                </Form.Label>
                <Form.Control type="text" className="input_filed_modal" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
            <Button onClick={handleClose} className="buy_department_btn">
              اضافة{" "}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container-fluid ">
          <div className="row d-flex justify-content-center align-items-center">
            {length.map((card, id) => (
              <div className="col-lg-3 col-md-6 col-sm-12 col_depa" key={id}>
                <div className=" info_cont_depa">
                  <div className="d-flex ">
                    <img
                      src={require("../assets/department.png")}
                      alt="department"
                      className="img-fluid icon_department"
                    />

                    <p className="coupoun_department">{card.title}</p>
                  </div>
                  <div className="d-flex">
                    <p className="info_department"> 20 مادة </p>
                    <p className="info_department"> 2 طالب </p>
                  </div>
                </div>

                <p className="title_depa">شرح مواد توجيهي جيل 2006</p>
                <div className="btn_handle_cont">
                  <button className="btn_handle_depa">
                    <i
                      className="fa-regular fa-pen-to-square"
                      style={{ color: "#fff" }}
                    ></i>
                  </button>
                  <button className="btn_handle_depa"  onClick={handleOpenModal}  >
                  <i className="fa-regular fa-trash-can"style={{ color: "#fff" }}
                  ></i>
                  </button>
               
 
      <DeletePopUp  show={smShow}
        onHide={handleCloseModal}
        title={titlePopup}
        description={descriptionPopup} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Department;
