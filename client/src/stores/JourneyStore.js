import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
//import JourneyModel from "../models/JourneyModel";


class JourneyStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.journeys = [];
    this.journeyService = new RestService("journeys");
  }


  loadAllJourneys = async () => {
    const jsonJourneys = await this.groupsService.getAll();
    jsonJourneys.forEach(json => this.updateJourneyFromServer(json));
  };

  loadJourney = async (id) => {
    const jsonJourney = await this.groupsService.getById(id);
    this.updateJourneyFromServer(jsonJourney);
    return this.resolveJourney(id);
  };

  loadJourneyUsers = async (id) => {
    const jsonUsers = await this.groupsService.getById(id, 'users');
    this.updateJourneyFromServer({ id, users: jsonUsers });
    return this.resolveJourney(id);
  };

  createJourney = async group => {
    const json = await this.groupsService.create(group);
    this.updateJourneyFromServer(json);
  };

  updateLinkedUsers = async groupWithUsers => {
    const jsonUsers = await this.groupsService.updateLinked(groupWithUsers, 'users');
    this.updateJourneyFromServer({ id: groupWithUsers.id, users: jsonUsers });
    return this.resolveJourney(groupWithUsers.id);
  };

  // updateJourney = async group => {
  //   const json = await this.groupsService.update(group);
  //   this.updateJourneyFromServer(json);
  // };

  // deleteJourney = async group => {
  //   const json = await this.groupsService.delete(group);
  //   this.updateJourneyFromServer(json);
  // };

  updateJourneyFromServer(json) {
  //  let group = this.groups.find(group => group.id === json.id);
  //  if (!group) {
  //    group = new Journey({
  //      id: json.id,
  //      store: this.rootStore.groupStore
  //    });
  //  }
  //  if (json.isDeleted) {
  //    this.groups.remove(group);
  //  } else {
  //    group.updateFromJson(json);
  //  }
  //  return group;
  }

  resolveJourney = id => this.journeys.find(journey => journey.id === id);

  addJourney = journey => {
    this.journeys.push(journey);
  };
}

decorate(JourneyStore, {
  journeys: observable,
  addJourney: action,
  updateJourneyFromServer: action
});

export default JourneyStore;
