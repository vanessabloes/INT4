import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import JourneyModel from "../models/JourneyModel";


class JourneyStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.journeys = [];
    //this.definedWords = [];
    this.journeysService = new RestService("journeys");
  }


  loadAllJourneys = async () => {
    const jsonJourneys = await this.journeysService.getAll();
    jsonJourneys.forEach(json => this.updateJourneyFromServer(json));
  }

  loadJourney = async (id) => {
  
    const jsonJourney = await this.journeysService.getById(id);
    console.log(jsonJourney)
    this.updateJourneyFromServer(jsonJourney);
    return this.resolveJourney(id);
  };

  loadWayfarersForJourney = async (id) => {
   
    const jsonUsers = await this.journeysService.getById(id, 'wayfarers');
    console.log(jsonUsers)
    this.updateJourneyFromServer({ id, wayfarers: jsonUsers });
    return this.resolveJourney(id);
  };

  // nog uit te werken
  loadStoriesForJourney = async (id) => {
    const jsonUsers = await this.journeysService.getById(id, 'stories');
    this.updateJourneyFromServer({ id, stories: jsonUsers });
    return this.resolveJourney(id);
  };

  createJourney = async journey => {
    const json = await this.journeysService.create(journey);
    this.updateJourneyFromServer(json);
  };

  // updateLinkedUsers = async groupWithUsers => {
  //   const jsonUsers = await this.groupsService.updateLinked(groupWithUsers, 'users');
  //   this.updateJourneyFromServer({ id: groupWithUsers.id, users: jsonUsers });
  //   return this.resolveJourney(groupWithUsers.id);
  // };
  //
  updateJourney = async journey => {
    const json = await this.journeysService.update(journey);
    this.updateJourneyFromServer(json);
  };

  // deleteJourney = async group => {
  //   const json = await this.groupsService.delete(group);
  //   this.updateJourneyFromServer(json);
  // };

  updateJourneyFromServer(json) {

    let journey = this.journeys.find(journey => journey.id === json.id);
    if (!journey) {
      journey = new JourneyModel({
        id: json.id,
        name: json.name,
        image: json.image,
        clanId: json.clanId,
        store: this.rootStore.journeyStore
      });
    }
    console.log(journey)
    if (json.isDeleted) {
      this.journeys.remove(journey);
    } else {
      journey.updateFromJson(json);
    }
    return journey;
  }

  resolveJourney = id => this.journeys.find(journey => journey.id === id);

  addJourney(journey) {
    this.journeys.push(journey);
  };


}

decorate(JourneyStore, {
  journeys: observable,
  addJourney: action,
  updateJourneyFromServer: action,
  resolveJourney: action,
  loadAllJourneys: action
});

export default JourneyStore;
