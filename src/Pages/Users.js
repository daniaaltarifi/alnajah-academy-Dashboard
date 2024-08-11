import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../Css/search.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student"); // default role
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [users, setUsers] = useState([]);
  const validateName = (name) => {
    if (name.trim() === "") {
      setNameError("الرجاء أدخال الاسم !");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validateEmail = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("الرجاء ادخال بريد الكتروني صحيح");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("الرجاء ادخال كلمة مرور قوية");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("كلمة المرور غير متطابقة");
      return;
    } else {
      setConfirmPasswordError("");
    }

    try {
      const res = await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        password,
        role,
        confirmPassword,
      });
      setUsers(res.data);
      // Store authentication data in local storage
      localStorage.setItem("auth", res.data.token);
      localStorage.setItem("name", name);
      localStorage.setItem("id", res.data.id);
      window.location.reload();

      handleClose();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getusers");
        const usersdata=response.data;
        const student = usersdata.filter(user => user.role === 'student');

        setUsers(student);
      } catch (error) {
        console.error("Error fetching users :", error);
      }
    };
fetchUsers()
  },[])
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleInputChange = (event) => {
      const query = event.target.value;
      setSearchQuery(query);

      // Filter blogs based on search query
      const filteredResults = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
    };
    const dataToDisplay = searchQuery ? searchResults : users;

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
                اضف طالب{" "}
              </Button>
              {/* </Link> */}
            </div>
            {/* Modal Add student */}
            <Modal show={show} onHide={handleClose} dir="rtl">
              <Modal.Title className="modal_title">اضافة طالب</Modal.Title>

              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text_field ">اسم الطالب</Form.Label>
                    <Form.Control
                      type="text"
                      className={`input_filed_modal  ${nameError ? "error" : ""}`}
                      onBlur={() => validateName(name)}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                   {nameError && <p className="error_message">{nameError}</p>}

                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text_field text-center">
                      الأيميل{" "}
                    </Form.Label>
                    <Form.Control
                      type="email"
                      className={`input_filed_modal ${emailError ? "error" : ""}`}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => validateEmail(email)}
                      value={email}
                    />
                     {emailError && (
                    <span className="error_message">{emailError}</span>
                  )}
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
                      className={`input_filed_modal ${passwordError ? "error" : ""}`}
                      onBlur={() => validatePassword(password)}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                     {passwordError && (
                    <p className="error_message">{passwordError}</p>
                  )}
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
                      className={`input_filed_modal ${
                      confirmPasswordError ? "error" : ""
                    }`}
                      value={confirmPassword}

                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                     {confirmPasswordError && (
                    <p className="error_message">{confirmPasswordError}</p>
                  )}
                  </Form.Group>{" "}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
                <Button onClick={handleRegister} className="buy_department_btn">
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
                    onChange={handleInputChange}
                />
                <a
                  className="btn btn-s purple_btn search_btn_blog"
                    onChange={handleInputChange}
                >
                  بحث{" "}
                </a>
               
              </div>

              {/* End search */}
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Table striped hover>
                <thead>
                  <tr className="table_head_cardprice">
                    <th className="desc_table_cardprice">اسم الطالب </th>
                    <th className="desc_table_cardprice"> الايميل</th>
                  </tr>
                </thead>
                <tbody>
                  {dataToDisplay.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name} </td>
                      <td> {user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Users;
