import React from "react";
import Card from "../card/Card";
import web from "../image/medical.jpg";

function Service() {
  return (
    <>
    <div className="my-5">
    <h1 className="text-center"> Our Servies</h1>
   </div>
   <div className="container-fluid mb-5">
     <div className="row">
       <div className="col-10 mx-auto">
          <div className="row gy-5">
         <Card imgSrc={web} title="Medical" text="Love you 3000"/>
         <Card imgSrc={web} title="Medical" text="Love you 3000"/>
         <Card imgSrc={web} title="Medical" text="Love you 3000"/>
         <Card imgSrc={web} title="Medical" text="Love you 3000"/>
         <Card imgSrc={web} title="Medical" text="Love you 3000"/>
         <Card imgSrc={web} title="Medical" text="Love you 3000"/>

          </div>
       </div>
     </div>
   </div>
    </>
  );
}

export default Service;
