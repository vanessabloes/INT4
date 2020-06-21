import React from "react";
import styles from "./PageTitle.module.css"


const PageTitle = ({title, subtext}) => {
  return (
    <div className={styles.page_Title_wrapper}>
      <h1 className={styles.title}>{title}</h1>
      {subtext === undefined ? <></> : <p className={styles.subtext}>{subtext}</p>}
    </div>
  );
};
export default PageTitle;


