// import { decorate, observable, action } from "mobx";

class WordStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }
}

// decorate(WordStore, {
// });

export default WordStore;