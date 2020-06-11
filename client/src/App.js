import React from "react";
import styles from "./App.module.css";

import PageHeader from "./components/PageHeader/PageHeader";
import PriceList from "./components/PriceList/PriceList";

const App = () => {
  return (
    <main className={styles.layout}>
      <PageHeader title={`Prijslijst generator`} />
      <PriceList />
    </main>
  );
};

export default App;
