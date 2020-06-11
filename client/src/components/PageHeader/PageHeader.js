import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./PageHeader.module.css";

const PageHeader = ({ title }) => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.home}>
        Café de reisduif
      </Link>

      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

PageHeader.defaultProps = {
  title: `Reisduif titel`
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageHeader;
