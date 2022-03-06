import axios from "axios";
import { useNavigate  } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { baseUrl } from "../lib/constant";

function Home() {
  axios.defaults.baseURL = baseUrl;
  let navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  
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
        </div>
      )}
    </div>
  );
}

export default Home;
