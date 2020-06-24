import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
//import styles from "./MaskSmall.module.css";

const Match = ({ play, onTogglePlay }) => {

    const { topMaskStore, middleMaskStore, bottomMaskStore } = useStore();

    return useObserver(() => (
        <>
            <p>It's a match!</p>
  
       </>
    ));
};

export default Match;
