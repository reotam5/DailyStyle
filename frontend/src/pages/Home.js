import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom"

function Home() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = process.env.REACT_APP_LOCAL_BASE_URL;
  } else {
    axios.defaults.baseURL = process.env.REACT_APP_PRODUCTION_BASE_URL;
  }

  let navigate = useNavigate();
  //sample code for using token
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        token: token,
      },
    };
    axios
      .get("/user", config)
      .then((res) => {
        const { status, data } = res.data;
        if (status === 0) {
          setUserInfo(data);
        } else {
          alert(data);
        }
      });
  }, []);
  return (
    <div>
      {userInfo ? (
        <div>
          <p>Hello, {userInfo.userName}</p>
          <p>Your password is {userInfo.password}</p>
          <p>Your token is {userInfo.token}</p>
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
