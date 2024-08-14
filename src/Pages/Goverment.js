import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../Css/search.css";
import Table from "react-bootstrap/Table";
import DeletePopUp from "../component/DeletePopUp";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; 
function Goverment() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [titlePopup, setTitlePopup] = useState(""); // State for modal title
  const [descriptionPopup, setDescriptionPopup] = useState("");
  const [goverment, setGoverment] = useState([]);
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(null); 

  const handleOpenModal = (id) => {
    setCurrentId(id);
    setSmShow(true);
    setTitlePopup("حذف محافظة"); // Set your modal title dynamically
    setDescriptionPopup("هل أنت متأكد من حذف هذه المحافظة ؟"); // Set your modal description dynamically
  };

  const handleCloseModal = () => {
    setSmShow(false);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cards/");
        const data = response.data;
        setGoverment(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/cards/delete/${currentId}`
      );

      // Remove the deleted department from state
      setGoverment((prevData) =>
        prevData.filter((data) => data.id !== currentId)
      );

      Toastify({
        text: "Goverment deleted successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#F57D20",
      }).showToast();

      handleCloseModal(); 
    } catch (error) {
      console.error("Error deleting Goverment:", error);
    }
  };
  const handleInputChange = (event) => {
      const query = event.target.value;
      setSearchQuery(query);

      // Filter blogs based on search query
      const filteredResults = goverment.filter((gov) =>
        gov.governorate.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
    };
    const dataToDisplay= searchQuery ? searchResults : goverment
  return (
    <>
      <NavBar title={"المحافظات"} />
      <section classNameName="margin_section">
        <div className="container ">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 ">
              <Link to="/addgoverment">
                <Button className="add_btn">
                  <span className="plus_icon">+</span>
                  اضف محافظة{" "}
                </Button>
              </Link>
            </div>

                       {/* search */}
                       <div className="col-lg-6 col-md-12 col-sm-12 ">
              <div className="navbar__search faq__search">
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
                    <th className="desc_table_cardprice">المحافظة </th>
                    <th className="desc_table_cardprice">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {dataToDisplay.map((gov) => (
                    <tr>
                      <td>{gov.governorate} </td>

                      <td>
                        <i
                          className="fa-regular fa-trash-can fa-lg"
                          style={{ color: "#944b43" }}
                          onClick={() => handleOpenModal(gov.id)}
                          ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <DeletePopUp
          show={smShow}
          onHide={handleCloseModal}
          title={titlePopup}
          description={descriptionPopup}
          handleDelete={handleDelete}
        />
      </section>
    </>
  );
}

export default Goverment;
