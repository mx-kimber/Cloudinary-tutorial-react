import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [imageSelected, setImageSelected] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
  const [cloudinaryImages, setCloudinaryImages] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
  
    const fetchCloudinaryImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/images.json?folder=PridefulPack");
        setCloudinaryImages(response.data.resources);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCloudinaryImages();
  }, []);

  useEffect(() => {
    if (uploadSuccess) {
      const timeoutId = setTimeout(() => {
        setCloudinaryUrl(null);
        setUploadSuccess(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [uploadSuccess]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageSelected(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCloudinaryUrl(reader.result);
        setUploadSuccess(false);
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

      const updatedImagesResponse = await axios.get("http://localhost:3000/images.json?folder=PridefulPack");
      setCloudinaryImages(updatedImagesResponse.data.resources);
      setUploadSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="preview-image-container">
        {cloudinaryUrl && (
          <div>
            <img src={cloudinaryUrl} alt="Preview" className="preview-image" />
            {uploadSuccess && <p>Upload successful!</p>}
          </div>
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
      <div>
        <h3>Cloudinary Images</h3>
      </div> 
      <div className="image-container"> 
        <div className="image-wrap">
          {cloudinaryImages.map((image) => (
            <img 
              src={image.url} 
              key={image.public_id} 
              className="photo" 
              alt={image.public_id} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
