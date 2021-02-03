import React, { useState, useEffect } from "react";
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";
import { Editor } from "@tinymce/tinymce-react";
import Prism from "prismjs";

export default function FileUpload() {
  useEffect(() => {
    Prism.highlightAll();
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Upload images");
  const [message, setMessage] = useState(null);
  const [img, setImg] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);
  const [title, setTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    img: "",
    body: "",
  });
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("timage", file);
    try {
      const res = await axios.post("http://localhost:5000/blog/createimg", formData, {
        headers: {
          'content-type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercent(
            parseInt(progressEvent.loaded * 100) / progressEvent.total
            );
          },
        });
      setImg(res.data.filePath)
      setMessage("File uploaded succesfully!");
    } catch (err) {
      if (err.response.status === 400) setMessage("Not image selected");
      else {
        setMessage("Server error, please try again later!");
      }
    }
  };

  const handleImg = (e) => {
    setUploadPercent(0);
    if (e.target.files.length !== 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
    if (e.target.files.length === 0) {
      setFileName("Upload images");
    }
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleEditorChange = (content) => {
    setBlogBody(content);
  };

  const handleBlog = (e) => {
    e.preventDefault()
    setBlog({ img: img, body: blogBody, title: title})
  }
  return (
    <div>
      <form onSubmit={handleBlog}>
        <div className="input-group mb-3">
          <input
            onChange={handleTitle}
            type="text"
            className="form-control"
            placeholder="Title"
          />
        </div>
        {message && <Message msg={message} />}
        <div className="custom-file">
          <input
            name="timage"
            type="file"
            className="custom-file-input"
            onChange={handleImg}
          />
          <label className="custom-file-label">{fileName}</label>
        </div>
        <div onClick={uploadImage} className="btn btn-primary mt-3">Upload</div>
        <Progress progress={uploadPercent}/>
        <Editor
          apiKey="vg0xjcazbqoqck8epvkf9drt57lat3tyo4yycxzxupilmq1o"
          init={{
            height: 500,
            content_style:
              "body{font-family: 'Prata', serif;} h1, h2, h3, h4, h5, h6, p{ margin: 0 0 16px 0}",
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks fullscreen imagetools",
              "insertdatetime media table paste help wordcount codesample",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | fontselect | image imagetools\
             bullist numlist outdent indent | removeformat | help | codesample | blockquote | pre",
          }}
          onEditorChange={handleEditorChange}
        />
        <button className="btn btn-primary mt-3">Upload</button>
      </form>
    </div>
  );
}
