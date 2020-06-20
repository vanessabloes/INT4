import React from "react";
import MyClanCircle from "../../components/MyClanCircle";
import AvatarTool from "../../components/AvatarTool";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import BackToWorldButton from "../../components/buttons/BackToWorld/BackToWorldButton";


const MyClan = () => {
  const { uiStore } = useStore();
  return useObserver (() => (
    <div>
      <BackToWorldButton/>
      <p>My clan</p>
      <MyClanCircle/>
      {uiStore.visibility ? <AvatarTool/> : ""}
    </div>
  ));
};

MyClan.propTypes = {

};

export default MyClan;
