import './App.css'
import Edit from './components/Edit';
import Table from './components/Table';
import Insert from './components/Insert';
import Delete from './components/Delete';
import Update from './components/Update';
import { useState,useEffect } from "react";
// import axios from "axios";
import { BrowserRouter,Routes,Route, json } from 'react-router-dom';

function App() {

  const [Data,SetData] = useState([]);

  const fetchRecords = () => {
    if(localStorage.getItem("healthServices")===null){
      let healthServices = [];
      localStorage.setItem("healthServices",JSON.stringify(healthServices));
    }
    else{
      const records = JSON.parse(localStorage.getItem("healthServices"));
      SetData(records);
    }
    return Data;
  }
  useEffect(()=>{
      fetchRecords();
  },[])
      return (
        <div className='my-app'>
          <Edit getUpdatedData = {fetchRecords}/>
          <Table allrecords = {Data}/>
        </div>
        )
    }


function AppLayout(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
            <Route path='/' element={<Insert/>}></Route>
            <Route path='/Insert' element={<Insert/>}></Route>
            <Route path='/Delete' element={<Delete/>}></Route>
            <Route path='/Update' element={<Update/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppLayout;
