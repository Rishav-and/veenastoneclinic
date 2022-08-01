import React from "react";
import { NavLink } from "react-router-dom";




function Navbar(props) {
  const {user, handleLogout} = props;
    return(
        <>
        <div className="container-fluid nav_bg">
            <div className="row">
                <div className="col-10 mx-auto">

          
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    
    <NavLink style={{fontSize: "2.5 rem"}} className="navbar-brand navCustom"  to="/">VSC</NavLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
       
       
        {user ? ( 
          <>
            <li className="nav-item">
          <NavLink  activeClassName="menu_active" exact className="nav-link" to="/profile">Profile</NavLink>
        </li>
         
          <li className="nav-item">
          <NavLink  activeClassName="menu_active" exact className="nav-link" to="/paitentinput">PaitentForm</NavLink>
        </li>
        <li className="nav-item">
          <NavLink  activeClassName="menu_active" exact className="nav-link" to="/search">Search</NavLink>
        </li>
        <li className="nav-item">
          <button className="nav-link custom-btn" onClick={handleLogout}>Logout</button>
        </li>
        </>
        
        ):(
        
        <>
          <li className="nav-item">
          <NavLink  activeClassName="menu_active" exact className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink  activeClassName="menu_active" exact className="nav-link" to="/service">Services</NavLink>
        </li>
        <li className="nav-item">
          <NavLink  activeClassName="menu_active" className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink  activeClassName="menu_active" exact className="nav-link" to="/contact">Contact</NavLink>
        </li>
          <li className="nav-item">
          <NavLink  activeClassName="menu_active" exact className="nav-link" to="/login">Login</NavLink>
        </li>
        </>
        
        )}
        
    
      </ul>
   
    </div>
  </div>
</nav>
      </div>
            </div>
        </div>
</div>
        </>
    )
    
};

export default Navbar;