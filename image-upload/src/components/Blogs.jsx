import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

class Blogs extends Component {
  state = {
    blogs: [],
    other: "",
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/blog/")
      .then((result) => this.setState({ blogs: result.data }))
      .catch((err) => console.log(err.response));
  }
  render() {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-around flex-wrap">
        {this.state.blogs.map((blog) => (
          <div className="card mb-4" style={{width: "18rem"}} key={blog._id}>
            <img className="card-img-top" src={blog.img.length === 0 ? "/upload/images/thumbnail.svg" : blog.img} alt="caption" style={{height: 180}}/>
            {console.log(blog)}
            <div className="card-body">
              <h5 className="card-title">Tilekbergen</h5>
              <p className="card-text" style={{height: 72, textOverflow: 'ellipsis'}}>
                {blog.title}
              </p>
              <Link to={`/blog/${blog._id}`} className="btn btn-primary">
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
