import React from "react";
//import styles from "./App.module.css";

import { useStore } from "./hooks/index";

import Header from "./containers/header";
import Content from "./containers/content";

const App = () => {
  const { journeyStore } = useStore() // is nodig om de window.store te kunnen gebruiken om te testen
  return (
      <>
    <Header/>
    <Content/>
    </>
    
  );
};

export default App;
