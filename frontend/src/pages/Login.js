import { useEffect, useRef  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    loginWithRedirect();
  }, []);
  return (
    <div> Redirecting to login page... </div>
  );
}

export default Login;
