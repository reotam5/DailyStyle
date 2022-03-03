import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Login from "./Login";
import { toast } from 'react-toastify';
import { baseUrl } from "../lib/constant";

function AddClothes() {
  axios.defaults.baseURL = baseUrl;

  const { getAccessTokenSilently } = useAuth0();

  const [clothes, setClothes] = useState([]);
  const getClothings = async () => {
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios
        .get("/api/clothings")
        .then((response) => {
          setClothes(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const postClothings = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios
        .post("/api/clothings",{
          "Title": document.getElementById("title").value,
          "Description": document.getElementById("description").value,
          "Image": document.getElementById("image").value,
        })
        .then((response) => {
          setClothes(prev=>[...prev, response.data]);
          console.log(clothes);
          toast.success("Clothing added successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getClothings();
  }, []);

  return (
    <>
      <div>
        <h1>Add Clothes</h1>
        <div>{}</div>
        <form className="flex flex-col" onSubmit={postClothings}>
          <input type="text" placeholder="title" id="title" />
          <input type="text" placeholder="description" id="description" />
          <input type="text" placeholder="image" id="image" />
          <button>submit</button>
        </form>
      </div>
    </>
  );
}

export default withAuthenticationRequired(AddClothes, {
  onRedirecting: () => <Login />,
});
