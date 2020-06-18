import { observable, action, decorate } from "mobx";
class UiStore {
  constructor(rootStore){
   this.rootStore = rootStore;
   this.loggedIn = false;
   this.currentClan = undefined;
   this.currentJourney = undefined;
  }

   login = (username, password) => {
     this.rootStore.clanStore.clans.forEach( (clan) =>  {
      if(clan.name === username && clan.password === password){
        console.log(clan)
        this.setCurrentClan(clan);
        this.loggedIn = true;
      }
    });
  }

  setCurrentClan(clan){
    
    this.currentClan = clan;
    console.log(this.currentClan.name);
  }

  logout(){
    this.currentClan = undefined;
    this.loggedIn = false;
  }

  setCurrentJourney(journey){
      this.currentJourney = journey;
  }

 

}

decorate(UiStore, {
    currentClan: observable,
    currentJourney: observable,
    setCurrentJourney: action,
    setCurrentClan: action,
    loggedIn: observable,
    login: action,
    logout: action
  
    
  });

export default UiStore;
