import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import RoleModel from "../models/RoleModel";
import {STATES} from "../consts/index"


class LaunchFlowStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.homeState = STATES.HOME_STATE_HOME;
    // HOME_STATE_OPENING_SCREEN: "Opening Screen",
    // HOME_STATE_FAMILY: "Opening Family",
    // HOME_STATE_SURREAL_WORLD: "Opening Surreal World",
    // HOME_STATE_HOME: "home"
  }

  setHomeStrate(state) {
    this.homeState = state
  }

}

decorate(LaunchFlowStore, {
  homeState: observable,
  setHomeStrate: action
});

export default LaunchFlowStore;
