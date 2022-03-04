import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../lib/constant";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import Login from "./Login";

function ListClothes() {
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
        <ClothItem
          key={cloth.id}
          title={cloth.title}
          description={cloth.description}
          image={cloth.image}
          tags={[]}
        />
      ))}
    </div>
  );
}

const ClothItem = ({ title, description, image, tags }) => {
  return (
    <div className="ring-1 ring-slate-400 rounded-md m-4">
      <img src={image} />
      <div>title: {title}</div>
      <div>description: {description}</div>
      <div>tags:</div>
      {tags.map((tag) => (
        <div key={tag}>tag: {tag}</div>
      ))}
    </div>
  );
};

export default withAuthenticationRequired(ListClothes, {
  onRedirecting: () => <Login />,
});
