import React, { useState,useEffect } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
import { useLocation,useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; 
import axios from "axios";
function UpdateAvailableCard() {
  const locationState = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState("")
const [governorate_id, setgovernorate_id] = useState(null)
const [address, setaddress] = useState("")
  const [phone, setphone] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayInfo, setDisplayInfo] = useState([]);
  const [availablecard, setavailablecard] = useState([])
  const [govermentData, setgovermentData] = useState([])
  const [availabalecardId, setAvailableCardId] = useState('');

  const handleGoverment = (e) => {
    const selectedgovermentId = e.target.value;
    setgovernorate_id(selectedgovermentId);
  };

  useEffect(() => {
    // Check if location.state exists and contains the id
    if (locationState.state && locationState.state.id) {
        setAvailableCardId(locationState.state.id);
        console.log("availabalecardId",availabalecardId)
    } else {
      console.warn('No ID found in location.state');
    }
  }, [locationState.state]);
  useEffect(() => {
    const fetchGoverment = async () => {
        try {
          const response = await axios.get("http://localhost:8080/cards/");
          setgovermentData(response.data);
        } catch (error) {
          console.error("Error fetching goverment:", error);
        }
      };
  
      fetchGoverment();
  }, []);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  

  const handleDeleteSelectedFile=()=>{
    setSelectedFile(null);
  }
  const handleUpdate = async () => {
    if (!name || !location || !governorate_id || !address || !phone) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    try {
    
      const response = await axios.put(
        `http://localhost:8080/cards/update/availablecard/${availabalecardId}`,
        { name,location,governorate_id,address,phone}
      );
      setavailablecard((prevAdd) =>
        prevAdd.map((data) =>
          data.id === availabalecardId ? response.data : data
        )
      );
      Toastify({
        text: "Updated completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
navigate('/availablecards')
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };
  return (
    <>
      <NavBar title={"البطاقات المتوفرة في المكتبات"} />
      <div className="container ">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="title_add_course">تعديل مكتبة</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse" >اسم المكتبة</p>
            <input type="text" className="input_addcourse" onChange={(e)=>setName(e.target.value)} />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">الموقع</p>
            <input type="text" className="input_addcourse" onChange={(e)=>setLocation(e.target.value)}/>{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">المحافظة </p>
            <select
              name="department"
              value={governorate_id}
              onChange={handleGoverment}
              id="lang"
              className="select_dep"
            >
              <option value="">اختر محافظة</option>
              {govermentData.map((gov) => (
                <option key={gov.id} value={gov.id}>
                  {gov.governorate}
                </option>
              ))}
            </select>
          </div>
        </div>
      
        <div className="row mt-4">
        <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="input_title_addcourse">ألعنوان</p>
            <input type="text" className="input_addcourse" onChange={(e)=>setaddress(e.target.value)}/>{" "}
          </div>
          <div className="col-lg-8 col-md-6 col-sm-12">
          <p className="input_title_addcourse">الرقم </p>
          <input type="text" className="input_addcourse" onChange={(e)=>setphone(e.target.value)}/>{" "}

         
          </div>
          <div className="d-flex justify-content-center align-items-center ">

        <button className="btn_addCourse px-5 py-2 mt-5" onClick={handleUpdate}>حفظ</button>
          </div>
     
        </div>

      </div>

    
    </>
  );
}

export default UpdateAvailableCard;
