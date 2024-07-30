import React, { useState } from "react";
import NavBar from "../component/NavBar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import '../Css/search.css'
import Table from "react-bootstrap/Table";
import DeletePopUp from "../component/DeletePopUp";
function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [titlePopup, setTitlePopup] = useState(""); // State for modal title
  const [descriptionPopup, setDescriptionPopup] = useState(""); 
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setSmShow(true);
    setTitlePopup("حذف كتاب"); // Set your modal title dynamically
    setDescriptionPopup("هل أنت متأكد من حذف هذا الكتاب ؟"); // Set your modal description dynamically
  };

  const handleCloseModal = () => {
    setSmShow(false);
  };
  const handleUpdate=()=>{
    navigate('/updatelibrary')
  }
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
      <NavBar title={"مكتبة بصمة "} />
      <section classNameName="margin_section">
        <div className="container ">
    
               <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 ">
              <Link to="/addlibrary">
              <Button className="add_btn">
                <span className="plus_icon">+</span>
                اضف كتاب{" "}
              </Button>
              </Link>
              </div>

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
                        <th className="desc_table_cardprice">اسم الكتاب </th>
                        <th className="desc_table_cardprice"> اسم الكاتب</th>
                        <th className="desc_table_cardprice">القسم</th>
                        <th className="desc_table_cardprice">عدد الصفحات </th>
                        <th className="desc_table_cardprice">التاريخ</th>

                        <th className="desc_table_cardprice">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>اللغة الأنجليزية </td>
                        <td> محمد أحمد</td>
                        <td>12</td>
                        <td>12</td>
                        <td>5 </td>

                        <td>
                        <i class="fa-regular fa-pen-to-square fa-lg ps-2" style={{color:"#6dab93"}} onClick={handleUpdate} ></i>
                        <i className="fa-regular fa-trash-can fa-lg" style={{color:"#944b43"}} onClick={handleOpenModal} ></i>
                        </td>
                      </tr>
                      <tr>
                      <td>اللغة الأنجليزية </td>
                        <td> محمد أحمد</td>
                        <td>12</td>
                        <td>12</td>
                        <td>5 </td>

                        <td>
                        <i class="fa-regular fa-pen-to-square fa-lg ps-2" style={{color:"#6dab93"}}></i>
                        <i className="fa-regular fa-trash-can fa-lg" style={{color:"#944b43"}}></i>
                        </td>
                      </tr>
                      <tr>
                      <td>اللغة الأنجليزية </td>
                        <td> محمد أحمد</td>
                        <td>12</td>
                        <td>12</td>
                        <td>5 </td>

                        <td>
                        <i class="fa-regular fa-pen-to-square fa-lg ps-2" style={{color:"#6dab93"}} ></i>
                        <i className="fa-regular fa-trash-can fa-lg" style={{color:"#944b43"}}></i>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  
    </div>
</div>
        </div>
        <DeletePopUp  show={smShow}
        onHide={handleCloseModal}
        title={titlePopup}
        description={descriptionPopup} />
      </section>
    </>
  );
}

export default Library;
