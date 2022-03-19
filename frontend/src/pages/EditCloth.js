import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { baseUrl } from "../lib/constant";
import { useNavigate } from "react-router";
import Home from "./Home";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  Input,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useLocation } from 'react-router-dom';

function EditCloth() {
  const navigation = useNavigate();
  axios.defaults.baseURL = baseUrl;

  const { getAccessTokenSilently } = useAuth0();

  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const getClothings = async (e) => {
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(`/api/clothings/${id}`)
      .then((response) => {
        loadClothImage(response);
        loadTitle(response);
        loadDescription(response);
      })
    } catch (error) {
      toast.error(error.message);
    }
  }

  const loadClothImage = (response) => {
    let imageType = response.data.imageType;
    let image = response.data.image;
    let imageComplete = imageType + "," + image;
    setBase64(imageComplete);
  }

  const loadTitle = (response) => {
    let title = response.data.title;
    document.getElementById("title").value = title;
  }

  const loadDescription = (response) => {
    let description = response.data.description;
    document.getElementById("description").value = description;
  }

  useEffect(() => {
    getClothings();
  }, [""]);

  const [base64, setBase64] = useState(null);
  const postClothings = async (e) => {
    e.preventDefault();
    let imageType = "";
    let image = "";
    if (base64 !== null) {
      imageType = base64.split(",")[0];
      image = base64.split(",")[1];
    }

    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(selectedTags.map((t) => t.id));
      const response = await axios
        .post("/api/clothings", {
          Title: [document.getElementById("title").value],
          Description: [document.getElementById("description").value],
          Image: [image],
          ImageType: [imageType],
          Tags: selectedTags.map((t) => t.id),
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

  const [fileState, setFileImage] = useState(null);

  useEffect(() => {
    if (setFileImage == null) {
      return undefined;
    }
    (async () => {
      setBase64(await convertBase64(fileState));
    })();
  }, [fileState]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [isTagInputOpen, setTagInputOpen] = useState(false);
  const [loading, setLoading] = useState(isTagInputOpen);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const getTags = async (e) => {
    try {
      const token = await getAccessTokenSilently();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios
        .get("/api/tags")
        .then((response) => {
          setLoading(false);
          setTags(response.data);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    let active = true;
    if (!isTagInputOpen) {
      return undefined;
    }
    (async () => {
      if (active) {
        setLoading(true);
        await getTags();
      }
    })();
    return () => {
      active = false;
    };
  }, [isTagInputOpen]);

  return (
    <Box sx={{ paddingTop: 1 }}>
      <Divider>
        <b>Edit Clothes</b>
      </Divider>
      <Container maxWidth="sm" sx={{ paddingBottom: 5 }}>
        {base64 && (
          <img
            src={base64}
            alt="selected image"
            style={{ margin: "auto auto" }}
          />
        )}
        <form onSubmit={postClothings}>
          <FormControl fullWidth margin="normal">
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(event) => {
                  setFileImage(event.target.files[0]);
                }}
                sx={{ display: "none" }}
              />

              <Button
                color="primary"
                aria-label="upload picture"
                component="span"
                variant="outlined"
                startIcon={<PhotoCamera />}
                fullWidth
              >
                Upload
              </Button>
            </label>
            <TextField
              margin="dense"
              required
              id="title"
              label="Title"
              variant="outlined"
              focused
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              variant="outlined"
              focused
            />
            <Autocomplete
              multiple
              open={isTagInputOpen}
              onOpen={() => {
                setTagInputOpen(true);
              }}
              onClose={() => {
                setTagInputOpen(false);
              }}
              onChange={(event, value) => {
                setSelectedTags(value);
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.title}
              options={tags}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <Button variant="contained" type="submit">
              Add
            </Button>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
}
// export default withAuthenticationRequired(EditCloth, {
//   onRedirecting: () => <Home />,
// });
export default EditCloth;
