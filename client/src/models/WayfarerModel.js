import { decorate, action, computed } from "mobx";
import { v4 } from "uuid";

class WayfarerModel {
    constructor({ id = v4(), clanMemberId, journeyId, roleId, store, ...json }){
          this.id = id;
          if (!store) {
            throw new Error("A wayfarer needs a store");
          }
          this.store = store;

    
  
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

        updateFromJson({  journeyId, clanMemberId, roleId }){
        
          this.setJourney(this.store.rootStore.journeyStore.resolveJourney(journeyId));
          this.setClanMember(this.store.rootStore.clanMemberStore.resolveClanMember(clanMemberId));
          this.setRole(this.store.rootStore.roleStore.resolveRole(roleId));
         // this.journeys = journeys;
          //this.store.journeyStore.resolveJourney().linkWayfarer(this)

        };

        get asJson() {
            return {
              id: this.id,
              clanMemberId: this.clanMemberId,
              journeyId: this.journeyId,
              roleId: this.role
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