import React, { useState } from "react";
import axios from 'axios'
import Message from './Message'
import Progress from './Progress'

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("Upload images")
  const [img, setImg] = useState(null)
  const [message, setMessage] = useState(null)
  const [uploadPercent, setUploadPercent] = useState(0)

  const uploadBlog = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('timage', file)
    try{
        const res = await axios.post("http://localhost:5000/blog/", formData, {
          onUploadProgress: progressEvent => {
            setUploadPercent(parseInt(progressEvent.loaded * 100) / progressEvent.total)
          }
        })
        setImg(res.data)
        setMessage("File uploaded succesfully!")
    }
    catch(err){
        if(err.response.status === 400)setMessage("Not image selected")
        else{
          setMessage("Server error, please try again later!")
        }
    }
  }

  const handleImg = (e) => {
      setUploadPercent(0)
      if(e.target.files.length !== 0){
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
      }
      if(e.target.files.length === 0){
        setFileName("Upload images")
      }
  }
  return (
    <div>
      <form onSubmit={uploadBlog} encType="multipart/form-data">
        {message && <Message msg={message}/>}
        <div className="custom-file">
            <input name="timage" type="file" className="custom-file-input" onChange={handleImg}/>
            <label className="custom-file-label">
            {fileName}
            </label>
        </div>
        <Progress progress={uploadPercent}/>
        <button className="btn btn-primary mt-3">Upload</button>
        <div className="d-flex justify-content-center align-items-center" style={{height: 600}}>
            {img && <img src={img.filePath} alt="imageeee" style={{height: 400}}/> }
        </div>
      </form>
    </div>
  );
}
