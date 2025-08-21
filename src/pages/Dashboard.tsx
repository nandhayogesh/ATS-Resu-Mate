import React from "react";
import HomeNavbar from "../components/HomeNavbar";

const Dashboard = () => (
  <>
    <HomeNavbar />
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-2 text-lg text-muted-foreground">Welcome to your dashboard!</p>
    </div>
  </>
);

export default Dashboard;
