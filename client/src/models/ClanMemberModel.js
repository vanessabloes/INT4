import { decorate, action, computed, observable } from "mobx";
import { v4 } from "uuid";

class ClanMemberModel {
    constructor({ id, store, ...json }){
           this.id = id;
          if (!store) {
            throw new Error("A member needs a store");
          }

          this.store = store;
       
          //this.journeys = [];
          this.wayfarers = [];
          this.updateFromJson(json);
      
          this.store.addClanMember(this);
        }

        setClan(clan){
          if(clan){
            this.clanId = clan.id;
            this.clan.linkClanMember(this);
          }
        }
    
        linkJourney(journey){
          !this.journeys.includes(journey) && this.journeys.push(journey);
        }

        linkWayfarer(wayfarer){
          !this.wayfarers.includes(wayfarer) && this.wayfarers.push(wayfarer);
        }

        create = async () => this.store.createUser(this.asJson);
        update = async () => this.store.updateUser(this.asJson);
        delete = async () => this.store.deleteUser(this.asJson);


        updateFromJson({ name, age , avatar, clanId }){
          this.setClan(this.store.rootStore.clanStore.resolveClan(clanId));
          this.name = name;
          this.age = age;
          this.avatar = avatar;
         // this.journeys = journeys;
          //this.store.journeyStore.resolveJourney().linkClanMember(this)

        };
        get clan() {
          return this.store.rootStore.clanStore.resolveClan(this.clanId);
        }

        get asJson() {
            return {
              id: this.id,
              name: this.name,
              age: this.age,
              avatar: this.avatar,
              journeys: this.journeys
            };
          }
}

decorate(ClanMemberModel, {
  journeys: observable,
  wayfarers: observable,
  updateFromJson: action,
  linkWayfarer: action,
  linkJourney: action,
  asJson: computed
 });

export default ClanMemberModel;