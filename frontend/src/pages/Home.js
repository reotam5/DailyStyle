import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { baseUrl } from "../lib/constant";

function Home() {
  axios.defaults.baseURL = baseUrl;
  let navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Hello, {user.name}</p>
          <button onClick={() => navigate("/addclothes")}>Add Clothes</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <button onClick={()=>{navigate("/login")}}>Click here</button>
        </div>
      )}
    </div>
  );
}

export default Home;
