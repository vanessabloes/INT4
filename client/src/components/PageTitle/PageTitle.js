import React from "react";
import styles from "./PageTitle.module.css"


const PageTitle = ({title, subtext}) => {
  return (
    <div className={styles}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default PageTitle;


