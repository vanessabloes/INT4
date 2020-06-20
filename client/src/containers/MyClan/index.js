import React from "react";
import MyClanCircle from "../../components/MyClanCircle";
import AvatarTool from "../../components/AvatarTool";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import BackToWorldButton from "../../components/buttons/BackToWorld/BackToWorldButton";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
const testClan = [
  {id: 1, name: "piet", avatar: "/assets/img/testmasks/testmask1.svg"},
  {id: 2, name: "jan", avatar: "/assets/img/testmasks/testmask2.svg"} ,
  {id: 3, name: "jos", avatar: "/assets/img/testmasks/testmask3.svg" },
  {id: 4, name: "fret", avatar: "/assets/img/testmasks/testmask4.svg"}
]

const MyClan = () => {
  const { uiStore } = useStore();
  return useObserver (() => (
    <div>
      <BackToWorldButton/>
      <p>my clan</p>
      <MyClanCircle clan={testClan}/>
      {uiStore.visibility ? <AvatarTool/> : ""}
    </div>
  ));
};

MyClan.propTypes = {

};

export default MyClan;
