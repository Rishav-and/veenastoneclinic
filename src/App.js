import React,  {useState, useEffect} from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./component/others/Home";
import Contact from "./component/others/Contact";
import About from "./component/about/About";
import PaitentInput from "./component/paitentinput/PaitentInput";
import Service from "./component/others/Service";
import Navbar from "./component/navbar";
import Search from "./component/search/search";
import Detail from "./component/detail/detail";
import Login from "./component/login/login";
import fire from "./component/Firebase";
import Profile from "./component/profile/profile";


function App() {
  const [user, setUser] = useState("");
  const [userID,setUserID] = useState("");
  
  
  
  function handleLogout(){
      fire.auth().signOut();  //for loging out of the website
  };

  const authListener =() => {
      fire.auth().onAuthStateChanged((user) => {  
          if(user) {     // if user is logged in 
            
              setUser(user);    //setting the user 
              setUserID(user.uid); // setting the user's id
          } else {
              setUser("");   // if no user setting user to null
          }
      });
  };

  useEffect(() => {
      authListener();      //running authListener with every change
  }, []);
console.log(userID);
  
  
  return (
    <>
    <Router>
    
    <Navbar handleLogout={handleLogout} user={user} />  {/* passing functions  / props */}
    {/* accoring to react-rlouter-dom v6  */}
      <Routes>
      <Route path="/login" element={<Login />} />           {/* defining path */}
      <Route  path="/" element={<Home />} />                {/* defining path */}
      <Route  path="/contact" element={<Contact />} />      {/* defining path */}
      <Route  path="/about" element={<About />} />          {/* defining path */}
      <Route  path="/service" element={<Service />} />      {/* defining path */}
      <Route path="/jhg" element ={<p>Services is ok</p>} />{/* defining path */}
      <Route path="/paitentinput" element={<PaitentInput     
        user={user}
      />} />                                                 {/* defining path and passing props*/}
      <Route path="/search" element={<Search                
      user={user}
       />} />                                                 {/* defining path and passing props*/}
      <Route path="/search/:id" element={<Detail user={user}/>} /> {/* defining path and passing props*/}
      <Route path="/profile" element={<Profile user={user} uid={userID}/>} /> {/* defining path and passing props*/}
      
      </Routes>
    </Router>
    
  
    </>
  
  );
}

export default App;
