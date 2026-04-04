import React from 'react';
import Navbar from "../components/landing/navbar";
import Header from "../components/landing/header";
import Features from "../components/landing/features";
import Contact from "../components/landing/contact";


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