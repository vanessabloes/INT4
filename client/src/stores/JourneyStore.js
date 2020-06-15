import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import JourneyModel from "../models/JourneyModel";


class JourneyStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.journeys = [];
    //this.definedWords = [];
    this.journeyService = new RestService("journeys");
  }


 // loadAllJourneys = async () => {
 //   const jsonJourneys = await this.groupsService.getAll();
 //   jsonJourneys.forEach(json => this.updateJourneyFromServer(json));
 // };

  loadAllDefinedWords = async () => {
  //  const jsonJourneys = await this.groupsService.getAll();
     const jsonDefinedWords = [
      {"content": "Elephant", "used":"false"},
      {"content": "Knight", "used": "false"}
  ];
  this.definedWords = jsonDefinedWords;

   // jsonDefinedWords.forEach(json => this.updateJourneyFromServer(json));
  }

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
   let journey = this.journeys.find(journey => journey.id === json.id);
   if (!journey) {
     journey = new JourneyModel({
       id: json.id,
       store: this.rootStore.journeyStore
     });
   }
   if (json.isDeleted) {
     this.journeys.remove(journey);
   } else {
     journey.updateFromJson(json);
   }
   return journey;
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
