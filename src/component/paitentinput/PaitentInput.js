import { useState, useEffect } from "react";
import React from "react";
import {useNavigate} from "react-router-dom";


import { db } from "../Firebase";


function PaitentInput(props){
  const navigate = useNavigate(); //helps to navigate to assigned path
  const {user} =props;            //calling the props from App.js 
    const [Date, setDate] = useState("");
    const [name , setName] = useState("");
    const [city , setCity] = useState("");
    const [ center, setCenter] = useState("");   //basic useState for single value (lines 12-36)
    const [ address, setAddress] = useState("");
    const [ detail, setDetail] = useState("");
    const [whatsapp , setWhatsapp] = useState("");
    const [ age, setAge] = useState("");
    const [ gender, setGender] = useState("");
    const [ doctorName, setDoctorName] = useState("");
    const [ email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [dateError , setDateError] = useState("");
    const [nameError , setNameError] =useState("");
    const [cityError , setCityError] = useState("");
    const [centerError , setCenterError] = useState("");
    const [addressError , setAddressError] = useState("");
    const [detailError , setDetailError] = useState("");
    const [whatsappError, setWhatsappError] = useState("");
    const [ageError , setAgeError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [doctorNameError, setDoctorNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [doctorComment, setDoctorComment] = useState("");
    const [posts, setPosts]= useState([]); //for multiple values
 
    
    useEffect(() => {
      const getPosts = [];
      const details = db              
      .collection("Doctors")
      .onSnapshot((querySnapshot) =>{
          querySnapshot.forEach((doc)=> {
            getPosts.push({
                ...doc.data(),
                key: doc.id,
            });
     
          });
          setPosts(getPosts);
            
      });  //calling db from firebase then going in collection and retrieving data from it using onSanpshot.
      return () => details();
    
  }, []); // checking and updating collection of doctors database stored in firebase
  //this doctors database is created directly in firebase .
         
    
    function validate(){
      let emailError = "";
      let dateError ="";
      let nameError = "";
      let cityError ="";
      let centerError ="";     //null validation (61-71)
      let addressError ="";
      let detailError ="";
      let whatsappError ="";
      let ageError ="" ;
      let genderError ="";
      let doctorNameError = "";
      

      if (!email.includes("@")){          //using include to find error message 
        emailError="invalid email";     // error message(74-106)
      }
      if (!Date){                         //
        dateError="Date cannot be empty"; 
      }
      if (!name){
        nameError="Name cannot be empty";
      }
      if (!city){
        cityError="City cannot be empty";
      }
      if (!center){
        centerError="Center cannot be empty";
      }
      if (!address){
        addressError="Address cannot be empty";
      }
      if (!detail){
        detailError="Details cannot be empty";
      }
      if (!whatsapp.match(/^[0-9\b]+$/) ){    // only number to input
        whatsappError="Whatsapp cannot be empty and numbers only";
      }
      if (!age.match(/^[0-9\b]+$/) ){      // only number to input
        ageError="Age cannot be empty and numbers only";
      }
      if (!gender){                       
        genderError="Gender cannot be empty";
      }
      if (!doctorName){
        doctorNameError="Doctor's name cannot be empty"; 
      }

      if (emailError || dateError|| nameError||cityError || centerError|| addressError|| detailError||whatsappError||ageError|| genderError||doctorNameError) {
        setEmailError(emailError);
        setDateError(dateError);
        setNameError(nameError);
        setCityError(cityError);
        setCenterError(centerError);
        setAddressError(addressError);
        setDetailError(detailError);            //setting the error message to null(109-119)
        setWhatsappError(whatsappError);
        setAgeError(ageError);
        setGenderError(genderError);
        setDoctorNameError(doctorNameError);

        return false;
      }

      return true;

    }

    function handleSubmit(e) {

        e.preventDefault();
        const isValid = validate();
        var id = Math.floor(Math.random() * 10000000000).toString();
       if (isValid) {
         // create a random no and make it a const and assign it to id
        
        db.collection("PaitentDetail") // naming the collection in firebase and store data in that collection
        .add({
            name: name,        // storing the data accordingly (138-150) 
            date: Date,
            emial: email,              
            city : city,
            center: center,
            address: address,
           id: id,
            detail: detail,
            whatsapp: whatsapp,
            age: age,
            gender: gender,
            doctorName: doctorName,
            doctorComment: doctorComment,

        })
        .then(()=> {
            alert("message has been sent!👏");   //conforming message
            
        })
        .catch((err) => {
            setErrorMsg(err.message);
            alert(errorMsg);     //if any error is occured while sending the message  an alert is set to shown  
        });
        

        setDoctorName("");
        setEmail("");
        setGender("");
        setAge("");
        setWhatsapp("");
        setDetail("");
        setDoctorComment("");    //resetting the error to null(163-185 )
     
        setAddress("");
        setCenter("");
        setCity("");
        setDate("");
        setEmailError("");
        setDateError("");
        setNameError("");
        setCityError("");
        setCenterError("");
        setAddressError("");
        setDetailError("");
        setWhatsappError("");
        setAgeError("");
        setGenderError("");
        setDoctorNameError("");
    }
  }

    return (
      <>
      {user? (    
        // if user is available 
        <div> 
{/* all starting with pai... are custom css */}
        <div className="paiBody">
      
           <div className="paicontainer">
    <div className="paititle"> Form for paitent entry</div>
    
    <div className="paicontent">
      
     
         <form className="paiForm" >
           <div className="user-details"> 
          <div className="input-box">
    <label  class="details">Full Name <span style={{color:"red"}}>*</span> </label><br/>
    <input  type="text" className="paiinput" value ={name}
            onChange ={e => setName(e.target.value)}  placeholder="Enter Your Name" />
{/* using onChange set the value when something is placed in the input box */}
            <div style={{color: "red", fontSize: ".75em"}} >{nameError}</div> 
 {/* setting error message  */}
  </div>
  <div className="input-box">
    <label  >Date <span style={{color:"red"}}>*</span></label><br/>
    <input className="paiinput" type="date"  value={Date}
      onChange={e => setDate(e.target.value)} placeholderText="date"
    />
{/* using onChange set the value when something is placed in the input box */}
   <div style={{color: "red", fontSize: ".75em"}} >{dateError}</div>
 {/* setting error message  */}
  </div>
  <div className="input-box">
    <label class="details">Email address <span style={{color:"red"}}>*</span></label><br/>
    <input className="paiinput" type="email" value ={email}
            onChange ={e => setEmail(e.target.value)}   placeholder="name@example.com" />
{/* using onChange set the value when something is placed in the input box */}
            <div style={{color: "red", fontSize: ".75em"}} >{emailError}</div>
 {/* setting error message  */}
  </div>
  <div className="input-box">
    <label  class="details">City <span style={{color:"red"}}>*</span></label>
    <div>
      <select className="paiinput" 
            value ={city}
            onChange ={e => setCity(e.target.value)}>
                <option value="">Select</option>
                <option value="Bihar">Bihar</option>
                <option value="UP">UP</option>
 {/* using onChange set the value when something is placed in the input box */} 
       </select>
  {/* using select for having multiple option and nothing more tthan that */}
      
       <div style={{color: "red", fontSize: ".75em"}} >{cityError}</div>
 {/* setting error message  */}
     </div>
  </div>
  
  <div className="input-box">
    <label  class="details ">Center <span style={{color:"red"}}>*</span></label>
    <div>
    <select className="paiinput" 
            value ={center}
            onChange ={e => setCenter(e.target.value)}>
                <option value="">Select</option>
                <option value="camp">Camp</option>
                <option value="patna">Patna</option>
{/* using onChange set the value when something is placed in the input box */}
            </select>
{/* using select for having multiple option and nothing more tthan that */}
            <div style={{color: "red", fontSize: ".75em"}} >{centerError}</div>
 {/* setting error message  */}
     </div>
  </div>
  <div className="input-box">
    <label  class="details ">Address <span style={{color:"red"}}>*</span></label><br />
    <textarea  className="paiinput" placeholder="Current living address" 
            value ={address}
            onChange ={e => setAddress(e.target.value)}></textarea>
{/* using onChange set the value when something is placed in the input box */}
            <div style={{color: "red", fontSize: ".75em"}} >{addressError}</div>
 {/* setting error message  */}
  </div>
  <div className="input-box">
    <label  class="details ">Details <span style={{color:"red"}}>*</span></label><br />
    <textarea  className="paiinput" placeholder="Detail about paitent"
            value ={detail}
            onChange ={e => setDetail(e.target.value)}></textarea>
{/* using onChange set the value when something is placed in the input box */}  
            <div style={{color: "red", fontSize: ".75em"}} >{detailError}</div>
 {/* setting error message  */}
        
  </div>
 
  <div className="input-box">
    <label  class="details">Whatsapp <span style={{color:"red"}}>*</span></label> <br />
    <input className="paiinput" placeholder="Whatsapp number in use"
            value ={whatsapp}
            onChange ={e => setWhatsapp(e.target.value)} />
{/* using onChange set the value when something is placed in the input box */}            
            <div style={{color: "red", fontSize: ".75em"}} >{whatsappError}</div>
 {/* setting error message  */}
  </div>
  <div className="input-box">
    <label  class="details">Age <span style={{color:"red"}}>*</span></label><br />
    <input className="paiinput"  placeholder="age" value ={age}  onChange ={e => setAge(e.target.value)} />
{/* using onChange set the value when something is placed in the input box */}
    <div style={{color: "red", fontSize: ".75em"}} >{ageError}</div>
 {/* setting error message  */}
  </div>
  <div className="input-box">
    <label  class="details">Gender <span style={{color:"red"}}>*</span></label>
    <div >
            <select className="paiinput"
            value ={gender}
            onChange ={e => setGender(e.target.value)}>
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
{/* using onChange set the value when something is placed in the input box */}
            </select>
            <div style={{color: "red", fontSize: ".75em"}} >{genderError}</div>
 {/* setting error message  */}
            </div>
  </div>
  <div className="input-box">
    <label  class="details">Doctor's Name <span style={{color:"red"}}>*</span></label><br/>
    
              
            <select className="paiinput"
            value ={doctorName}
            onChange ={e => setDoctorName(e.target.value)}>
               <option value="">Select</option>
               {posts.map((card) => ( 
                <option value={card.Name}>{card.Name}</option>
                ))}
{/* using onChange set the value when something is placed in the input box 
inside that using map function to get all the data/value from the databases which are in firebase*/}
            </select>
{/* using select for having multiple option and nothing more tthan that */}
           
            <div style={{color: "red", fontSize: ".75em"}} >{doctorNameError}</div>
 {/* setting error message  */}
  </div>
 <br />
 <div className="input-box">
    <label  class="details ">Comment for Doctor </label><br />
    <textarea  className="paiinput" placeholder="Comment"
            value ={doctorComment}
            onChange ={e => setDoctorComment(e.target.value)}></textarea>
{/* using onChange set the value when something is placed in the input box 
textarea for manually increase the area to text if needed at times*/}
          
  </div>
 <div className="container">
  <div className="button d-flex justify-content-center">
      <button className="paiinput" onClick={handleSubmit}  type="submit">Submit form</button>
      {/* using onChange to call a function which helps to submit data/value to the firebase database */}
    </div>
    </div>
    </div>
  
  </form>
  
          </div>
        </div>
        </div>
   
  


      </div>
      ): 
      // if user is not available then navigating/ trowing back to login 
       navigate("/login")
}
      </>
    ); 
  }

export default PaitentInput;
//exporting function PaitentInput as a default argument.


