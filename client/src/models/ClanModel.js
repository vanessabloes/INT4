import { decorate, action, computed, observable } from "mobx";
import { v4 } from "uuid";

class ClanModel {
  constructor({ id = v4(), name, password, store, ...json }) {
    this.id = id;
    if (!store) {
      throw new Error("A clan needs a store");
    }
    this.name = name;
    this.password = password;
    this.store = store;
    //this.updateFromJson(json);
    this.clanMembers = [];
    this.journeys = [];
    this.store.addClan(this);
  }

  linkJourney(journeys) {
    !this.journeys.includes(journeys) && this.journeys.push(journeys);
  }

  linkClanMember(clanMember) {
    !this.clanMembers.includes(clanMember) && this.clanMembers.push(clanMember);
  }

  unlinkClanMember(clanMember) {
    const index = this.clanMembers.findIndex(test => test.id === clanMember.id);
    if (index !== -1) {
      this.clanMembers.splice(index, 1);
    }
  }



  create = async () => this.store.createClan(this.asJson);
  update = async () => this.store.updateUser(this.asJson);
  delete = async () => this.store.deleteUser(this.asJson);


  // updateFromJson({members = undefined}){
  //   console.log(clan)
  //  // this.journeys = journeys;
  //   //this.store.journeyStore.resolveJourney().linkClan(this)


  //   clan.forEach(member => {
  //        const createdMember = this.store.rootStore.clanMemberStore.updateUserFromServer(member);
  //        this.linkClanMember(createdMember);
  //     });

  // };

  updateFromJson = ({ members = undefined, journeys = undefined }) => {

    if (members !== undefined) {
      // unlink the old member
      // const oldMembers = this.members.concat();
      // oldMembers.forEach(member => member.unlinkGroup(this));
      members.forEach(member => {
       
        this.store.rootStore.clanMemberStore.
          updateClanMemberFromServer(member).setClan(this);
      });
    }
  if (journeys !== undefined) {

    journeys.forEach(journey => {

      this.store.rootStore.journeyStore.updateJourneyFromServer(journey).setClan(this);
    });
  }
}

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      password: this.password

    };
  }
}

decorate(ClanModel, {
  clanMembers: observable,
  updateFromJson: action,
  linkClanMember: action,
  journeys: observable,
  linkJourney: action,
  asJson: computed
});

export default ClanModel;