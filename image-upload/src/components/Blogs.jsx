import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import BlogContext from "../Context"
import Blog from "./Blog";

class Blogs extends Component {
  static contextType = BlogContext
  state = {
    blogs: [],
    other: "",
  };
  componentDidMount() {
    const {getBlogs, blogs} = this.context
    getBlogs()
    this.setState({ blogs: blogs })
  }
  componentDidUpdate() {
    const {blogs} = this.context
    if(this.state.blogs !== blogs){
      this.setState({ blogs: blogs })
    }
  }
  render() {
    
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-around flex-wrap">
        {this.state.blogs.length !== 0 && this.state.blogs.map((blog) => (
          <div className="card mb-4" style={{width: "18rem"}} key={blog._id}>
            <img className="card-img-top" src={blog.img.length === 0 ? "/upload/images/thumbnail.svg" : blog.img} alt="caption" style={{height: 180}}/>
            <div className="card-body">
              <h5 className="card-title">Tilekbergen</h5>
              <p className="card-text" style={{height: 72, textOverflow: 'ellipsis'}}>
                {blog.title}
              </p>
              <Link to={`/blogs/${blog._id}`} className="btn btn-primary">
                Go somewhere
              </Link>
            </div>
          </div>
        ))}
        </div>
      </div>
    );
  }
}
export default Blogs;

