import React from "react";
import NavBar from "../component/NavBar";
import "../Css/department.css";
function Department() {
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
  return (
    <>
      <NavBar title="الأقسام" />
      <section className="margin_section">
        <div className="container-fluid ">
          <div className="row d-flex justify-content-center align-items-center">
            {length.map((card, id) => (
              <div
                className="col-lg-3 col-md-6 col-sm-12 col_depa"
                key={id}
              >
                <div className=" info_cont_depa">

                <div className="d-flex ">
                  <img
                    src={require("../assets/department.png")}
                    alt="department"
                    className="img-fluid icon_department"
                  />

                  <p className="coupoun_department">{card.title}</p>
                </div>
                <p className="info_department">20 طالب 2 مادة</p>
                </div>

                <p className="title_depa">شرح مواد توجيهي جيل 2006</p>
                <div className="btn_handle_cont">
                <button className="btn_handle_depa"><i class="fa-regular fa-pen-to-square" style={{color:"#fff"}}></i></button>
                <button className="btn_handle_depa"><i class="fa-regular fa-pen-to-square" style={{color:"#fff"}}></i></button>

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
