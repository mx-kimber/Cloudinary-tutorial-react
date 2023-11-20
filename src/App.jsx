import React, { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {

  const [imageSelected, setImageSelected] = useState();

  const uploadImage = () => {
    const formData= new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset", "CLOUDINARY-UPLOAD-PRESET-NAME")

    axios.post(
      "https://api.cloudinary.com/v1_1/YOUR-CLOUD-NAME/image/upload", 
      formData
    ).then((response) => {
      console.log(response);
    });
  
  };

  return (
    <div>
      <div className="heading">
        <h2>Implementing Cloudinary</h2>
      
      </div>
      <div className="input">
        <input 
          type="file"
          onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}
        />
        <button onClick={uploadImage}> Upload Image </button>
      </div>
    </div>
  )
}

export default App
