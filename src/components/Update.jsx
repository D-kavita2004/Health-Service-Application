// import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
const Insert = ()=>{
   const [Price,setPrice] = useState(null);
   const [Name,setName] = useState("");
   const [Description,setDescription] = useState("");

   const [Errors,setErrors] = useState({
      Price:"",
      Name:"",
      Description:""
   })

   const getUpdatedData = useOutletContext();

   const validate = ()=>{
      let valid = true;
      const newErrors = {
         Price:"",
         Name:"",
         Description:""
      };
      const Pattern = /^[A-Za-z\s]{2,80}$/;
      if(!Pattern.test(Name)){
         newErrors.Name = true;
         valid = false;
      }
      if(!Pattern.test(Description)){
         newErrors.Description = true;
         valid=false;
      }
      setErrors(newErrors);
      return valid;
   }
   const deleteRecord = (event)=>{
      event.preventDefault();
      if(validate()){
         let info = "not found";
         let allrecords= getUpdatedData();
         allrecords = allrecords.map((record)=>{
            if(record.Name.toLowerCase() === Name.toLowerCase()){
               record.Description = Description;
               record.Price = Price;
               info = "found";
               return record;
            }
            return record;
         })
         if(info === "not found"){
            alert("Could not found the mentioned Health Service to Update");
         }
         else{
            localStorage.setItem("healthServices",JSON.stringify(allrecords));
            alert("record updated sucessfully");
            getUpdatedData();
         }

      }
   }
   return(
      <div className="edit-form-container">
         <h1>Update</h1>
         <form action="" method="post" className="form" onSubmit={deleteRecord}>
            <div className="field">
                 <div className="input-container">
                     <label for="name" >Name:</label>
                     <input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}}required/>
                 </div>
                  {Errors.Name?<p className="invalid-input">Name should contain only alphabets and spaces</p>:null}
            </div>
            <div className="field">
                  <div className="input-container">
                        <label for="description" >Description:</label>
                        <input type="text" id="description" name="description" onChange={(e)=>{setDescription(e.target.value)}} required/>
                  </div>
                  {Errors.Description?<p className="invalid-input">Description should contain only alphabets and spaces</p>:null}
            </div>
            <div className="field">
                  <div className="input-container">
                     <label for="price" >Price</label>
                     <input type="number" id="price" name="price" onChange={(e)=>{setPrice(e.target.value)}} required placeholder="Indian rupees only"/>
                  </div>
                  {(Errors.Price)?<p className="invalid-input">Indian standard currency</p>:null}
            </div>
            <button type="submit" className="form-btn">Submit</button>
         </form>   
      </div>
   )
}
export default Insert;