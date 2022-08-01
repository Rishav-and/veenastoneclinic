import React, {useEffect, useRef, useState} from "react";

import { useParams,useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Loading from "../loading/loading";
import {PDFExport} from '@progress/kendo-react-pdf';

function Detail (props) {
    const [loading, setLoading] = useState(true);  // bulean value (true/false)
    const [posts, setPosts]= useState([]);         //for multiple value storage 
    
    const {user} = props;     // calling props from app.js
    const { id  } = useParams();   //for calling the parameter "id" from search.js->app.js to this page
    const navigate = useNavigate();   //initilizing navigate function
    const componentRef = useRef();     
   

    const pdfExportComponent = useRef(null); //defining this constant
    const handleExportWithComponent = (e) =>{
        pdfExportComponent.current.save();   //for saving the content
    }

    useEffect(() => {
        const getPosts = [];
        const details = db
        .collection("PaitentDetail")
        .onSnapshot((querySnapshot) =>{
            querySnapshot.forEach((doc)=> {
              getPosts.push({
                  ...doc.data(),
                  key: doc.id,
              });
       
            });
            setPosts(getPosts);
            setLoading(false); 
              
        });
        return () => details();   //returning the function/const details 
      
    }, []);  //getting/extarcting all components of the paitent document from firebase   
    
    if(loading){
        return <Loading />;
    }
 
    



    return (
        <>
        {user? (  
     //if user is available 
    <div >
        {/* looping the database(PaitentDetail) from firebase and finding my required paitent details to show on the window  */}
          {posts.filter(card => card.id === id, user).map((card,index) => (
                <div >
                    
                    <div className="bg-light " >
                    <div className="row">
                                    <div className="col-sm-9">
                                        <label></label>
                                    </div>
                                    <div className="col-sm-3 mb-3 mt-3 d-flex justify-content-center">
                                    <button onClick={handleExportWithComponent} className="btn btn-success">Print pdf</button>
    {/* creating a button to export/print the document */}
                                    </div>
                                   </div>
    {/* using bootstrap  */}
    {/* wrapping the component which is needed to pe print  */}
    <PDFExport ref={pdfExportComponent} paperSize="C2">    

           <div>
               <div className="row d-flex justify-content-center">
                   <div className="col-md-10 mt-5 mb-5 pb-5 pt-5">
                    
                       <div  className="row shadow ">
                           <div style={{color:"blue"}} className="col-sm-4  rounded-start">
                               <div  style={{color:"blue"}} className="card-block text-center marginUser">
                               <FontAwesomeIcon className="fas fa-7x mt-5 mb-5" icon={faUser} />
  {/* using icon from fontawesome  */}
                              </div>
                           </div> 
                           
                           <div  className="col-sm-8  rounded-end  ">
                            <h1 className="mx-3 "> Paitent's Detail</h1>
                            <hr className="bg-success mt-0 w-50 " />
                            <div className="row">
                            <div className="col-sm-6">
                                           <label className="mx-2" style={{fontSize:"1.35rem"}}>Name:</label> &nbsp; &nbsp;&nbsp;&nbsp;
                                            <label style={{fontSize:"1.3rem"}}className="text-muted"> {card.name}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                       <div className="col-sm-6">
                                           <label  style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">Date:</label>&nbsp; &nbsp;&nbsp;&nbsp;
                                           <label style={{fontSize:"1.30rem"}}className="text-muted">{card.date}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                       </div>

                               <h2 className="mt-3 mx-3">Information</h2>
                               <hr className="bg-info mt-0 w-50 " />
                                   <div className="row">
                                       
                                       
                                       <div className="col-sm-6">
                                           <label style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">Whatsapp:  </label>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                                           <label className="text-muted" style={{fontSize:"1.30rem"}}>{card.whatsapp}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                       <div className="col-sm-6">
                                           <label style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">Gender:</label>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                                           <label className="text-muted" style={{fontSize:"1.30rem"}}>{card.gender}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                       <div className="col-sm-6">
                                           <label style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">Age:</label>&nbsp; &nbsp; &nbsp;
                                           <label className="text-muted" style={{fontSize:"1.30rem"}}>{card.age}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                       <div className="col-sm-6">
                                           <label style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">City:</label> &nbsp;&nbsp; &nbsp;
                                           <label className="text-muted" style={{fontSize:"1.30rem"}}>{card.city}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                       
                                           
                                       <div className="col-sm-12">
                                           <label style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">Address:</label>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                           <label className="text-muted" style={{fontSize:"1.30rem"}}>{card.address}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                       <div className="col-sm-12">
                                           <label style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">Detail:</label>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                                           <label className="text-muted" style={{fontSize:"1.30rem"}}>{card.detail}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                       <div className="col-sm-12">
                                           <label style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">Email:</label>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                           <label className="text-muted" style={{fontSize:"1.30rem"}}>{card.emial}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                   </div>
                                <h2 className="mt-3 mx-3 ">Hospital's Detail</h2>
                               <hr className="bg-info  mt-0 w-50" />
                               <div className="row">
                                       <div className="col-sm-6">
                                           <label style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">Center:</label>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                                           <label className="text-muted" style={{fontSize:"1.30rem"}}>{card.center}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                       <div className="col-sm-6">
                                           <label style={{fontSize:"1.35rem"}} className="font-weight-bold mx-2">Doctor:</label>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                                           <label className="text-muted" style={{fontSize:"1.30rem"}}>{card.doctorName}</label>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                                       </div>
                                   </div>
                                   <h3 className="mt-3 mx-2 ">Comment for Doctor:</h3>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                                   <h4 className="mb-3 mx-2">{card.doctorComment}</h4>
 {/* calling detail from the database (named as cardin this section) using dot notaion card.someNameInDatabase */}
                               
                                   
                                 </div>
                                 
                       </div>
                       </div>
               </div>
           </div>
           </PDFExport>
       </div>
                </div>
            ))}
          
       
     </div>
     ):(
        navigate("/login") 
        // if user is not available then you will be thrown/ navigated to Login page  
      

)}
              
        </>
    )
}

export default Detail;