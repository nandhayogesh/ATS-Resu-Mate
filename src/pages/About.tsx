import React from "react";
import HomeNavbar from "../components/HomeNavbar";

const About = () => (
  <>
    <HomeNavbar />
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">About</h1>
      <p className="mt-2 text-lg text-muted-foreground">Learn more about ATS Resu-Mate.</p>
    </div>
  </>
);

export default About;
