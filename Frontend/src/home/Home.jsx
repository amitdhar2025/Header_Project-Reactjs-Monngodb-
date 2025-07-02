import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Books from "../components/Books";
import Footer from "../components/Footer";
import RichTextContent from "../components/RichTextContent";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 space-y-10">
        <Books />
      </div>
      {/* Removed duplicate RichTextContent */}
      <Footer />
    </>
  );
}

export default Home;
