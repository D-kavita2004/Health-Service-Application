// import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Delete = ()=>{

   const [Name,setName] = useState(null);
   const getUpdatedData = useOutletContext();

   const deleteRecord = (event) => {
      event.preventDefault();
       let allrecords = getUpdatedData();
       let info = "not found";
      allrecords= allrecords.filter((record)=>{
            if(record.Name.toLowerCase() === Name.toLowerCase()){
               info = "found";
            }
            return record.Name.toLowerCase() != Name.toLowerCase();
         })
      if(info === "found"){
         localStorage.setItem("healthServices",JSON.stringify(allrecords));
         alert("Record Deleted Sucessfully");
         getUpdatedData();
      }
      else{
         alert("Could not found record to be deleted");
      }
      
   }
   

   return(
      <div className="edit-form-container">
         <h1>Delete</h1>
         <form className="form" onSubmit={deleteRecord}>
            <div className="field">
               <div className="input-container">
                     <label for="name" >Name:</label>
                     <input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}}required/>
                     {/* {(Error)?<p className="invalid-input">❌ Record not found</p>:<p>✅ Record Found</p>} */}
               </div>
           
            </div>
            <button type="submit" className="form-btn">Submit</button>
         </form>   
      </div>
   )
}
export default Delete;