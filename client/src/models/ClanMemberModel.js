import { decorate, action, computed, observable, set } from "mobx";
import { v4 } from "uuid";

class ClanMemberModel {
  constructor({ id = v4(), name, age, clanId, topMaskId, middleMaskId, bottomMaskId, store }) {
    this.id = id;
    if (!store) {
      throw new Error("A member needs a store");
    }

    this.store = store;
    this.topMaskId = topMaskId;
    this.middleMaskId = middleMaskId;
    this.bottomMaskId = bottomMaskId;
    this.name = name;
    this.age = age;
    this.clanId = clanId;
    //this.journeys = [];
    this.wayfarers = [];


    this.store.addClanMember(this);

  }

  setClan(clan) {
    if (clan) {
      this.clanId = clan.id;
      clan.linkClanMember(this);
    }
  }

  setTopMask(topMask) {
    
    this.topMaskId = topMask.id;
  }

  setMiddleMask(middleMask) {
    this.middleMaskId = middleMask.id;
  }

  setBottomMask(bottomMask) {
    this.bottomMaskId = bottomMask.id;
  }
  //linkJourney(journey){
  //  !this.journeys.includes(journey) && this.journeys.push(journey);
  //}

  setAge(age) {
    this.age = age;
  }

  setNickname(nickname) {
    this.name = nickname;
  }

  linkWayfarer(wayfarer) {
    !this.wayfarers.includes(wayfarer) && this.wayfarers.push(wayfarer);
  }

  create = async () => this.store.createClanMember(this.asJson);
  update = async () => this.store.updateClanMember(this.asJson);
  delete = async () => this.store.deleteClanMember(this.asJson);


  updateFromJson({ name, age, topMaskId, middleMaskId, bottomMaskId, clanId }) {

    //console.log(topMaskId.toString());

    this.setClan(this.store.rootStore.clanStore.resolveClan(clanId));
   
    if (topMaskId !== undefined) {
      this.setTopMask(this.store.rootStore.topMaskStore.resolveTopMask(topMaskId.toString()));
      this.setMiddleMask(this.store.rootStore.middleMaskStore.resolveMiddleMask(middleMaskId.toString()));
      this.setBottomMask(this.store.rootStore.bottomMaskStore.resolveBottomMask(bottomMaskId.toString()));
    }
    this.name = name;
    this.age = age;


  };
  get clan() {
    return this.store.rootStore.clanStore.resolveClan(this.clanId);
  }

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      clanId: this.clanId,
      topMaskId: this.topMaskId,
      middleMaskId: this.middleMaskId,
      bottomMaskId: this.bottomMaskId
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
  bottomMaskId: observable,
  setAge: action,
  setNickname: action,
  age: observable,
  name: observable
});

export default ClanMemberModel;