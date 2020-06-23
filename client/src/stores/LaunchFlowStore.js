import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import RoleModel from "../models/RoleModel";
import { STATES } from "../consts/index"


class LaunchFlowStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.homeState = STATES.HOME_STATE_OPENING_SCREEN;
    this.journeyNameError = "";
  }

  setHomeStrate(state) {
    this.homeState = state
  }

  setNameJourneyError(value) {
    this.journeyNameError = value;
  }

}

decorate(LaunchFlowStore, {
  homeState: observable,
  setHomeStrate: action,
  journeyNameError: observable,
  setNameJourneyError: action
});

export default LaunchFlowStore;
