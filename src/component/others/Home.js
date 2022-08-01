import React from "react";
import web from "../image/nurse.png" ;
import Common from "./commonHome";


function Home() {
  return (
    <div  >

<Common name="Improve your health with" imgsrc={web} visit="/service" btnName="Get Started" />
   
      
    </div>
  );
}

export default Home;
