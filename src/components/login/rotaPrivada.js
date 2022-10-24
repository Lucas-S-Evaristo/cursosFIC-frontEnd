import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import Instrutor from "../instrutor/PgPricipal";

export default function RotaPrivada(){

   
    
      const token = localStorage.getItem("token");
      console.log("Token: ", token);

      if(token != null){


        console.log("OOOOOOOOOOOOOOOOOOOOOOOIIIIIIIIIIIIIIIIIIIIIIIIIIIIIS")

      return <Navigate to="/instrutores"/>

      }else{

        console.log("OOOOOOOOOOOOOOOOOOOOO")

        return <Navigate to="/"/>
      }
}