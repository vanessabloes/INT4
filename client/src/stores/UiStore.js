import { observable, action, decorate } from "mobx";
import { STATES } from "../consts";
class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.loggedIn = false;
    this.currentClan = undefined;
    this.currentJourney = undefined;
    this.addJourneyState = STATES.ADDJOURNEY_STATE_ADDWAYFARERS;
    this.addStoryState = STATES.ADDSTORY_STATE_LOADING;
  }

  login = (username, password) => {
    this.rootStore.clanStore.clans.forEach((clan) => {
      if (clan.name === username && clan.password === password) {
        console.log(clan)
        this.setCurrentClan(clan);
        this.loggedIn = true;
      }
    });
  }

  setCurrentClan = async (clan) => {

    this.currentClan = clan;
    await console.log(this.currentClan.name);
  }

  logout() {
    this.currentClan = undefined;
    this.loggedIn = false;
  }

  setCurrentJourney(journey) {
    this.currentJourney = journey;
    console.log(journey);
  }

  setAddJourneyState(state) {
    this.addJourneyState = state;
  }

  setAddStoryState(state) {
    this.addStoryState = state;
  }

}

decorate(UiStore, {
  currentClan: observable,
  currentJourney: observable,
  setCurrentJourney: action,
  setCurrentClan: action,
  loggedIn: observable,
  login: action,
  logout: action,
  setAddJourneyState: action,
  addJourneyState: observable,
  setAddStoryState: action,
  addStoryState: observable

});

export default UiStore;
