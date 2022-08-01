import React,{useState} from "react";
import {db } from "../Firebase";

function Contact() {

 const [email, setEmail] = useState("");
 const [name, setName] = useState("");
 const [phone ,setPhone] = useState("");
 const [message ,setMessage] =useState("");
 const [phoneError, setPhoneError] = useState("");
 const [nameError, setNameError] = useState("");
 const [emailError, setEmailError] = useState("");
 
 

  const validate = () => {
  let emailError = "";
  let nameError = "";
  let phoneError ="";


  if (name < 1){
    nameError="Name cannot be blank";
  }
  
  if(!phone.match(/^[0-9\b]+$/) || phone != 10){
    phoneError="Only numbers in phone section"
  }

  if (!email.includes("@")){
    emailError="Invalid email";
  }
  
  if (emailError || nameError || phoneError) {
    setEmailError(emailError);
    setNameError(nameError);
    setPhoneError(phoneError);
    alert(emailError+" \n"  + nameError+ " \n" + phoneError)
    return false;
  }

 


  return true;

}
function handleSubmit(e) {

  e.preventDefault();
  const isValid = validate();

 

 if (isValid) {

  if (isValid) {
    db.collection("One's approching")
    .add({
        name: name,
        email:email,
        phone:phone,
        message:message,

    })
    .then(()=> {
        alert("message has been sent!👏");
        
    })
    .catch((err) => {
        alert(err.message);
        
    });

    setEmail("");
    setMessage("");
    setName("");
    setPhone("");
    setEmailError("");
    setNameError("");
    setPhoneError("");
 
 
 }
}
}

  return (
    <>
 
    <div className="container contact_div">
    
      <div className="row">
        <div className="col-md-6 col-10 mx-auto">
        <div className="my-5 text-center title">
      <h1 > Contact US </h1>
    </div>
       <form className="form-css">
        <div class="mb-3">
  <label  class="form-label">Full Name</label><br/>
  <input type="text" value={name} onChange={e => setName(e.target.value)} class="input-css"  placeholder="Enter Your Name" />
  <div style={{color: "red", fontSize: ".75em"}} >{nameError}</div>
</div>
<div class="mb-3">
  <label  class="form-label">Phone</label><br/>
  <input type="text" maxLength={10} minLength={10} value={phone} onChange={e => setPhone(e.target.value)} class="input-css"  placeholder="mobile number" />
  <div  style={{color: "red", fontSize: ".75em"}} >{phoneError}</div>
</div>
<div class="mb-3">
  <label  class="form-label">Email address</label><br/>
  <input type="email" 
       value ={email}
       onChange ={e => setEmail(e.target.value)}  class="input-css"  placeholder="name@example.com" />
     
      <div  style={{color: "red", fontSize: ".75em"}} >{emailError}</div>
     
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label"> Message </label><br/>
  <textarea value={message} onChange={e => setMessage(e.target.value)} class="input-css" rows="3"></textarea>
  
</div>
<div class="col-12 pb-5">
    <button class="custom-btn" type="submit" onClick={handleSubmit}>Submit form</button>
  </div>

</form>

        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;

// if(!isValid){
//   alert(email);
// } 

// !phone.match(/^[0-9\b]+$/) &&