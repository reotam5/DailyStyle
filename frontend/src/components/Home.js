import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"

function Home() {
  let history = useHistory();
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
      .get(`${process.env.REACT_APP_BASE_URL}/user`, config)
      .then((res) => {
        const { status, data } = res.data;
        if (status == 0) {
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
          <button onClick={()=>{history.push("/login")}}>Click here</button>
        </div>
      )}
    </div>
  );
}

export default Home;
