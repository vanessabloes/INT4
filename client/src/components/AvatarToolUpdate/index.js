import React from "react";
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

        const topMaskId = parseInt(uiStore.topCount) + 1;
        const middleMaskId = parseInt(uiStore.middleCount) + 1;
        const bottomMaskId = parseInt(uiStore.bottomCount) + 1;
        const name = clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId).name;
        const age = clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId).age;
        const clanId = uiStore.currentClan.id;

        // OKE DIT: console.log(clanMemberToUpdate);

        clanMemberToUpdate.updateFromJson({
            topMaskId,
            middleMaskId,
            bottomMaskId,
            name,
            age,
            clanId

        });
        clanMemberToUpdate.update();
        closeOverlay();
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

            <button className={styles.closeButton} onClick={closeOverlay}><img className={styles.close} alt="close icon" src="assets/img/BUTTONS/close.svg" /></button>
            <PageTitle title={"Update your avatar"} />


            <div className={styles.avatarImageWrapper}>

                <div className={styles.buttonWrapper}>
                    <button className={styles.buttonLeft} onClick={() => handleTopCount("down")}>&lsaquo;</button>
                    <button className={styles.buttonLeft} onClick={() => handleMiddleCount("down")}>&lsaquo;</button>
                    <button className={styles.buttonLeft} onClick={() => handleBottomCount("down")}>&lsaquo;</button>
                </div>

                <div className={styles.maskContainer}>
                    <img className={styles.maskTop} src={topMaskStore.topMasks[uiStore.topCount].topImage} alt="top mask image" />

                    <img className={styles.maskMiddle} src={middleMaskStore.middleMasks[uiStore.middleCount].middleImage} alt="middle mask image" />

                    <img className={styles.maskBottom} src={bottomMaskStore.bottomMasks[uiStore.bottomCount].bottomImage} alt="bottom mask image" />
                </div>

                <div className={styles.buttonWrapper}>
                    <button className={styles.buttonLeft} onClick={() => handleTopCount("up")}>&rsaquo;</button>
                    <button className={styles.buttonLeft} onClick={() => handleMiddleCount("up")}>&rsaquo;</button>
                    <button className={styles.buttonLeft} onClick={() => handleBottomCount("up")}>&rsaquo;</button>
                </div>

            </div>
            <form className={styles.form} onSubmit={handleUpdateAvatar}>
                <div className={styles.inputElements}>



                    <label className={styles.labelWrapper}>
                        <span className={styles.spanNickname}>Nickname</span>
                        <input
                            className={styles.input}
                            value={clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId).name}
                            type="text"
                            onChange={e => clanMemberStore.resolveClanMember(uiStore.selectedClanMemberId).setNickname(e.target.value)}
                            size="20"
                        />
                    </label>


                    <label className={styles.labelWrapper}>
                        <span className={styles.spanAge} >Age</span>
                        <input
                            className={styles.input}
                            value={clanMember.age}
                            type="number"
                            onChange={e => clanMember.setAge(e.target.value)}
                            size="6"
                        />
                    </label>
                    <p>{uiStore.error}</p>
                    <label className={styles.theepot}>
                        <input
                            className={styles.button}
                            type="submit"
                            value=""
                        />
                        <p>Update avatar</p>
                    </label>

                </div>
            </form>

        </div>
    ));
};

export default AvatarToolUpdate;
