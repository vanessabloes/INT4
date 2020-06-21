import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./AvatarToolUpdate.module.css";
import { useStore } from "../../hooks";
import ClanMemberModel from "../../models/ClanMemberModel";

const AvatarToolUpdate = () => {

    const { uiStore, topMaskStore, middleMaskStore, bottomMaskStore, clanMemberStore } = useStore();

    // const [nickname, setNickname] = useState("");
    // const [age, setAge] = useState("");


    const clanMember = clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId);

    const handleUpdateAvatar = e => {
        e.preventDefault();

        const clanMemberToUpdate = clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId);

        const topMaskId = (uiStore.topCount + 1).toString();
        const middleMaskId = (uiStore.middleCount + 1).toString();
        const bottomMaskId = (uiStore.bottomCount + 1).toString();

        console.log("_______________________-")

        console.log(topMaskId);
        clanMemberToUpdate.updateFromJson({
            topMaskId,
            middleMaskId,
            bottomMaskId

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

        <div className={styles.test}>
            <button onClick={closeOverlay}>X</button>


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
            <form className={styles.form} onSubmit={(e) => handleUpdateAvatar(e)}>
                <div className={styles.inputElements}>
                    <label>
                        Nickname<input
                            value={clanMember.name}
                            type="text"
                            onChange={e => clanMember.setNickname(e.target.value)} />
                    </label>

                    <label>
                        Age<input
                            value={clanMember.age}
                            type="number"
                            onChange={e => clanMember.setAge(e.target.value)} />
                    </label>
                    <p>{uiStore.error}</p>
                    <input type="submit" value="update avatar" />

                </div>
            </form>

        </div>
    ));
};

export default AvatarToolUpdate;
