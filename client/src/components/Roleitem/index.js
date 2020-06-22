import React from "react";
import styles from "./Roleitem.module.css"
import { useStore } from "../../hooks";
import Mask from "../Mask";


const Roleitem = ({ wayfarer }) => {

    const { clanMemberStore, roleStore } = useStore();

    return (
        <div className={styles.rolewrapper}>
            <div><Mask clanMember={clanMemberStore.resolveClanMember(wayfarer.clanMemberId)} /></div>
            <div>
                <div>
                    <h1>{roleStore.resolveRole(wayfarer.roleId).roleName}</h1>
                    <p></p>
                </div>
                <div>
                    <img />
                    <p></p>
                </div>
            </div>
        </div>

    );
};

export default Roleitem;