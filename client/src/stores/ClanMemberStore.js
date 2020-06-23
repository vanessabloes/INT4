import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import ClanMemberModel from "../models/ClanMemberModel";


class ClanMemberStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.clanMembers = [];
    this.clanMembersService = new RestService("members");
  }

  addClanMember(clanMember) {
    !this.clanMembers.includes(clanMember) && this.clanMembers.push(clanMember);
  }

  loadAllClanMembers = async () => {

    const jsonClanMembers = await this.clanMembersService.getAll();

    jsonClanMembers.forEach(json => this.updateClanMemberFromServer(json));
  };

  // loadClanMember = async (id) => {
  //   const jsonClanMember = await this.clanMembersService.getById(id);
  //   this.updateClanMemberFromServer(jsonClanMember);
  //   return this.resolveClanMember(id);
  // };
  //
  // loadClanMemberUsers = async (id) => {
  //   const jsonUsers = await this.clanMembersService.getById(id, 'users');
  //   this.updateClanMemberFromServer({ id, users: jsonUsers });
  //   return this.resolveClanMember(id);
  // };

  createClanMember = async clanMember => {

    const json = await this.clanMembersService.create(clanMember);

    this.updateClanMemberFromServer(json);
  };

  // updateLinkedUsers = async clanMemberWithUsers => {
  //   const jsonUsers = await this.clanMembersService.updateLinked(clanMemberWithUsers, 'users');
  //   this.updateClanMemberFromServer({ id: clanMemberWithUsers.id, users: jsonUsers });
  //   return this.resolveClanMember(clanMemberWithUsers.id);
  // };

  updateClanMember = async clanMember => {
    const json = await this.clanMembersService.update(clanMember);
    this.updateClanMemberFromServer(json);
  };

  deleteClanMember = async clanMember => {
    // this.rootStore.clanStore.resolveClan(clanMember.clanId).unlinkClanMember(clanMember); VANESSA
    const json = await this.clanMembersService.delete(clanMember);
    console.log(json);
    this.updateClanMemberFromServer(json);
  };

  updateClanMemberFromServer(json) {
    // we krijgen hier 1 member binnen
    let clanMember = this.clanMembers.find(clanMember => clanMember.id === json.id);

    if (!clanMember) {
      clanMember = new ClanMemberModel({
        id: json.id,
        name: json.name,
        clanId: json.clanId,
        topMaskId: json.topMaskId,
        middleMaskId: json.middleMaskId,
        bottomMaskId: json.bottomMaskId,
        store: this.rootStore.clanMemberStore
      });

    }
    if (json.isDeleted) {
      this.clanMembers.remove(clanMember);
      this.rootStore.uiStore.currentClan.unlinkClanMember(clanMember);
      //console.log(this.clanMembers);

    } else {
      clanMember.updateFromJson(json);
    }
    return clanMember;
  }

  resolveClanMember = id => this.clanMembers.find(clanMember => clanMember.id === id);

}

decorate(ClanMemberStore, {
  clanMembers: observable,
  addClanMember: action,
  updateClanMemberFromServer: action
});

export default ClanMemberStore;
