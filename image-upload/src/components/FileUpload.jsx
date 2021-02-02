import React, { useState } from "react";
import axios from 'axios'

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("Upload images")
  const [img, setImg] = useState(null)

  const uploadBlog = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('timage', file)
    try{
        const res = await axios.post("http://localhost:5000/blog/", formData)
        setImg(res.data)
    }
    catch(err){
        console.log(err)
    }
  }

  const handleImg = (e) => {
      setFile(e.target.files[0])
      setFileName(e.target.files[0].name)
  }
  return (
    <div>
      <form onSubmit={uploadBlog}>
        <div className="custom-file">
            <input name="timage" type="file" className="custom-file-input" onChange={handleImg}/>
            <label className="custom-file-label">
            {fileName}
            </label>
        </div>
        <button className="btn btn-primary mt-3">Upload</button>
        <div className="d-flex justify-content-center align-items-center" style={{height: 600}}>
            {img && <img src={img.filePath} alt="imageeee" style={{height: 400}}/> }
        </div>
      </form>
    </div>
  );
}
