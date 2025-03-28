import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import RecordsPage from "./pages/RecordsPage";
import BlockedPage from "./pages/BlockedPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/blocked" element={<BlockedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
