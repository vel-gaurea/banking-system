import React from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Outlet /> {/* This renders the page for the current route */}
    </div>
  );
}
