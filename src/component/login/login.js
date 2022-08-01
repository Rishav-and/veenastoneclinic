import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faLock} from '@fortawesome/free-solid-svg-icons'

import fire, { auth } from "../Firebase"; //importing for firebase authentications

function Signup() {
  const navigate = useNavigate(); //initializing useNavigate function
  const [textError , setTextError] =useState("");
  
  const [values, setValues] = useState({
    
    email: "",
    pass: "",
  });

  //function if we forget password using firebase.
  function handleForgotPassword(){
    let email  = window.prompt("Enter the email")
    fire
    .auth()
    .sendPasswordResetEmail(email)

  };
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled , setSubmitButtonDisabled] = useState(false);

 /* const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.email,
        });
        navigate("/paitentinput");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
      alert(errorMsg);
  }; */
  
  //function for login in the website
  const handleLogin = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }                                                            //setting error if fields are empty 
    setErrorMsg("");                                             //setting the fields back to empty strings
    
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)  //checking the content for login in the website 
      .then(async (res) => {
        setSubmitButtonDisabled(false); 
        
        navigate("/profile");                                    // if login is done navigating to profile page 
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
      
      // alert(errorMsg); chaging error message a/c to my will using inculde method .

       if(errorMsg.includes("Error (auth/user-not-found)")){
            setTextError("Email is not found"); 
       } else if (errorMsg.includes("auth/wrong-password")){
        setTextError("Password is wrong.Please try again");
       } else if (errorMsg === ""){
        setTextError("");
       }
  };

  

  return (
    <div >
                  {/* using bootstrap */}
      <div className="body">
     <div className="side text-center my-5">      {/*  side -bootstarp can disapper the content on mobile mode */}
        <img src="img.svg" alt="" />
    </div>
      <div className="main">                      {/* main -bootstrap remain in the mobile view */} 
      

      {/* custom css imported from App.css */}
        <div className="loginContainer">
         <p className="title">Welcome Back</p>
         <div className="separator"></div>
            <h4 className="welcomMessage">Please, provide login credential to proceed and have access to all our services</h4>
       <div className="loginForm">
         <div className="formControl" >
         <input
         className="input"
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))   //seting the values using useState react defined element
                    }
          />
          <FontAwesomeIcon className="fontIcon" icon={faUser} />            {/* implementing icons importing from FontAwesomeIcon site */}
        </div>
        <div className="formControl">
      
         <input type="password" className="input"
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))    //seting the values using useState react defined element 
          }
         />
         <FontAwesomeIcon className="fontIcon" icon={faLock} />             {/* implementing icons importing from FontAwesomeIcon site */}
        </div>
        

        <div >
        <div style={{color:"red", marginLeft:"1rem", height:".7rem", fontSize:"1.2rem"}}>{textError}</div>                   {/* error message displays if any */}
          <b />
           
        
             
                 <button className="submitButton " onClick={handleLogin}  disabled={submitButtonDisabled}>                   {/* button to submit the query to check the login */}
            Login
          </button>
          <h4 className=" forgot texthover" style={{cursor:"pointer" }} onClick={handleForgotPassword}>Forgot Password?</h4> {/* for forget function  */}
            
         
             
             </div>
             </div>
             </div>

       
      </div>
      
      
    
</div>
    </div>
  );
}

export default Signup;

