import React, { useState ,useEffect} from "react";
import NavBar from "../component/NavBar";
import "../Css/order.css";
import Table from "react-bootstrap/Table";
import axios from "axios";

function Order() {

  const [activeButton, setActiveButton] = useState("btn1");

  // Handler function to change the color of the clicked button
  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
    console.log(activeButton);
  };

  // Function to determine button color
  const getButtonColor = (buttonId) => {
    return activeButton === buttonId ? "#833988" : "#F57D20";
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
        {activeButton === 'btn1' ? (

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
      ) : activeButton === 'btn2' ? (
                  
          <Table striped hover>
          <thead>
            <tr className="table_head_cardprice">
              <th className="desc_table_cardprice">اسم الطالب</th>
              <th className="desc_table_cardprice">الايميل</th>
              <th className="desc_table_cardprice">العنوان</th>
              <th className="desc_table_cardprice">رقم الهاتف</th>
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

              <td>
              <button type="button" className="btn btn-success ms-2">قبول</button>
              <button type="button" className="btn btn-danger ">رفض</button>
              </td>
            </tr>
            <tr>
              <td>اللغة الإنجليزية</td>
              <td>محمد أحمد</td>
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
      ) : null}
        </div>
      </div>

    </>
  );
}

export default Order;
