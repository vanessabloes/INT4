import { decorate, observable, action } from "mobx";
import WordModel from "../models/WordModel";
import RestService from "../services/RestService";

class WordStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.spokenNouns = [];
        this.pitsttops = [];
        this.wordsService = new RestService("words");
    }

    addWord = (word) => {
        this.spokenNouns.push(word);
    };


    createWord = async word => {
        console.log(word);
        const json = await this.wordsService.create(word);
        console.log(json);
        this.updateWordFromServer(json);
      };

      updateWordFromServer(json) {
        console.log("vaan server")
        console.log(json)
        let word = this.spokenNouns.find(word => word.id === json.id); 
        if (!word) {
          word = new WordModel({
            id: json.id,
            content: json.name,
            storyId: json.storyId,
            store: this
          });
        }
        if (json.isDeleted) {
          this.word.remove(word);
        } else {
          //word.updateFromJson(json); 
        }
        return word;
      }


  
}

decorate(WordStore, {
    spokenNouns: observable,
    addWord: action,
    updateWordFromServer: action
});

export default WordStore;