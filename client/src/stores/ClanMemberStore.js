import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
//import ClanMemberModel from "../models/ClanMemberModel";


class ClanMemberStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.clanMembers = [];
    this.clanMemberService = new RestService("clanMembers");
  }

  addClanMember(clanMember){
    !this.clanMembers.includes(clanMember) && this.clanMembers.push(clanMember);
  }

  loadAllClanMembers = async () => {
    const jsonClanMembers = await this.groupsService.getAll();
    jsonClanMembers.forEach(json => this.updateClanMemberFromServer(json));
  };

  loadClanMember = async (id) => {
    const jsonClanMember = await this.groupsService.getById(id);
    this.updateClanMemberFromServer(jsonClanMember);
    return this.resolveClanMember(id);
  };

  loadClanMemberUsers = async (id) => {
    const jsonUsers = await this.groupsService.getById(id, 'users');
    this.updateClanMemberFromServer({ id, users: jsonUsers });
    return this.resolveClanMember(id);
  };

  createClanMember = async group => {
    const json = await this.groupsService.create(group);
    this.updateClanMemberFromServer(json);
  };

  updateLinkedUsers = async groupWithUsers => {
    const jsonUsers = await this.groupsService.updateLinked(groupWithUsers, 'users');
    this.updateClanMemberFromServer({ id: groupWithUsers.id, users: jsonUsers });
    return this.resolveClanMember(groupWithUsers.id);
  };

  // updateClanMember = async group => {
  //   const json = await this.groupsService.update(group);
  //   this.updateClanMemberFromServer(json);
  // };

  // deleteClanMember = async group => {
  //   const json = await this.groupsService.delete(group);
  //   this.updateClanMemberFromServer(json);
  // };

  updateWayfarerFromServer(json) {
  //  let group = this.groups.find(group => group.id === json.id);
  //  if (!group) {
  //    group = new ClanMember({
  //      id: json.id,
  //      store: this.rootStore.groupStore
  //    });
  //  }
  //  if (json.isDeleted) {
  //    this.groups.remove(group);
  //  } else {
  //    group.updateFromJson(json);
  //  }
  //  return group;
  }

  resolveClanMember = id => this.clanMembers.find(clanMember => clanMember.id === id);

  addClanMember = clanMember => {
    this.clanMembers.push(clanMember);
  };
}

decorate(ClanMemberStore, {
  clanMembers: observable,
  addClanMember: action,
  updateClanMemberFromServer: action
});

export default ClanMemberStore;
