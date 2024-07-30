import React, { useState } from "react";
import NavBar from "../component/NavBar";
import "../Css/order.css";
import Table from "react-bootstrap/Table";

function Order() {
  const [activeLink, setActiveLink] = useState(null);

  const handleBackground = (e) => {
    // Remove background from previously active link
    if (activeLink) {
      activeLink.style.background = "";
      activeLink.style.padding = "";
      activeLink.style.borderRadius = "";
    }

    // Apply background to the clicked link
    const currentLink = e.currentTarget;
    currentLink.style.background = "#F57D20";
    currentLink.style.padding = "10px";
    currentLink.style.borderRadius = "10px";

    // Update state to track the active link
    setActiveLink(currentLink);
  };
  return (
    <>
      <NavBar title={"طلبات الشراء "} />
      <div className="container text-center">
        <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12  mb-4">
          <div className="d-flex cont_btn_order">
            <button
              className="courses_dep px-5 py-4 background_btn"
              onClick={handleBackground}
            >
              المواد
            </button>
            <button
              className="courses_dep px-5 py-4  background_btn"
              onClick={handleBackground}
            >
              الاقسام
            </button>
          </div>
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12"></div>
        </div>
        <div className="row">
          <Table striped hover>
            <thead>
              <tr className="table_head_cardprice">
                <th className="desc_table_cardprice">اسم الطالب</th>
                <th className="desc_table_cardprice">الايميل</th>
                <th className="desc_table_cardprice">العنوان</th>
                <th className="desc_table_cardprice">رقم الهاتف</th>
                <th className="desc_table_cardprice">اسم المادة</th>
                <th className="desc_table_cardprice">القسم</th>
                <th className="desc_table_cardprice">الاجراء</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>اللغة الإنجليزية</td>
                <td>محمد أحمد</td>
                <td>12</td>
                <td>12</td>
                <td>5</td>
                <td>5</td>
                <td>
                <button type="button" className="btn btn-success ms-2">قبول</button>
                <button type="button" className="btn btn-danger ">رفض</button>
                </td>
              </tr>
              <tr>
                <td>اللغة الإنجليزية</td>
                <td>محمد أحمد</td>
                <td>12</td>
                <td>12</td>
                <td>5</td>
                <td>5</td>

                <td>
                <button type="button" className="btn btn-success ms-2">قبول</button>
                <button type="button" className="btn btn-danger ">رفض</button>
                </td>
              </tr>
              <tr>
                <td>اللغة الإنجليزية</td>
                <td>محمد أحمد</td>
                <td>12</td>
                <td>12</td>
                <td>5</td>

                <td>5</td>
                <td>
                <button type="button" className="btn btn-success ms-2">قبول</button>
                <button type="button" className="btn btn-danger ">رفض</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

    </>
  );
}

export default Order;
