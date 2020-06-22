import React from "react";
import MyClanCircle from "../../components/MyClanCircle";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import BackToWorldButton from "../../components/buttons/BackToWorld/BackToWorldButton";
import AvatarToolUpdate from "../../components/AvatarToolUpdate";
import PageTitle from "../../components/PageTitle/PageTitle";
import AvatarToolCreate from "../../components/AvatarToolCreate";

const MyClan = () => {
  const { uiStore } = useStore();

  return useObserver(() => (
    <div>
      <BackToWorldButton />
      <PageTitle title={"Your Clan"} subtext={"Click on your mask to edit"} />
      <MyClanCircle />
      {uiStore.visibilityCreate ? <AvatarToolCreate /> : ""}
      {uiStore.visibilityUpdate ? <AvatarToolUpdate /> : ""}
    </div>
  ));
};

MyClan.propTypes = {

};

export default MyClan;
