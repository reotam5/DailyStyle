import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Login from "./Login";
import { toast } from "react-toastify";
import { baseUrl } from "../lib/constant";
import { useNavigate } from "react-router";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

function AddClothes() {
  const navigation = useNavigate();
  axios.defaults.baseURL = baseUrl;

  const { getAccessTokenSilently } = useAuth0();

  const [selectedTags, setSelectedTags] = useState([]);
  const postClothings = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios
        .post("/api/clothings", {
          Title: [document.getElementById("title").value],
          Description: [document.getElementById("description").value],
          Image: [document.getElementById("image").value],
          Tags: selectedTags,
        })
        .then((response) => {
          navigation("/ListClothes");
          toast.success("Clothing added successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const postTag = async (e) => {
    var tag = document.getElementById("tag").value;
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios
        .post("/api/tags", {
          Title: tag,
        })
        .then((response) => {
          setTags([...tags, response.data]);
          toast.success("Tag added successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [tags, setTags] = useState([]);
  const getTags = async (e) => {
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios
        .get("/api/tags")
        .then((response) => {
          setTags(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getTags();
  }, []);

  const handleCheck = (e) => {
    if (e.target.checked) {
      setSelectedTags([...selectedTags, e.target.value]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== e.target.value));
    }
  }

  return (
    <>
      <div>
        <h1>Add Clothes</h1>
        <form className="flex flex-col" onSubmit={postClothings}>
          <input type="text" placeholder="title" id="title" />
          <input type="text" placeholder="description" id="description" />
          <input type="text" placeholder="image" id="image" />
          <fieldset id="tags">
            <legend>Tags</legend>
            {tags.map((tag) => (
              <>
                <input
                  type="checkbox"
                  id={tag.id}
                  key={tag.id}
                  value={tag.id}
                  onChange={handleCheck}
                />
                <label htmlFor={tag.id}>{tag.title}</label>
              </>
            ))}
          </fieldset>
          <button>submit</button>
        </form>

        <h1>Create a tag</h1>
        <form className="flex flex-col" onSubmit={postTag}>
          <input type="text" placeholder="tag" id="tag" />
          <button>submit</button>
        </form>
      </div>
    </>
  );
}

export default withAuthenticationRequired(AddClothes, {
  onRedirecting: () => <Login />,
});
