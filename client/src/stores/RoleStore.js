import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import RoleModel from "../models/RoleModel";

class RoleStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.roles = [];
    this.rolesService = new RestService("roles");
    this.uniqueRoles = [];
  }


  loadAllRoles = async () => {
    const jsonRoles = await this.rolesService.getAll();
  
    jsonRoles.forEach(json => this.updateRoleFromServer(json));
  };

  loadRole = async (id) => {
    const jsonRole = await this.groupsService.getById(id);
    this.updateRoleFromServer(jsonRole);
    return this.resolveRole(id);
  };

  updateRoleFromServer(json) {
    let role = this.roles.find(role => role.id === json.id);
    if (!role) {
      role = new RoleModel({
        id: json.id,
        roleName: json.roleName,
        roleDescription: json.roleDescription,
        powerName: json.powerName,
        powerDescription: json.powerDescription,
        image: json.image,
        store: this.rootStore.roleStore
      });

    }
    // if (json.isDeleted) {
    //   this.roles.remove(role);
    // } else {
    //   role.updateFromJson(json);
    // }
    // return role;
  }

  resolveRole = id => this.roles.find(role => role.id === id);

  addRole(role) {
    
    this.roles.push(role);
  }

  addUniqueRole(role) {
    this.uniqueRoles.push(role);
  }
}

decorate(RoleStore, {
  roles: observable,
  addRole: action,
  updateRoleFromServer: action,
  uniqueRoles: observable,
  addUniqueRole: action,
  resolveRole: action
});

export default RoleStore;
