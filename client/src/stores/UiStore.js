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
    this.visibility = false;
    this.loadedAllData = false;
    this.topCount = 0;
    this.middleCount = 0;
    this.bottomCount = 0;
    this.error = "";
    this.name = "";
    this.age = 0;
  }

  setError(value){
    this.error = value;
  }

  setLoadedAllData(value) {
    this.loadedAllData = value;
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

  setVisibility(value) {
    this.visibility = value;
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

  topCountUp() {
    if (this.topCount < 3) {
      this.topCount++;
    } else if (this.topCount === 3) {
      this.topCount = 0;
    }
    console.log(this.topCount);
  }

  setTopCount(value){
    value = (parseInt(value) - 1).toString();

    this.topCount = value
  }
  setMiddleCount(value){
    value = (parseInt(value) - 1).toString();
   
    this.middleCount = value
  }
  setBottomCount(value){
    value = (parseInt(value) - 1).toString();
 
    this.bottomCount = value
  }
// hardcoded number vervangen door length van array - 1 die meegestuurd kan worden
  topCountDown() {
    if (this.topCount > 0) {
      this.topCount--;
    } else if (this.topCount === 0) {
      this.topCount = 3;
    }
    console.log(this.topCount);
  }

  middleCountUp() {
    if (this.middleCount < 3) {
      this.middleCount++;
    } else if (this.middleCount === 3) {
      this.middleCount = 0;
    }
    console.log(this.middleCount);
  }

  middleCountDown() {
    if (this.middleCount > 0) {
      this.middleCount--;
    } else if (this.middleCount === 0) {
      this.middleCount = 3;
    }
    console.log(this.middleCount);
  }

  bottomCountUp() {
    if (this.bottomCount < 3) {
      this.bottomCount++;
    } else if (this.bottomCount === 3) {
      this.bottomCount = 0;
    }
    console.log(this.bottomCount);
  }

  bottomCountDown() {
    if (this.bottomCount > 0) {
      this.bottomCount--;
    } else if (this.bottomCount === 0) {
      this.bottomCount = 3;
    }
    console.log(this.bottomCount);
  }

  setName(value){
    this.name = value;
  }

  setAge(value){
    this.age = parseInt(value);
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
  addStoryState: observable,

  visibility: observable,
  setVisibility: action,

  loadedAllData: observable,
  setLoadedAllData: action,

  topCount: observable,
  topCountUp: action,
  topCountDown: action,
  middleCount: observable,
  middleCountUp: action,
  middleCountDown: action,
  bottomCount: observable,
  bottomCountUp: action,
  bottomCountDown: action,

  error: observable,
  setError: action,

  setTopCount: action,
  setMiddleCount: action,
  setBottomCount: action,
  name: observable,
  age: observable,
  setName: action,
  setAge: action

});

export default UiStore;
