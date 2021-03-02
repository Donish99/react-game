import React from "react";
import Game from "./components/Game";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }} className="all">
      <Game />
      <Footer />
    </div>
  );
};

export default App;
