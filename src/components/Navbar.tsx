import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const Navbar: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <AppBar position="static">
        <Toolbar sx={{display: "flex", justifyContent:"flex-end"}}>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/create")}>Create</Button>
        </Toolbar>
      </AppBar>
    );
  };


export default Navbar