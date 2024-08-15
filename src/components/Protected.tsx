import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({
  children,
  authentication = true,
}: {
  children: React.ReactNode;
  authentication: boolean;
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state: any) => state?.auth.isLoggedIn);


  useEffect(() => {
    if(authentication === true && authStatus === true){
      // The user is good to go
      
    } else if(authentication === true && authStatus === false){
      // Navigate the user to either login/signup/homepages
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
