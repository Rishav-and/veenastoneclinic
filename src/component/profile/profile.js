import { useState, useEffect } from "react";
import React from "react";
import {useNavigate} from "react-router-dom";


import { db } from "../Firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,  faSearch} from '@fortawesome/free-solid-svg-icons';
import Loading from "../loading/loading";


function Profile(props){
  
  const {user,uid} = props; //importing the props from app.js
   // console.log(uid);
  const navigate = useNavigate(); 
  const [posts, setPosts]= useState([]);
  
 // collecting data from firebase and and assigning the value to setPosts
  useEffect(() => {
    const getPosts = [];
    const details = db
    .collection("User")
    .onSnapshot((querySnapshot) =>{
        querySnapshot.forEach((doc)=> {
          getPosts.push({
              ...doc.data(),
              key: doc.id,
          });
   
        });
        setPosts(getPosts);
          
    });
    return () => details();

  
}, []);
console.log(posts.Name)
   
    return (
      <>
      {user? (
  <div className="container my-5  bg-light d-flex justify-content-center ">
  <div className="row gy-5 gx-5">
{posts.length > 0 ? (

// filtering the data a/c to the person (object) signed in
posts.filter((val) => {
                
                
  if (val.UID == uid ) {
      return (   
                           
         val
         )
        
      
     }} ).map((post ) => //dispalying the data of the filtered object
     <> 
      <div className="profileCard">
      <div className="card  ms-3 me-3 rounded hoverCss profileCard" >
       <div   className="bg-primary card-img-top   "  >
       
                               <div className=" text-center text-white ">
                               <FontAwesomeIcon className="fas fa-7x mt-4 mb-4 " icon={faUser} />
                               
                              </div>
                             
                           </div> 
                           <div className="bg-light  rounded pb-3 pt-3">
                            <label className="mx-3">Name :</label><br/>
                           <h3 className="mx-3" >{post.name}</h3>
                           <label className="mx-3">Email :</label><br/>
                           <h3 className="mx-3">{post.email}</h3>
                           <label className="mx-3">User ID :</label><br/>
                           <h3 className="mx-3" >{post.UID}</h3>
                          
                           
               
           
                           </div>            </div>
        </div>
        </>
     )
     
     ):<Loading/>}
     </div></div>
     
    ) : 
  
    //if we are not loged in we'll get thrown to login page
    navigate("/login")
    
}
</>
  )
  }
  

export default Profile;



