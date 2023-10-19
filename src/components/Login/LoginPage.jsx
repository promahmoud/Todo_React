import React, { Fragment, useRef, useState } from 'react';
import '../Login/Loginstyle.css';
import TodoApp from '../TodoApp';


function LoginPage(defaultValue) {
      const email = useRef()
      const password = useRef()


      const [errors, setErrors] = useState("");

      const [formState, setFormState] = useState(
            defaultValue || {
                  email: "",
                  password:"",
            }
      );
      const handleChange = (e) => {
            setFormState({ ...formState, [e.target.name]: e.target.value });
      };

      const validateForm = () => {
            let emailvalue =email.current.value;
            let paswordvalue =password.current.value;

            if (emailvalue ==='user@gmail.com' && paswordvalue ==='12345') {
                  setErrors("");
                  return true;
            } else {
                  let errorFields = [];

                  if(emailvalue === undefined ||emailvalue === '' ){
                        errorFields.push("Email can't be empty");
                  } else if(paswordvalue === undefined || paswordvalue === ''){
                        errorFields.push("Password can't be empty");
                  } 

                  for (const [key, value] of Object.entries(formState)) {
                        if ((key==='password' && value !== '12345') || (key==='email' && value !== 'user@gmail.com')) {
                              errorFields = [];
                              errorFields.push("The email address or password you entered isn't connected to an account.");
                        } 
                  }
                  setErrors(errorFields.join(", "));
                  return false;
            }
      };
      

      const getEmail = localStorage.getItem("emailData")
      const getPassword = localStorage.getItem("passwordData")

      const handleLoginSubmit = (e) => {
            e.preventDefault();

            if (!validateForm()) return;

            if (email.current.value === "user@gmail.com" && password.current.value === "12345") {
                  localStorage.setItem("emailData", "user@gmail.com")
                  localStorage.setItem("passwordData", "12345")
                  window.location.reload();

            }

      }

      return (

            <Fragment>
                  {
                  getEmail && getPassword ? <TodoApp/> :
            

            <div className="screen-1">
                  <form >
                        <div className="email" >
                              <label htmlFor="email">Email Address</label>
                              <div className="sec-2">
                                    <ion-icon name="mail-outline"></ion-icon>
                                    <input type="email" name="email" placeholder="Email" ref={email} onChange={handleChange} />
                              </div>
                        </div>
                        <div className="password">
                              <label htmlFor="password">Password</label>
                              <div className="sec-2">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                    <input className="pas" type="password" name="password" placeholder="············" ref={password}  onChange={handleChange} required/>
                                    <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                              </div>
                        </div>
                        <button className="login" onClick={handleLoginSubmit}>Login </button>
                        {errors && <div className="error">{`${errors}`}</div>}

                        <div className="footer">
                              <ul>
                                    <h6>use this info to login in</h6>
                                    <li>Email: <mark> user@gmail.com</mark> </li>
                                    <li>Password: <mark> 12345</mark> </li>
                              </ul>
                        </div>
                  </form>
            </div>
            }
            </Fragment>

      )
}

export default LoginPage