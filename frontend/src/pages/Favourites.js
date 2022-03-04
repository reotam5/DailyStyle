import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../lib/constant";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import Login from "./Login";

function Favourites() {
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
        .get("/api/clothings/fav")
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
        <ClothItem
          key={cloth.id}
          id={cloth.id}
          title={cloth.title}
          description={cloth.description}
          image={cloth.image}
          tags={cloth.tags}
          isFavorite={cloth.isFavorite}
        />
      ))}
    </div>
  );
}

const ClothItem = ({ id, title, description, image, tags, isFavorite }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const handleClick = async () => {
    let newIsFavorite = !isFavoriteState;
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios
        .put("/api/clothings/fav/" + id, {
          isFavorite: newIsFavorite,
        })
        .then((response) => {
          setIsFavoriteState(newIsFavorite);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="ring-1 ring-slate-400 rounded-md m-4">
      <img src={image} />
      <div>title: {title}</div>
      <div>description: {description}</div>
      <div>tags:</div>
      {tags.map((tag) => (
        <div key={tag.title}>tag: {tag.title}</div>
      ))}
        <button onClick={handleClick}>
        {isFavoriteState ? "Remove from favourites" : "Add to favourites"}
        </button>
    </div>
  );
};

export default withAuthenticationRequired(Favourites, {
  onRedirecting: () => <Login />,
});
