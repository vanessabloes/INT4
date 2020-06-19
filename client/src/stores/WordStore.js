import { decorate, observable, action, computed } from "mobx";

class WordStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.spokenNouns = [];
        this.pitsttops = [];
    }

    addWord(word) {
        this.spokenNouns.push(word);
    };

    get wordCounter() {
        return this.spokenNouns.length;
    }
}

decorate(WordStore, {
    spokenNouns: observable,
    addWord: action,
    wordCounter: computed
});

export default WordStore;