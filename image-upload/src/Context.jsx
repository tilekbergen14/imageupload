import React, { createContext, useState } from 'react';
import axios from "axios"
const BlogContext = createContext()

export const ContextProvider = ({children}) => {
    const [blogs, setBlogs] = useState([])
    const getBlogs = () => {
        axios
            .get("http://localhost:5000/blog/")
            .then((result) => setBlogs(result.data))
            .catch((err) => console.log(err.response));
    }
    return(
        <BlogContext.Provider value={{blogs, getBlogs}}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContext;