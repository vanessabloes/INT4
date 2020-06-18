import { decorate, observable, action } from "mobx";

class WordStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.spokenNouns = [];
    }

    addWord(word) {
        this.spokenNouns.push(word);
    };
}

decorate(WordStore, {
    spokenNouns: observable,
    addWord: action
});

export default WordStore;