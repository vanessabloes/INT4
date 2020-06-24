import { observable, action, decorate } from "mobx";
import { STATES } from "../consts";
class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.loggedIn = false;
    this.currentClan = undefined;
    this.currentJourney = undefined;
    this.addJourneyState = STATES.ADDJOURNEY_STATE_ADDWAYFARERS;
    this.addStoryState = undefined;
    this.visibilityCreate = false;
    this.visibilityUpdate = false;
    this.visibilityPower = false;
    this.loadedAllData = false;
    this.topCount = 0;
    this.middleCount = 0;
    this.bottomCount = 0;
    this.error = "";
    this.name = "";
    this.age = 0;
    this.selectedClanMemberId = "";
    this.selectedPowerId = "";
    this.currentStory = undefined;
    this.pitStopCount = 0;
    this.manualVisibility = false;
  }


  setPitStopCount(value) {
    this.pitStopCount = this.pitStopCount + value;
  }

  setCurrentStory(story) {
    console.log(story)
    this.currentStory = story;
  }

  setError(value) {
    this.error = value;
  }

  setLoadedAllData(value) {
    this.loadedAllData = value;
  }

  login = (username, password) => {
    this.rootStore.clanStore.clans.forEach((clan) => {
      if (clan.name === username && clan.password === password) {

        this.setCurrentClan(clan);
        this.loggedIn = true;
      }
    });
  }

  setVisibilityCreate(value) {
    this.visibilityCreate = value;
  }

  setManualVisibility(value) {
    this.manualVisibility = value;
  }

  setVisibilityUpdate(value) {
    this.visibilityUpdate = value;
  }

  setVisibilityPower(value) {
    this.visibilityPower = value
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
  }

  setTopCount(value) {
    value = (parseInt(value) - 1).toString();

    this.topCount = value
  }
  setMiddleCount(value) {
    value = (parseInt(value) - 1).toString();

    this.middleCount = value
  }
  setBottomCount(value) {
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

  }

  middleCountUp() {
    if (this.middleCount < 3) {
      this.middleCount++;
    } else if (this.middleCount === 3) {
      this.middleCount = 0;
    }

  }

  middleCountDown() {
    if (this.middleCount > 0) {
      this.middleCount--;
    } else if (this.middleCount === 0) {
      this.middleCount = 3;
    }

  }

  bottomCountUp() {
    if (this.bottomCount < 3) {
      this.bottomCount++;
    } else if (this.bottomCount === 3) {
      this.bottomCount = 0;
    }

  }

  bottomCountDown() {
    if (this.bottomCount > 0) {
      this.bottomCount--;
    } else if (this.bottomCount === 0) {
      this.bottomCount = 3;
    }

  }

  setName(value) {
    this.name = value;
  }

  setAge(value) {
    this.age = parseInt(value);
  }

  setSelectedClanMember(id) {
    this.selectedClanMemberId = id;
  }

  setSelectedPower(id) {
    this.selectedPowerId = id;
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
  setAge: action,

  setSelectedClanMember: action,
  selectedClanMemberId: observable,

  setVisibilityCreate: action,
  setVisibilityUpdate: action,
  visibilityCreate: observable,
  visibilityUpdate: observable,
  setVisibilityPower: action,
  visibilityPower: observable,
  setSelectedPower: action,
  selectedPowerId: observable,

  setCurrentStory: action,
  currentStory: observable,

  pitStopCount: observable,
  setPitStopCount: action,

  setManualVisibility: action,
  manualVisibility: observable

});

export default UiStore;
