import { decorate, action, computed, observable } from "mobx";
import { v4 } from "uuid";

class ClanMemberModel {
    constructor({ id = v4(), store, ...json }){
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
            console.log("hieronder de geresovled clan")
            console.log(clan.id)
            this.clanId = clan.id;
            this.clan.linkClanMember(this);
          }
        }

        setTopMask(topMask){
          console.log(topMask)
          this.topMaskId = topMask.id;
        }

        setMiddleMask(middleMask){
          console.log(middleMask)
          this.middleMaskId = middleMask.id;
        }

        setBottomMask(bottomMask){
          console.log(bottomMask)
          this.bottomMaskId = bottomMask.id;
        }
       //linkJourney(journey){
       //  !this.journeys.includes(journey) && this.journeys.push(journey);
       //}

        linkWayfarer(wayfarer){
          !this.wayfarers.includes(wayfarer) && this.wayfarers.push(wayfarer);
        }

        create = async () => this.store.createClanMember(this.asJson);
        update = async () => this.store.updateUser(this.asJson);
        delete = async () => this.store.deleteUser(this.asJson);


        updateFromJson({ name, age , topMaskId, middleMaskId, bottomMaskId, clanId }){
         
          this.setClan(this.store.rootStore.clanStore.resolveClan(clanId));
          this.setTopMask(this.store.rootStore.topMaskStore.resolveTopMask(topMaskId));
          this.setMiddleMask(this.store.rootStore.middleMaskStore.resolveMiddleMask(middleMaskId));
          this.setBottomMask(this.store.rootStore.bottomMaskStore.resolveBottomMask(bottomMaskId));
          
          this.name = name;
          this.age = age;

    
          

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
              clanId: this.clanId,
              topMaskId: this.topMaskId,
              middleMaskId: this.middleMaskId,
              bottomMaskId: this.bottomMaskId
              //age: this.age,
              //avatar: this.avatar,
              //journeys: this.journeys
            };
          }
}

decorate(ClanMemberModel, {
  journeys: observable,
  wayfarers: observable,
  updateFromJson: action,
  linkWayfarer: action,
  linkJourney: action,
  asJson: computed,
  setTopMask: action,
  setMiddleMask: action,
  setBottomMask: action,
  topMaskId: observable,
  middleMaskId: observable,
  bottomMaskId: observable
 });

export default ClanMemberModel;