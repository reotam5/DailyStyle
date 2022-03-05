import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../lib/constant";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import Login from "./Login";
import ListItem from "../components/ListItem";

function ListClothes() {
  axios.defaults.baseURL = baseUrl;

  const { getAccessTokenSilently } = useAuth0();

  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    console.log(clothes);
  }, [clothes]);
  const getClothings = async () => {
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios
        .get("/api/clothings")
        .then((response) => {
          setClothes([...clothes, ...response.data]);
          console.log(clothes);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getClothings();
  }, []);
  return clothes == null ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1>list of clothes</h1>
      {clothes.map((cloth) => (
        <ListItem key={cloth.id} cloth={cloth} />
      ))}
    </div>
  );
}



export default withAuthenticationRequired(ListClothes, {
  onRedirecting: () => <Login />,
});
