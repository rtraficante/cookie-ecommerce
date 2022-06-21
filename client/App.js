import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div style={{paddingTop: 80}}/>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
