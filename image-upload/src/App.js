import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateBlog from "./components/CreateBlog";
import "./App.css";
import "./prism/prism.css";
import Blogs from "./components/Blogs";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Blog from "./components/Blog"
import { ContextProvider } from './Context'

export default function App() {
  return (
    <BrowserRouter>
          <ContextProvider>
            <Navbar />
            <Switch>
                <Route path="/createblog/" exact component={CreateBlog} />
                <Route path="/blogs/" exact component={Blogs} />
                <Route path="/blogs/:id" exact component={Blog} />
            </Switch>
          </ContextProvider>
    </BrowserRouter>
  );
}
