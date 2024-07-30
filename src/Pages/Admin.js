import React, { useState } from "react";
import NavBar from "../component/NavBar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../Css/search.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
function Admin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/updateteacher");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleInputChange = (event) => {
  //     const query = event.target.value;
  //     setSearchQuery(query);

  //     // Filter blogs based on search query
  //     const filteredResults = blogs.filter((blog) =>
  //       blog.title.toLowerCase().includes(query.toLowerCase())
  //     );

  //     setSearchResults(filteredResults);
  //   };
  return (
    <>
      <NavBar title={"المسجلين"} />
      <section classNameName="margin_section">
        <div className="container ">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 ">
              {/* <Link to="/addteacher"> */}
              <Button className="add_btn" onClick={handleShow}>
                <span className="plus_icon">+</span>
                اضف ادمن{" "}
              </Button>
              {/* </Link> */}
            </div>
            {/* Modal Add student */}
            <Modal show={show} onHide={handleClose} dir="rtl">
              <Modal.Title className="modal_title">اضافة ادمن</Modal.Title>

              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text_field ">اسم الادمن</Form.Label>
                    <Form.Control type="text" className="input_filed_modal" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text_field text-center">
                      الأيميل{" "}
                    </Form.Label>
                    <Form.Control type="email" className="input_filed_modal" />
                  </Form.Group>{" "}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text_field text-center">
                      كلمة السر{" "}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      className="input_filed_modal"
                    />
                  </Form.Group>{" "}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text_field text-center">
                      تأكيد كلمة السر{" "}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      className="input_filed_modal"
                    />
                  </Form.Group>{" "}
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
            {/* End Modal Add student */}
            {/* search */}
            <div className="col-lg-6 col-md-12 col-sm-12 ">
              <div className="navbar__search">
                <span>
                  <i
                    className="fa-solid fa-magnifying-glass fa-sm"
                    style={{ color: "#833988" }}
                  ></i>{" "}
                </span>
                <input
                  type="text"
                  placeholder="ابحث عن "
                  value={searchQuery}
                  className="search_blog"
                  //   onChange={handleInputChange}
                />
                <a
                  className="btn btn-s purple_btn search_btn_blog"
                  //   onChange={handleInputChange}
                >
                  بحث{" "}
                </a>
                {searchQuery && (
                  <ul className="search_dropdown">
                    {searchResults.length > 0 ? (
                      searchResults.map((blog) => (
                        <li
                          key={blog.id}
                          onClick={() => {
                            // navigate(`/blogdetails/${blog.id}`);
                            window.scrollTo(0, 0);
                          }}
                        >
                          <img
                            src={`http://localhost:8080/` + blog.img}
                            alt={blog.title}
                          />
                          {blog.title}
                        </li>
                      ))
                    ) : (
                      <li>No blogs found.</li>
                    )}
                  </ul>
                )}
              </div>

              {/* End search */}
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Table striped hover>
                <thead>
                  <tr className="table_head_cardprice">
                    <th className="desc_table_cardprice">اسم الادمن </th>
                    <th className="desc_table_cardprice"> الايميل</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>اللغة الأنجليزية </td>
                    <td> محمد أحمد</td>
                  </tr>
                  <tr>
                    <td>اللغة الأنجليزية </td>
                    <td> محمد أحمد</td>
                  </tr>
                  <tr>
                    <td>اللغة الأنجليزية </td>
                    <td> محمد أحمد</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Admin;
