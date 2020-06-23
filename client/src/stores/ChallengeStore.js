import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import ChallengeModel from "../models/ChallengeModel";

class ChallengeStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.challenges = [];
        this.challengesService = new RestService("challenges");
    }


    getChallengeByRoleId = (RoleId) => {
        return this.challenges.find(challenge => challenge.roleId === RoleId);
    }

    loadAllChallenges = async () => {
        const jsonChallenges = await this.challengesService.getAll();
        jsonChallenges.forEach(json => this.updateChallengeFromServer(json));
    };

    loadChallenge = async (id) => {
        const jsonChallenge = await this.groupsService.getById(id);
        this.updateChallengeFromServer(jsonChallenge);
        return this.resolveChallenge(id);
    };

    updateChallengeFromServer(json) {
        let challenge = this.challenges.find(challenge => challenge.id === json.id);
        if (!challenge) {
            challenge = new ChallengeModel({
                id: json.id,
                roleId: json.roleId,
                indoor: json.indoor,
                outdoor: json.outdoor,
                store: this.rootStore.challengeStore
            });

        }
    }

    resolveChallenge = id => this.challenges.find(challenge => challenge.id === id);

    addChallenge(challenge) {
        this.challenges.push(challenge);
    }

}

decorate(ChallengeStore, {
    challenges: observable,
    addChallenge: action,
    updateChallengeFromServer: action,
    resolveChallenge: action
});

export default ChallengeStore;
