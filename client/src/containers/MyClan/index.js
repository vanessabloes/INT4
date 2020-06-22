import React from "react";
import MyClanCircle from "../../components/MyClanCircle";
import AvatarTool from "../../components/AvatarTool";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import BackToWorldButton from "../../components/buttons/BackToWorld/BackToWorldButton";
import AvatarToolUpdate from "../../components/AvatarToolUpdate";
import PageTitle from "../../components/PageTitle/PageTitle";
import Styles from "./MyClan.module.css"

const MyClan = () => {
  const { uiStore } = useStore();

  return useObserver(() => (
    <div className={Styles.myClanWrapper}>
      <div className= {Styles.header}>
        <div className= {Styles.button}>
          <BackToWorldButton />
        </div>
        <div className= {Styles.title}>
          <PageTitle title={"Your Clan"} subtext={"Click on your mask to edit"} />
        </div>
      </div>
      <MyClanCircle />
      {uiStore.visibilityCreate ? <AvatarTool /> : ""}
      {uiStore.visibilityUpdate ? <AvatarToolUpdate /> : ""}
    </div>
  ));
};

MyClan.propTypes = {

};

export default MyClan;
