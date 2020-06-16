import { decorate, action, computed, observable } from "mobx";
import { v4 } from "uuid";

class ClanModel {
    constructor({ id, name, password, store, ...json }){
           this.id = id;
          if (!store) {
            throw new Error("A clan needs a store");
          }
          this.name = name;
          this.password = password;
          this.store = store;
          this.updateFromJson(json);
          this.clanMembers = [];
          this.store.addClan(this);
        }
    


        linkClanMember(clanMember){
          !this.clanMembers.includes(clanMember) && this.clanMembers.push(clanMember);
        }

        create = async () => this.store.createUser(this.asJson);
        update = async () => this.store.updateUser(this.asJson);
        delete = async () => this.store.deleteUser(this.asJson);


        updateFromJson({ }){
          
         // this.journeys = journeys;
          //this.store.journeyStore.resolveJourney().linkClan(this)

        };
      

        get asJson() {
            return {
              id: this.id,
              name: this.name,
           
            };
          }
}

decorate(ClanModel, {
  clanMembers: observable,
  updateFromJson: action,
  linkClanMember: action,
  asJson: computed
 });

export default ClanModel;