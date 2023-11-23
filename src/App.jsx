import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [imageSelected, setImageSelected] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
  const [cloudinaryImages, setCloudinaryImages] = useState([]);

  useEffect(() => {
  
    const fetchCloudinaryImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/images.json");
        setCloudinaryImages(response.data.resources);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCloudinaryImages();
  }, []);

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
      <div className="preview-image-container">
        {cloudinaryUrl && (
          <img src={cloudinaryUrl} alt="Preview" className="preview-image" />
        )}
      </div>

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
      
      <div className="image-container"> 
        <div className="heading"
>         <h3>Cloudinary Images</h3>
        </div> 
        <div className="image-wrap">
          {cloudinaryImages.map((image) => (
            <img src={image.url} className="photo" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
