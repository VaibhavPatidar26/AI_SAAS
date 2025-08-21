import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token, isLogout, setIsLogout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      //ye true hai
      if (isLogout) {
        //ye kabhi true hoga hee nhi setlog se false hai
        navigate("/", { replace: true });
        setIsLogout(false); 
        return
      } else {
        //aur agar khi kuch missing hai toh ye
        
        navigate("/login", { replace: true });
      }
    }
  }, [token, isLogout, navigate, setIsLogout]);

  if (!token) {
    //ye null render stay here 
    return null;
  }
//agar tokaen hua toh /prot
  return children;
};

export default ProtectedRoute;
