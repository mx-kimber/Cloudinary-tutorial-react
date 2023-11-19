import React from 'react'
import './App.css'

function App() {

  const uploadImage = (files) => {
    console.log(files[0]);
  }

  return (
    <div>
      <div className="heading">
        <h2>Implementing Cloudinary</h2>
      
      </div>
      <div className="input">
        <input 
          type="file"
          onChange={(event) => {
            uploadImage(event.target.files);
          }}
        />
      </div>
    </div>
  )
}

export default App
