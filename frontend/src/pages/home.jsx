import React from 'react';
import Navbar from "../components/navbar";
import Header from "../components/header";
import Features from "../components/features";
import Contact from "../components/contact";

function Home() {
  return (
    <>
      <Navbar />
      <section id="header">
        <Header />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default Home;