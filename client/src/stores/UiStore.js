import { observable, action, decorate, computed } from "mobx";
class UiStore {
  constructor(rootStore){
   this.rootStore = rootStore;
   this.loggedIn = false;
   this.currentClan = undefined;
   this.currentJourney = undefined;
  }

  login(username, password){
    this.rootStore.clanStore.clans.forEach(clan => {
      if(clan.name === username && clan.password === password){
        this.setCurrentClan(clan);
        this.loggedIn = true;
      }
  });
  }
  logout(){
    this.currentClan = undefined;
    this.loggedIn = false;
  }
  setCurrentClan(clan){
    this.currentClan = clan;
  }

  setCurrentJourney(journey){
      this.currentJourney = journey;
  }

 

}

decorate(UiStore, {
    setCurrentClan: action,
    loggedIn: observable,
    login: action,
    logout: action
  
    
  });

export default UiStore;
