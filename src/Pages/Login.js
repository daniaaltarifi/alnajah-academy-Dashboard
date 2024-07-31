
import "../Css/auth.css";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/login', {
        email, password
      });
     
      console.log('Login response:', res.data);
      localStorage.setItem('auth', res.data.token);
  localStorage.setItem('id', res.data.token.id);
      // Check if the response contains the token
      if (res.data.token) {
        localStorage.setItem('auth', res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('id', res.data.id);
        console.log('Auth token set in localStorage:', localStorage.getItem('auth'));
        window.location.href = '/home'; // Redirect to home page after login
      } else {
        setError("Login failed, no token received.");
      }
    } catch (err) {
      setError("البريد الالكتروني أو كلمة المرور غير صحيحة");
      console.error('Login error:', err);
    }
  };
  return (
    <>
      <section className="login_cont ">
        <div className="container text-center ">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-5 col-md-6 col-sm-12 box_purple_auth">
              <div className="">
                <div className="hello_logo_auth_cont">
                  <p className="hi_auth">مرحباً بك</p>
                  <img
                    src={require("../assets/ba9ma2.png")}
                    alt="ba9ma logo"
                    className="img-fluid logo_auth"
                  />
                </div>
                <div>
                  <button type="button" className="btn auth_btn">
                  إنشاء حساب
                  </button>
                
                </div>
              </div>{" "}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 cont_input_auth ">
              <div className="row m-5">
                <p className="title_of_input_auth">البريد الالكتروني</p>
                <input
                  type="text"
                  className={`search_blog ${error && 'error_input'}`}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                 
                />
                



              </div>
              <div className="row m-5">
                <p className="title_of_input_auth">كلمة المرور</p>
                <input
                   type="password"
                   className={`search_blog ${error && 'error_input'}`}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                
                />
              


                <Link to="" className="forget_pass_auth">نسيت كلمة المرور</Link>
              </div>
              {error && <p className="error_message">{error}</p>}
              <button type="button" onClick={handleLogin} className="btn purple_btn mb-2">تسحيل الدخول</button>

            </div>
            
            <div className="col-lg-1"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;