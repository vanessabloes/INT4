import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./AvatarTool.module.css";
import { useStore } from "../../hooks";
import ClanMemberModel from "../../models/ClanMemberModel";
import PageTitle from "../PageTitle/PageTitle";

const AvatarToolCreate = () => {

    const { uiStore, topMaskStore, middleMaskStore, bottomMaskStore, clanMemberStore } = useStore();

    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");


    // let error = "";
    const handleSubmitForm = ({ e, nickname, age }) => {
        e.preventDefault();

        console.log(uiStore.currentClan.id);

        if (clanMemberStore.clanMembers.length < 6) {
            const newClanMember = new ClanMemberModel({
                store: clanMemberStore,
                name: nickname,
                age: age,
                clanId: uiStore.currentClan.id,
                topMaskId: (uiStore.topCount + 1).toString(),
                middleMaskId: (uiStore.middleCount + 1).toString(),
                bottomMaskId: (uiStore.bottomCount + 1).toString(),

            });
            newClanMember.create();
        } else {
            uiStore.setError("Max clanmember limit reached");

        }
        closeOverlay();
    }

    const closeOverlay = () => {
        uiStore.setVisibilityCreate(false);
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

        <div className={styles.overlay}>

            <button className={styles.closeButton} onClick={closeOverlay}>X</button>
            <PageTitle title={"Make your avatar"} />

            <div className={styles.avatarImageWrapper}>
                <div className={styles.buttonWrapper}>
                    <button className={styles.buttonLeft} onClick={() => handleTopCount("down")}>&lt;</button>
                    <button className={styles.buttonLeft} onClick={() => handleMiddleCount("down")}>&lt;</button>
                    <button className={styles.buttonLeft} onClick={() => handleBottomCount("down")}>&lt;</button>
                </div>

                <div className={styles.maskContainer}>
                    <img className={styles.maskTop} src={topMaskStore.topMasks[uiStore.topCount].topImage} alt="top mask image" />

                    <img className={styles.maskMiddle} src={middleMaskStore.middleMasks[uiStore.middleCount].middleImage} alt="middle mask image" />

                    <img className={styles.maskBottom} src={bottomMaskStore.bottomMasks[uiStore.bottomCount].bottomImage} alt="bottom mask image" />
                </div>

                <div className={styles.buttonWrapper}>
                    <button className={styles.buttonLeft} onClick={() => handleTopCount("up")}>&gt;</button>
                    <button className={styles.buttonLeft} onClick={() => handleMiddleCount("up")}>&gt;</button>
                    <button className={styles.buttonLeft} onClick={() => handleBottomCount("up")}>&gt;</button>
                </div>

            </div>
            <form className={styles.form} onSubmit={(e) => handleSubmitForm({ e, nickname, age })}>
                <div className={styles.inputElements}>
                    <label className={styles.labelWrapper}>
                        <span className={styles.spanNickname}>Nickname</span>
                        <input
                            className={styles.input}
                            value={nickname}
                            type="text"
                            onChange={e => setNickname(e.target.value)} />
                    </label>

                    <label className={styles.labelWrapper}>
                        <span className={styles.spanAge} >Age</span>
                        <input
                            className={styles.input}
                            value={age}
                            type="number"
                            onChange={e => setAge(e.target.value)} />
                    </label>
                    <p>{uiStore.error}</p>
                    <label className={styles.theepot}>
                        <input
                            className={styles.button}
                            type="submit"
                            value=""
                        />
                        <p>Create avatar</p>
                    </label>
                </div>
            </form>
        </div>
    ));
};

export default AvatarToolCreate;
