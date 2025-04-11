import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Splash from "./Splash";
import Home from "./Home";
import Contact from "./Contact";
import Admin from "./Admin";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
