import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../lib/constant";
import Login from "../pages/Login";

function AddNewClothes() {
  const { getAccessTokenSilently } = useAuth0();

  const [fileState, setFileImage] = useState(null);
  const [myImage, setMyImage] = useState(null);

  // On file select (from the pop up)
  function onFileChange(event) {
    // Update the state of FileImage
    setFileImage(event.target.files[0]);
  }

  // On file upload (click the upload button)
  async function onFileUpload() {
    let base64 = await convertBase64(fileState);
    let imageType = base64.split(",")[0];
    let image = base64.split(",")[1];
    console.log(imageType);
    console.log(image);

    const myImage = { Image: image, ImageType: imageType };
    const token = await getAccessTokenSilently();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.baseURL = baseUrl;
    axios
      .post("/api/ClothingsImage", myImage)
      .then((response) => console.log(response.data.id));
  }

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

  const handleGetImage = async () => {
    const token = await getAccessTokenSilently();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.baseURL = baseUrl;
    const response = await axios.get("/api/ClothingsImage/1");
    console.log(response);
    console.log(response.data.image);
    console.log(response.data.imageType);

    console.log("HI");
    setMyImage(response.data.imageType + "," + response.data.image);
  }


  useEffect(()=>{
    console.log(myImage);
  },[myImage]);

  return (
    <div>
      <div>
        <input type="file" onChange={onFileChange} />
        <button
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:bg-green-700"
          onClick={onFileUpload}
        >
          Upload
        </button>
        <button
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:bg-green-700"
          onClick={handleGetImage}
        >
          Get Image
        </button>
        <img src={myImage} />
      </div>
    </div>
  );
}

export default withAuthenticationRequired(AddNewClothes, {
  onRedirecting: () => <Login/>,
});
