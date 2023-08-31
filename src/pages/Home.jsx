import React, { useEffect } from 'react'
import AddIcon from "@mui/icons-material/Add";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Patient from "../components/Patient";
import Box from "@mui/material/Box";
import useLocalStorage from '../utils/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [addAppointment, setAddAppointment] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);

  useEffect(()=>{
    if(token===null){
      navigate('/enter')
    }
  },[])
   return (
    <div className=" bg-slate-50">
      <Navbar />
      <Box sx={{ height: 320, flexGrow: 1 }} className="fixed ">
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: "fixed", bottom: 40, right: 40 }}
          icon={<SpeedDialIcon openIcon={<AddIcon />} />}
          onClick={() => setAddAppointment(true)}
        ></SpeedDial>
      </Box>
      <Patient
        addAppointment={addAppointment}
        setAddAppointment={setAddAppointment}
      />
    </div>
  );
}

export default Home