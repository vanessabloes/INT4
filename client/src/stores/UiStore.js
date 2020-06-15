import { observable, action, decorate, computed } from "mobx";
class UiStore {
  constructor(){
   this.loggedIn = false;
   this.currentClan = undefined;
   this.currentJourney = undefined;
  }

  login({username, password, dataStore}){
    dataStore.users.forEach(user => {
      if(user.name === username && user.password === password){
        this.currentCommunity = user.community;
        this.currentUser = user;
        this.loggedIn = true;
      }
  });
  }

  


  logout(){
    this.currentUser = undefined;
    this.loggedIn = false;
  }

  setCurrentJourney(journey){
      this.currentJourney = journey;
  }

  setCurrentCommunity(clan){
    this.currentClan = clan;
  }


}

decorate(UiStore, {
    setCurrentClan: action,
    loggedIn: observable,
    login: action,
    logout: action
  
    
  });

export default UiStore;
