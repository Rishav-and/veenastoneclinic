import { useState, useEffect } from "react";
import React from "react";
import { db } from "../Firebase";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,  faSearch} from '@fortawesome/free-solid-svg-icons';
import dayjs from "dayjs";
import Loading from "../loading/loading";

import { ExportCSV } from "../detail/export";

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') //extracting function from dayjs (7th line)
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore') //extracting function from dayjs (7th line)
dayjs.extend(isSameOrBefore) 
dayjs.extend(isSameOrAfter)


function Search (props) {
    const [loading, setLoading] = useState(true);  //bulean
    const [posts, setPosts]= useState([]);  //array
    const [ doc , setDoc] = useState([]);   //array
    const [searchTerm, setSearchTerm] = useState(""); //single input
    const [startDate , setStartDate] = useState("");  //single input
    const [endDate, setEndDate] = useState("");       //single input
    const [ docName, setDoctorName] = useState("");   //single input

    

    const {user} = props;  // calling from app.js
    const navigate = useNavigate(); // initilizing useNavigate

  

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
              
        });  //calling db from firebase then going in collection and retrieving data from it using onSanpshot.
        return () => details();
   
    }, []);  // checking and updating collection of doctors database stored in firebase
    

    useEffect(() => {
        const getPosts = [];
        const docDetail = db
        .collection("Doctors")
        .onSnapshot((querySnapshot) =>{
            querySnapshot.forEach((doc)=> {
              getPosts.push({
                  ...doc.data(),
                  key: doc.id,
              });
       
            });
            setDoc(getPosts); //calling db from firebase then going in collection and retrieving data from it using onSanpshot.
              
        });
        return () => docDetail();
             
    }, []);  // checking and updating collection of doctors database stored in firebase
    //this doctors database is created directly in firebase.  

    

    if(loading){
        return <Loading />;     //if loading is true this imported function will run.
    }

   

    return(
        <>
        {user? (
        
        <div>
  {/* using  bootstrap  */}
        <div className="container bg-light ">
        <div className="row gy-5 gx-5">
        
            <div className="searchBox"> 
            {/* custom css   */}
        <input 
         type="text" className="searchbox"
         
         placeholder="Search..."
         onChange={(event) => {
             setSearchTerm(event.target.value);
         }} />
{/* using onChange set the value when something is placed in the input box   */}
         
         <FontAwesomeIcon style={{color:"#4d74fb" ,height:"1.35rem"}} className="ms-2 search-icon" icon={faSearch} />
{/* icon importing from font awesome  */}
         &nbsp; &nbsp;
             &nbsp; &nbsp;
         <label>Doctor</label>
         &nbsp;&nbsp;
         <select className="search"
            value ={docName}
            onChange ={e => setDoctorName(e.target.value)}>
               <option value="">All</option>
               {doc.map((card) => ( 
                <option value={card.Name}>{card.Name}</option>
                ))}
{/* using onChange and set the value after selecting from the mapped contained */}
            </select>
{/* using select for having multiple option and nothing more than that */}
          &nbsp; &nbsp;
             &nbsp; &nbsp;
            <label htmlFor="checkdate">
              <strong>Start Date</strong>
            </label>
            &nbsp;&nbsp;
           <input className="search"
              type="date"
              id="startDate"
              onChange={(event) => {
                setStartDate(event.target.value);
            }}
            />
{/* using onChange set the value when something is placed in the input box /selected from */}
           
            
           &nbsp; &nbsp;
     
             &nbsp; &nbsp;
            <label htmlFor="checkdate">
              <strong>End Date</strong>
            </label>
            &nbsp;&nbsp;
            <input
              type="date"
              className="search"
              id="endDate"
              onChange={(event) => {
                setEndDate(event.target.value);
            }}
            
            />
            {/* using onChange set the value when some date is selected in the input box  */}
            

            
&nbsp; &nbsp;
             &nbsp; &nbsp;
           
           </div>
           <div>
            
     {/* for exporting content in the form of execl sheet  */}
                <ExportCSV csvData={

    //writting ever possible search combination so that at any combination search doesn't crash 
                 posts.filter((val) => {

                    
 //   comparing values in the search boxes to the values retrieved from the firebase.  and downloading result accordingly
        
                
                    if (searchTerm === "" && docName === "" && startDate === "" && endDate === "" ) {
                       
                        return (   
                                              
                           val
                           )
                          
                        
                       }
                       
                    else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && dayjs(val.date).isSameOrAfter(dayjs(startDate)) &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                       
                       return val
                   }
   
   
                    else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && docName === "" && startDate === "" && endDate === "" ) {
                       return val
                   }
                   else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && startDate === "" && endDate === "" ) {
                       return val
                   }
                   else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && docName === "" && startDate === "" &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                       return val
                   }
                   else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && docName === "" && dayjs(val.date).isSameOrAfter(dayjs(startDate)) && endDate === "" ) {
                       return val
                   }
                   else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && docName === "" && dayjs(val.date).isSameOrAfter(dayjs(startDate)) &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                       return val
                   }
                   else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && dayjs(val.date).isSameOrAfter(dayjs(startDate)) &&  endDate === "" ) {
                       return val
                   }
   
                   else if (searchTerm === "" && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && startDate === "" && endDate === "" ) {
                       return val
                   }
   
                   else if (searchTerm === "" && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && dayjs(val.date).isSameOrAfter(dayjs(startDate)) && endDate === "" ) {
                       return val
                   }
                   else if (searchTerm === "" && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && startDate === "" && dayjs(val.date).isSameOrBefore(dayjs(endDate))  ) {
                       return val
                   }
                   else if (searchTerm === "" && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && dayjs(val.date).isSameOrAfter(dayjs(startDate)) &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                       return val
                   }
                   
                    else if( searchTerm === "" && docName === "" && dayjs(val.date).isSameOrAfter(dayjs(startDate)) && endDate === ""  ){
                        return val
                 
                    }   
                    else if(searchTerm === "" && docName === "" && startDate === "" &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                       return val
                   }
                   else if(searchTerm === "" && docName === "" && dayjs(val.date).isSameOrAfter(dayjs(startDate))  &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                       console.log(val)
                       return val
                   }
                } )   
                } fileName= "Xl" buttonText="export"/>   
                {/* exporting according to the seached object  */}
                </div>
         
          
            
             

         {posts.length > 0 ? (

            //writting ever possible search combination so that at any combination search doesn't crash 

             posts.filter((val) => {
                

 //   comparing values in the search boxes to the values retrieved from the firebase.  and showing result accordingly  
                 if (searchTerm === "" && docName === "" && startDate === "" && endDate === "" ) {
                    
                     return (   
                                           
                        val
                        )
                       
                     
                    }
                else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && dayjs(val.date).isSameOrAfter(dayjs(startDate)) &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                    
                    return val
                }


                 else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && docName === "" && startDate === "" && endDate === "" ) {
                    return val
                }
                else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && startDate === "" && endDate === "" ) {
                    return val
                }
                else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && docName === "" && startDate === "" &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                    return val
                }
                else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && docName === "" && dayjs(val.date).isSameOrAfter(dayjs(startDate)) && endDate === "" ) {
                    return val
                }
                else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && docName === "" && dayjs(val.date).isSameOrAfter(dayjs(startDate)) &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                    return val
                }
                else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && dayjs(val.date).isSameOrAfter(dayjs(startDate)) &&  endDate === "" ) {
                    return val
                }

                else if (searchTerm === "" && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && startDate === "" && endDate === "" ) {
                    return val
                }

                else if (searchTerm === "" && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && dayjs(val.date).isSameOrAfter(dayjs(startDate)) && endDate === "" ) {
                    return val
                }
                else if (searchTerm === "" && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && startDate === "" && dayjs(val.date).isSameOrBefore(dayjs(endDate))  ) {
                    return val
                }
                else if (searchTerm === "" && val.doctorName.toLowerCase().includes(docName.toLowerCase()) && dayjs(val.date).isSameOrAfter(dayjs(startDate)) &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                    return val
                }
                
                 else if( searchTerm === "" && docName === "" && dayjs(val.date).isSameOrAfter(dayjs(startDate)) && endDate === ""  ){
                     return val
              
                 }   
                 else if(searchTerm === "" && docName === "" && startDate === "" &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                    return val
                }
                else if(searchTerm === "" && docName === "" && dayjs(val.date).isSameOrAfter(dayjs(startDate))  &&  dayjs(val.date).isSameOrBefore(dayjs(endDate)) ) {
                    console.log(val)
                    return val
                }
               
             
               
 

                

             } ).map((post ) => 
             //according to search what to show   sees through mapping and displaying accordingly
             
             <>
             
             {/* using bootstrap   */}
             <div key={post.key} className="col-md-4 mb-4 "> 
            
                     
             <div style={{ cursor:"pointer"}} 
             onClick={() => {navigate("/search/"+post.id) }}
             //according to the clicked card will go to the detail page of the card   using useParams
           
             className="card  ms-3 me-3 rounded hoverCss " >
             
                     
                    <div   className="bg-primary card-img-top   ">
                               <div className=" text-center text-white ">
                               <FontAwesomeIcon className="fas fa-7x mt-4 mb-4 " icon={faUser} />
                               
                              </div>
                             
                           </div> 
                           <div className="bg-light  rounded pb-3 pt-3">
                           <h3 className="text-center">{post.name}</h3>
                           <h3 className="text-center">{post.date}</h3>
                           <h3 className="text-center">{post.doctorName}</h3>
                          
                           
               
           
                           </div>
                        
                          
                        
                 
                           
                  
             </div>
            
              
             </div>
             </>
             )
             
             
         ):<h1>no post till date</h1>}
         </div>
        
                  
         
            </div>
            </div>             
             ):(

// if user is not logged in then redirecting it to login page 
        navigate("/login") 

)}
        </>
    );
}

export default Search;


  
