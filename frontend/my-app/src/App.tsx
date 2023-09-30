// React app
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import Navbar from "./components/navbar";
import ContactPage from "./components/Contact";
import AboutPage from "./components/AboutPage";
import Header from "./components/Header";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <>
    <Router>
    <Navbar/>
    <Header/>
      <Routes>
      <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/contact" element={<ContactPage/>} />
      <Route path="/about" element={<AboutPage/>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;

