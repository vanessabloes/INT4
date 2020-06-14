import { decorate, action, computed } from "mobx";
import { v4 } from "uuid";

class WayfarerModel {
    constructor({ id, clanMemberId, journeyId, roleId, store, ...json }){
          if (!store) {
            throw new Error("A wayfarer needs a store");
          }
          this.store = store;

    
  
          this.updateFromJson({
            clanMemberId,
            journeyId,
            roleId
          });
      
         // this.store.clanMemberStore.addWayfarer(this);
        }
    
        setJourney(journey){
          if(journey){
            this.journeyId = journey.id;
            this.journey.linkWayfarer(this);
          }
        }

        setClanMember(clanMember){
          if(clanMember){
            this.clanMemberId = clanMember.id;
            this.clanMember.linkWayfarer(this);
          }
        }
        setRole(role){
          if(role){
            this.roleId = role.id;
           // this.role.linkWayfarer(this);
          }
        }
        


        create = async () => this.store.createUser(this.asJson);
        update = async () => this.store.updateUser(this.asJson);
        delete = async () => this.store.deleteUser(this.asJson);


       
      
        get journey() {
          return this.store.journeyStore.resolveJourney(this.journeyId);
        }
        get clanMember() {
          return this.store.clanMemberStore.resolveClanMember(this.clanMemberId);
        }
        get role() {
          return this.store.roleStore.resolveRole(this.roleId);
        }

        updateFromJson({ journeyId, clanMemberId, roleId }){
          this.setJourney(this.store.journeyStore.resolveJourney(journeyId));
          this.setClanMember(this.store.clanMemberStore.resolveClanMember(clanMemberId));
          this.setRole(this.store.roleStore.resolveRole(roleId));
         // this.journeys = journeys;
          //this.store.journeyStore.resolveJourney().linkWayfarer(this)

        };

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

decorate(WayfarerModel, {
 setJourney: action,
 setClanMember: action,
 setRole: action,
 journey: computed,
 clanMember: computed,
 role: computed,
 asJson: computed
});

export default WayfarerModel;