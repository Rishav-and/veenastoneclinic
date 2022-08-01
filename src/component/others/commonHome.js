import React from "react";
import { NavLink } from "react-router-dom";



function Common(props) {
  return (
    <div >

    <section id="header" className="d-flex align-item-center">
     <div className="container-fluid ">
       <div className="row">
         <div className="col-10 mx-auto">
         <div className="row">
           <div className="col-md-6 pt-5 pt-lg-0 order-0 order-lg-1 d-flex justify-content-center flex-column ">
             <h1>
               {props.name} <br /> <strong className="brand-name"> Veena Store Clinic</strong>

             </h1>
             <h2 className="my-4">
               We are the team of talented Doctors <br /> improving your health
             </h2>
             <div className="mt-3 pb-5">
               <NavLink to={props.visit} className=" btn-get-started">
                 {props.btnName}
               </NavLink>
             </div>
           </div>
           <div className="col-lg-6 order-1 order-lg-2 header-img">
           <img style={{width:"80%"}} src={props.imgsrc} className="img-fluid animated" alt="img" />

           </div>
         </div>
         </div>
       </div>
     </div>
    </section>
      
    </div>
  );
}

export default Common;
