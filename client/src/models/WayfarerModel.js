import { decorate, action, computed, observable } from "mobx";
import { v4 } from "uuid";

class WayfarerModel {
  constructor({ id = v4(), clanMemberId, journeyId, roleId, topMaskId, middleMaskId, bottomMaskId, name, store, ...json }) {
    this.id = id;
    if (!store) {
      throw new Error("A wayfarer needs a store");
    }
    this.store = store;
    this.roleId = roleId;
    this.clanMemberId = clanMemberId;
    this.journeyId = journeyId;

    this.topMaskId = topMaskId;
    this.middleMaskId = middleMaskId;
    this.bottomMaskId = bottomMaskId;
    this.name = name;

    this.store.addWayfarer(this);

    // this.store.clanMemberStore.addWayfarer(this);
  }



  setJourney(journey) {
    if (journey) {
      this.journeyId = journey.id;
      journey.linkWayfarer(this);
    }
  }

  setClanMember(clanMember) {

    if (clanMember) {
      this.clanMemberId = clanMember.id;
      clanMember.linkWayfarer(this);
    }
  }
  setRole(role) {
    if (role) {
      this.roleId = role.id;
      // this.role.linkWayfarer(this);
    }
  }



  create = async () => this.store.createWayfarer(this.asJson);
  update = async () => this.store.updateUser(this.asJson);
  delete = async () => this.store.deleteUser(this.asJson);

  setTopMask(topMask) {

    this.topMaskId = topMask.id;
  }

  setMiddleMask(middleMask) {
    this.middleMaskId = middleMask.id;
  }

  setBottomMask(bottomMask) {
    this.bottomMaskId = bottomMask.id;
  }


  get journey() {
    return this.store.rootStore.journeyStore.resolveJourney(this.journeyId);
  }
  get clanMember() {
    return this.store.rootStore.clanMemberStore.resolveClanMember(this.clanMemberId);
  }
  get role() {
    return this.store.rootStore.roleStore.resolveRole(this.roleId);
  }

  updateFromJson({ journeyId, clanMemberId, roleId, topMaskId, middleMaskId, bottomMaskId, name }) {

    console.log(roleId)
    if (clanMemberId !== undefined) {

      this.setClanMember(this.store.rootStore.clanMemberStore.resolveClanMember(clanMemberId));
      this.setJourney(this.store.rootStore.journeyStore.resolveJourney(journeyId));
      this.setRole(this.store.rootStore.roleStore.resolveRole(roleId));

      if (topMaskId !== undefined) {
        this.setTopMask(this.store.rootStore.topMaskStore.resolveTopMask(topMaskId.toString()));
        this.setMiddleMask(this.store.rootStore.middleMaskStore.resolveMiddleMask(middleMaskId.toString()));
        this.setBottomMask(this.store.rootStore.bottomMaskStore.resolveBottomMask(bottomMaskId.toString()));
      }

      this.name = name;
      // this.journeys = journeys;
      //this.store.journeyStore.resolveJourney().linkWayfarer(this)
    }
  };

  get asJson() {
    return {
      id: this.id,
      clanMemberId: this.clanMemberId,
      journeyId: this.journeyId,
      roleId: this.roleId,
      topMaskId: this.topMaskId,
      middleMaskId: this.middleMaskId,
      bottomMaskId: this.bottomMaskId,
      name: this.name
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
  asJson: computed,
  topMaskId: observable,
  middleMaskId: observable,
  bottomMaskId: observable,
  name: observable,
  setTopMask: action,
  setMiddleMask: action,
  setBottomMask: action
});

export default WayfarerModel;