import React from "react";
import styles from "./Roleitem.module.css"
import { useStore } from "../../hooks";
import MaskNoName from "../MaskNoName";


const Roleitem = ({ wayfarer }) => {

    const { clanMemberStore, roleStore } = useStore();

    return (
        <div className={styles.rolewrapper}>
            <div><MaskNoName clanMember={clanMemberStore.resolveClanMember(wayfarer.clanMemberId)} /></div>
            <div className={styles.role}>
                <div className={styles.roleInfo}>
                    <h1 className={styles.roleInfoName}>{clanMemberStore.resolveClanMember(wayfarer.clanMemberId).name}, {roleStore.resolveRole(wayfarer.roleId).roleName}</h1>
                    <p className={styles.roleInfoDescription}>{roleStore.resolveRole(wayfarer.roleId).roleDescription}</p>
                </div>
                <div className={styles.rolePower}>
                    <img src={roleStore.resolveRole(wayfarer.roleId).image} alt="icon of power of role" className={styles.rolePowerImg} />
                    <div className={styles.rolePowerInfo}>
                        <p className={styles.rolePowerName}>{roleStore.resolveRole(wayfarer.roleId).powerName}</p >
                        <p className={styles.rolePowerDescription}>{roleStore.resolveRole(wayfarer.roleId).powerDescription}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Roleitem;