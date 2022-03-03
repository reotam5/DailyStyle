import axios from 'axios';
import React, { useState, useEffect } from 'react';
 
function AddNewClothes() {
  const [fileState, setFileImage] = useState(null);
  const [myImage, setMyImage] = useState(null);
  
  // On file select (from the pop up)
  function onFileChange(event) {
    // Update the state of FileImage
    setFileImage(event.target.files[0]);
  };
  
  // On file upload (click the upload button)
  async function onFileUpload() {
    let base64 = await convertBase64(fileState);
    let imageType = base64.split(',')[0];
    let image = base64.split(',')[1];
    console.log(imageType);
    console.log(image);

    const myImage = { Image: image, ImageType: imageType };
    axios.post('https://localhost:7092/api/ClothingsImage', myImage).then(response => console.log(response.data.id));
  };

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

  async function getImage() {
    const myImage = await axios.get('https://localhost:7092/api/ClothingsImage/1');
    // console.log(myImage);
    // console.log(myImage.data.image);
    // console.log(myImage.data.imageType);
    setMyImage(myImage.data.imageType + ',' + myImage.data.image);
  }

  return (
    <div>
      <div>
          <input type="file" onChange={onFileChange} />
          <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:bg-green-700" onClick={onFileUpload}>
            Upload
          </button>
          <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:bg-green-700" onClick={getImage}>
            Get Image
          </button>
          <img src={myImage}/>
      </div>
    </div>
  );
}
 
  export default AddNewClothes;