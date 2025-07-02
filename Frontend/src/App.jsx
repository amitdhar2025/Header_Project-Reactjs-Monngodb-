import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./home/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Admin from "./components/Admin.jsx";
import Books from "./components/Books.jsx";
import RichTextEditorNew from "./components/RichTextEditorNew.jsx";
import RichTextContent from "./components/RichTextContent.jsx";
import Cart from "./components/Cart.jsx";
import CartDetails from "./components/CartDetails.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import WhatsAppChatBot from "./components/WhatsAppChatBot.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminpanel" element={<AdminDashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/books" element={<Books />} />
          <Route path="/richtext" element={<RichTextEditorNew />} />
          <Route path="/richtextcontent" element={<RichTextContent />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cartdetails" element={<CartDetails />} />
        </Routes>
        <WhatsAppChatBot />
      </Router>
    </AuthProvider>
  );
};

export default App;
