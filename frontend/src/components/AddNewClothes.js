import axios from 'axios';
import React, { useState } from 'react';
 
function AddNewClothes() {
  const [fileState, setFileState] = useState(null);
  const [myImage, setMyImage] = useState(null);
  
  // On file select (from the pop up)
  function onFileChange(event) {
    // Update the state
    setFileState(event.target.files[0]);
  };
  
  // On file upload (click the upload button)
  async function onFileUpload() {
    console.log(fileState);
    const base64 = await convertBase64(fileState);
    console.log(base64);
    setMyImage(base64);
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

    return (
    <div>
      <div>
          <input type="file" onChange={onFileChange} />
          <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:bg-green-700" onClick={onFileUpload}>
            Upload
          </button>
          <img src={myImage}/>
      </div>
    </div>
  );
}
 
  export default AddNewClothes;