import React from "react";
import styles from "./AddMemberButton.module.css";
import { useStore } from "../../../hooks";
import { ReactComponent as AddMember } from './btnAddMember.svg';


const AddMemberButton = ({ text }) => {

  const { uiStore } = useStore();

  const showOverlay = () => {
    uiStore.setVisibilityCreate(true);
  }
  return (
    <div>
      <div className={styles.buttonContainer}>
        <button className={styles.addMemberButton} onClick={showOverlay}>

          <AddMember />
          <p className={styles.button_title}>{text}</p>
        </button>

      </div>

    </div>
  );
};

export default AddMemberButton;


