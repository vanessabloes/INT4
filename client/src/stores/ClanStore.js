import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
//import ClanModel from "../models/ClanModel";


class ClanStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.clans = [];
    this.clanService = new RestService("clans");
  }

  addClan(clan){
    !this.clans.includes(clan) && this.clans.push(clan);
  }

  loadAllClans = async () => {
    const jsonClans = await this.groupsService.getAll();
    jsonClans.forEach(json => this.updateClanFromServer(json));
  };

  loadClan = async (id) => {
    const jsonClan = await this.groupsService.getById(id);
    this.updateClanFromServer(jsonClan);
    return this.resolveClan(id);
  };

  loadClanUsers = async (id) => {
    const jsonUsers = await this.groupsService.getById(id, 'users');
    this.updateClanFromServer({ id, users: jsonUsers });
    return this.resolveClan(id);
  };

  createClan = async group => {
    const json = await this.groupsService.create(group);
    this.updateClanFromServer(json);
  };

  updateLinkedUsers = async groupWithUsers => {
    const jsonUsers = await this.groupsService.updateLinked(groupWithUsers, 'users');
    this.updateClanFromServer({ id: groupWithUsers.id, users: jsonUsers });
    return this.resolveClan(groupWithUsers.id);
  };

  // updateClan = async group => {
  //   const json = await this.groupsService.update(group);
  //   this.updateClanFromServer(json);
  // };

  // deleteClan = async group => {
  //   const json = await this.groupsService.delete(group);
  //   this.updateClanFromServer(json);
  // };

  updateWayfarerFromServer(json) {
  //  let group = this.groups.find(group => group.id === json.id);
  //  if (!group) {
  //    group = new Clan({
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

  resolveClan = id => this.clans.find(clan => clan.id === id);

  addClan = clan => {
    this.clans.push(clan);
  };
}

decorate(ClanStore, {
  clans: observable,
  addClan: action,
  updateClanFromServer: action
});

export default ClanStore;
