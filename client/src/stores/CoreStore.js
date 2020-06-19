import { decorate, observable, action } from "mobx";

class CoreStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.state = "core";
    }

    setState(state) {
        this.state = state;
    }

    setListening(listening) {
        this.listening = listening;
    }
}

decorate(CoreStore, {
    state: observable,
    setState: action,
    listening: observable,
    setListening: action
});

export default CoreStore;

