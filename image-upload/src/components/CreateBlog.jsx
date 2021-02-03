import React, { Component } from "react";
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";
import { Editor } from "@tinymce/tinymce-react";
import Prism from "prismjs";

class CreateBlog extends Component {
  state = {
    file: null,
    fileName: "Upload images",
    message: null,
    imgPath: "",
    uploadPercent: 0,
    title: "",
    blogBody: "",
    blog: {
      title: "",
      img: "",
      body: "",
    },
  };
  componentDidMount() {
    Prism.highlightAll();
  }
  componentDidUpdate() {
    Prism.highlightAll();
  }

  handleEditorChange = (content) => {
    this.setState({ blogBody: content });
  };
  handleTitle = (e) => {
    this.setState({title: e.target.value});
  };

  handleImg = (e) => {
    this.setState({uploadPercent: 0});
    if (e.target.files.length !== 0) {
      this.setState({file: e.target.files[0]});
      this.setState({fileName :e.target.files[0].name});
    }
    if (e.target.files.length === 0) {
      this.setState({fileName: "Upload images"});
    }
  };

  uploadImage = async () => {
    const formData = new FormData();
    formData.append("timage", this.state.file);
    try {
      const res = await axios.post("http://localhost:5000/blog/createimg", formData, {
        headers: {
          'content-type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          this.setState({uploadPercent: parseInt(progressEvent.loaded * 100) / progressEvent.total});
          },
        });
      this.setState({imgPath: res.data.filePath})
      this.setState({message: "File uploaded succesfully!"});
    } catch (err) {
      if (err.response.status === 400) this.setState({message: "Not image selected"});
      else {
        this.setState({message: "Server error, please try again later!"});
      }
    }
  };

  handleBlog = (e) => {
    e.preventDefault()
    this.setState({ blog: {img: this.state.imgPath, body: this.state.blogBody, title: this.state.title}}, async () => {
        const result = await axios.post("http://localhost:5000/blog/", this.state.blog)
        console.log(result)
    })
}

  render() {
    return (
      <div className="container mt-4">
        <form onSubmit={this.handleBlog}>
          <div className="input-group mb-3">
            <input
              onChange={this.handleTitle}
              type="text"
              className="form-control"
              placeholder="Title"
            />
          </div>
          {this.state.message && <Message msg={this.state.message} />}
          <div className="custom-file">
            <input
              name="timage"
              type="file"
              className="custom-file-input"
              onChange={this.handleImg}
            />
            <label className="custom-file-label">{this.state.fileName}</label>
          </div>
          <div onClick={this.uploadImage} className="btn btn-primary mt-3">
            Upload
          </div>
          <Progress progress={this.state.uploadPercent} />
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
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | fontselect | image imagetools |bullist numlist outdent indent | removeformat | help | codesample | blockquote | pre",
            }}
            onEditorChange={this.handleEditorChange}
          />
          <button className="btn btn-primary my-3">Upload</button>
        </form>
      </div>
    );
  }
}

export default CreateBlog;
