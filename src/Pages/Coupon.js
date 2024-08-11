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
function Coupon() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [titlePopup, setTitlePopup] = useState(""); // State for modal title
  const [descriptionPopup, setDescriptionPopup] = useState("");
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(null); 

  const handleOpenModal = (id) => {
    setCurrentId(id);
    setSmShow(true);
    setTitlePopup("حذف كوبون"); // Set your modal title dynamically
    setDescriptionPopup("هل أنت متأكد من حذف هذا الكوبون  ؟"); // Set your modal description dynamically
  };

  const handleCloseModal = () => {
    setSmShow(false);
  };
  const handleUpdate = (id) => {
    navigate('/updatecoupon', { state: { id } });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/coupon/");
        const data = response.data;
        setCoupons(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/coupon/delete/${currentId}`
      );

      // Remove the deleted department from state
      setCoupons((prevData) =>
        prevData.filter((data) => data.id !== currentId)
      );

      Toastify({
        text: "coupon deleted successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#F57D20",
      }).showToast();

      handleCloseModal(); 
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };
 
    const dataToDisplay= searchQuery ? searchResults : coupons
    const handleAddCoupon=()=>{
      navigate('/addcoupon');
    }
  return (
    <>
      <NavBar title={"الكوبونات"} />
      <section classNameName="margin_section">
        <div className="container ">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 ">
              {/* <Link to="/couponadd"> */}
                <Button className="add_btn" onClick={handleAddCoupon}>
                  <span className="plus_icon">+</span>
                  اضف كوبون{" "}
                </Button>
              {/* </Link> */}
            </div>

            
          </div>
          <div className="row mt-5">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Table striped hover>
                <thead>
                  <tr className="table_head_cardprice">
                    <th className="desc_table_cardprice">الكوبون </th>
                    <th className="desc_table_cardprice">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {dataToDisplay.map((couponData) => (
                    <tr>
                      <td>{couponData.coupon_code} </td>

                      <td>
                        <i
                          class="fa-regular fa-pen-to-square fa-lg ps-2"
                          style={{ color: "#6dab93" }}
                          onClick={() => handleUpdate(couponData.id)}
                        ></i>
                        <i
                          className="fa-regular fa-trash-can fa-lg"
                          style={{ color: "#944b43" }}
                          onClick={() => handleOpenModal(couponData.id)}
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

export default Coupon;
