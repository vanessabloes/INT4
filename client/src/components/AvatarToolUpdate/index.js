import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./AvatarToolUpdate.module.css";
import { useStore } from "../../hooks";
import ClanMemberModel from "../../models/ClanMemberModel";
import PageTitle from "../PageTitle/PageTitle";

const AvatarToolUpdate = () => {

    const { uiStore, topMaskStore, middleMaskStore, bottomMaskStore, clanMemberStore } = useStore();

    // const [nickname, setNickname] = useState("");
    // const [age, setAge] = useState("");


    const clanMember = clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId);

    const handleUpdateAvatar = e => {
        e.preventDefault();

        const clanMemberToUpdate = clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId);
        console.log(clanMemberToUpdate);
        const topMaskId = (uiStore.topCount + 1).toString();
        const middleMaskId = (uiStore.middleCount + 1).toString();
        const bottomMaskId = (uiStore.bottomCount + 1).toString();
        const name = clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId).name;
        const age = clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId).age;

        console.log("_______________________-")

        console.log(topMaskId);
        clanMemberToUpdate.updateFromJson({
            topMaskId,
            middleMaskId,
            bottomMaskId,
            name,
            age
   
        });
        clanMemberToUpdate.update();
    }


    const closeOverlay = () => {
        uiStore.setVisibilityUpdate(false);
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
            <form className={styles.form} onSubmit={(e) => handleUpdateAvatar(e)}>
                <div className={styles.inputElements}>



                    <label className={styles.labelWrapper}>
                        <span className={styles.span}>Nickname</span>
                        <input
                            className={styles.input}
                            value={clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId).name}
                            type="text"
                            onChange={e => clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId).setNickname(e.target.value)}
                            size="20"
                            />
                    </label>


                    <label className={styles.labelWrapper}>
                       <span className={styles.span} >Age</span>
                       <input
                            className={styles.input}
                            value={clanMember.age}
                            type="number"
                            onChange={e => clanMember.setAge(e.target.value)}
                            size="6" 
                        />
                    </label>
                    <p>{uiStore.error}</p>
                    <input className={styles.buttonSubmitm} type="submit" value="update avatar" />

                </div>
            </form>

        </div>
    ));
};

export default AvatarToolUpdate;
