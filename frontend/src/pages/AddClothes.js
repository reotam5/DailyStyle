import axios from "axios";
import { useEffect, useState } from "react";

function AddClothes() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = process.env.REACT_APP_LOCAL_BASE_URL;
  } else {
    axios.defaults.baseURL = process.env.REACT_APP_PRODUCTION_BASE_URL;
  }

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
          console.log(data)
        } else {
          alert(data);
        }
      });
  }, []);

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(document.getElementById("title").value);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        token: token,
      },
    };
    axios.post("/api/clothings", {
        Token: token,
        Title: document.getElementById("title").value,
        Description: document.getElementById("description").value,
        Image: document.getElementById("image").value,
    }, config)
    .then((res) => {
        console.log(res);
    });
  }


  return (
    <>
      <div>
        <h1>Add Clothes</h1>
        <div>{}</div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input type="text" placeholder="title" id="title"/>
          <input type="text" placeholder="description" id="description"/>
          <input type="text" placeholder="image" id="image"/>
          <button>submit</button>
        </form>
      </div>
    </>
  );
}

export default AddClothes;
