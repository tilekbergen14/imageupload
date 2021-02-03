import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogContext from "../Context";
import Moment from "react-moment"
import moment from 'moment'
import Prism from "prismjs";

export default function Blog() {
  const context = useContext(BlogContext);
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    Prism.highlightAll();
    context.blogs.filter((blog) => {
        if (blog._id === id) {
            setBlog(blog);
        }
      });
  })
  console.log(blog);
  return (
    <div className="container mt-4">
      {blog !== null && (
        <div>
          <h2 className="blog-post-title">{blog.title}</h2>
          {console.log(<Moment format="YYYY/MM/DD">{blog.createdAt}</Moment>)}
          <p className="blog-post-meta">{`${moment(blog.createdAt).fromNow()} by Tilekbergen`}</p>
          <div dangerouslySetInnerHTML={{__html: blog.body}}/>
        </div>
      )}
    </div>
  );
}
