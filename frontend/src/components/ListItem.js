import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../lib/constant";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const ListItem = ({ cloth }) => {
  const [id, title, description, image, imageType, tags, isFavorite] = [
    cloth.id,
    cloth.title,
    cloth.description,
    cloth.image,
    cloth.imageType,
    cloth.tags,
    cloth.isFavorite,
  ];

  const { getAccessTokenSilently } = useAuth0();
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const handleClick = async () => {
    let newIsFavorite = !isFavoriteState;
    try {
      const token = await getAccessTokenSilently();
      axios.baseUrl = baseUrl;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios
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
      <img src={imageType + "," + image} />
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

export default ListItem;
