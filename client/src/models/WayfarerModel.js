import { decorate, action, computed, observable } from "mobx";
import { v4 } from "uuid";

class WayfarerModel {
    constructor({ id = v4(), clanMemberId, journeyId, roleId, store, ...json }){
          this.id = id;
          if (!store) {
            throw new Error("A wayfarer needs a store");
          }
          this.store = store;
          console.log(journeyId)
    
  
          this.updateFromJson({
            clanMemberId,
            journeyId,
            roleId
          });
          this.store.addWayfarer(this);
      
         // this.store.clanMemberStore.addWayfarer(this);
        }

       
     
        setJourney(journey){
          if(journey){
            this.journeyId = journey.id;
            journey.linkWayfarer(this);
          }
        }

        setClanMember(clanMember){
          if(clanMember){
            this.clanMemberId = clanMember.id;
            clanMember.linkWayfarer(this);
          }
        }
        setRole(role){
          if(role){
            this.roleId = role.id;
           // this.role.linkWayfarer(this);
          }
        }
        


        create = async () => this.store.createWayfarer(this.asJson);
        update = async () => this.store.updateUser(this.asJson);
        delete = async () => this.store.deleteUser(this.asJson);


    
      
        get journey() {
          return this.store.rootStore.journeyStore.resolveJourney(this.journeyId);
        }
        get clanMember() {
          return this.store.rootStore.clanMemberStore.resolveClanMember(this.clanMemberId);
        }
        get role() {
          return this.store.rootStore.roleStore.resolveRole(this.roleId);
        }

        updateFromJson({ journeyId, clanMemberId, roleId }){
          this.setClanMember(this.store.rootStore.clanMemberStore.resolveClanMember(clanMemberId));
          this.setJourney(this.store.rootStore.journeyStore.resolveJourney(journeyId));
          this.setRole(this.store.rootStore.roleStore.resolveRole(roleId));
         // this.journeys = journeys;
          //this.store.journeyStore.resolveJourney().linkWayfarer(this)
          console.log(this.clanMemberId);
          console.log(this.journeyId);
          console.log(this.roleId);
        };

        get asJson() {
            return {
              id: this.id,
              clanMemberId: this.clanMemberId,
              journeyId: this.journeyId,
              roleId: this.roleId
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
 roleId: observable,
 clanMemberId: observable,
 journeyId: observable,
 asJson: computed
});

export default WayfarerModel;