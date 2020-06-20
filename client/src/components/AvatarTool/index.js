import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./AvatarTool.module.css";
import { useStore } from "../../hooks";
import ClanMemberModel from "../../models/ClanMemberModel";

const AvatarTool = () => {

    const { uiStore, topMaskStore, middleMaskStore, bottomMaskStore, clanMemberStore } = useStore();

    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");

    console.log(nickname);
    console.log(age);

    const handleSubmitForm = ({ e, nickname, age }) => {
        e.preventDefault();
        // addClanMember

        const newClanMember = new ClanMemberModel({
            store: clanMemberStore,
            name: nickname,
            age: age,
            topMaskId: (uiStore.topCount + 1),
            middleMaskId: (uiStore.middleCount + 1),
            bottomMaskId: (uiStore.bottomCount + 1),
            clanId: uiStore.currentClan.id
        })
    }

    const closeOverlay = () => {
        uiStore.setVisibility(false);
    }

    const handleTopCount = (value) => {
        if (value === "up") {
            uiStore.topCountUp();
        } else if (value === "down") {
            uiStore.topCountDown();
        }
    }

    const handleMiddleCount = (value) => {
        if (value === "up") {
            uiStore.middleCountUp();
        } else if (value === "down") {
            uiStore.middleCountDown();
        }
    }

    const handleBottomCount = (value) => {
        if (value === "up") {
            uiStore.bottomCountUp();
        } else if (value === "down") {
            uiStore.bottomCountDown();
        }
    }

    return useObserver(() => (

        <div className={styles.test}>
            <button onClick={closeOverlay}>X</button>
            <form className={styles.form} onSubmit={(e) => handleSubmitForm({ e, nickname, age })}>
                <div className={styles.avatarImageWrapper}>

                    <div className={styles.buttonWrapper}>
                        <button onClick={() => handleTopCount("down")}>&lt;</button>
                        <button onClick={() => handleMiddleCount("down")}>&lt;</button>
                        <button onClick={() => handleBottomCount("down")}>&lt;</button>
                    </div>

                    <div className={styles.maskContainer}>
                        <img className={styles.maskTop} src={topMaskStore.topMasks[uiStore.topCount].topImage} alt="top mask image" />

                        <img className={styles.maskMiddle} src={middleMaskStore.middleMasks[uiStore.middleCount].middleImage} alt="middle mask image" />

                        <img className={styles.maskBottom} src={bottomMaskStore.bottomMasks[uiStore.bottomCount].bottomImage} alt="bottom mask image" />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button onClick={() => handleTopCount("up")}>&gt;</button>
                        <button onClick={() => handleMiddleCount("up")}>&gt;</button>
                        <button onClick={() => handleBottomCount("up")}>&gt;</button>
                    </div>

                </div>
                <div className={styles.inputElements}>
                    <label>
                        Nickname<input
                            value={nickname}
                            type="text"
                            onChange={e => setNickname(e.target.value)} />
                    </label>

                    <label>
                        Age<input
                            value={age}
                            type="number"
                            onChange={e => setAge(e.target.value)} />
                    </label>

                    <input type='submit' value="Create avatar" />
                </div>
            </form>

        </div>
    ));
};

export default AvatarTool;
