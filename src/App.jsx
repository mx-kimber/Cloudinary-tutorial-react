import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [imageSelected, setImageSelected] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageSelected(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCloudinaryUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);

    try {
      const response = await axios.post("http://localhost:3000/upload_image.json", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="heading">
        <h2>Implementing Cloudinary</h2>
      
      </div>
      <div className="input">
        <input
          type="file"
          onChange={handleImageChange}
        />
        <button onClick={uploadImage}> Upload Image </button>
      </div>
      <div className="preview-image-container">
        {cloudinaryUrl && (
          <img src={cloudinaryUrl} alt="Preview" className="preview-image" />
        )}
      </div>
    </div>
  )
}

export default App
