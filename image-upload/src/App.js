import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateBlog from "./components/CreateBlog";
import "./App.css";
import "./prism/prism.css";
import Blogs from "./components/Blogs";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <BrowserRouter>
          <Navbar />
          <Switch>
              <Route path="/createblog/" exact component={CreateBlog} />
              <Route path="/blogs/" exact component={Blogs} />
          </Switch>
    </BrowserRouter>
  );
}
