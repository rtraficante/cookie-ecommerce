import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 70 }}>
        <Routes />
      </div>
    </div>
  );
};

export default App;
