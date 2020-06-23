import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import DefinedStoryWordModel from "../models/DefinedStoryWordModel";
import { v4 } from "uuid";


class DefinedStoryWordStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.definedStoryWords = [];
    this.definedStoryWordsService = new RestService("definedstorywords");
  }

  createDefinedStoryWord = async definedStoryWord => {
  const json = await this.definedStoryWordsService.create(definedStoryWord);
  this.updateDefinedStoryWordFromServer(json);
  }

  updateDefinedStoryWord = async definedStoryWord => {
    console.log(definedStoryWord); // model 
    const json = await this.definedStoryWordsService.update(definedStoryWord);
    console.log(json); // undefined
    this.updateDefinedStoryWordFromServer(json);
  }

  updateLinkedUsers = async groupWithUsers => {
    const jsonUsers = await this.groupsService.updateLinked(groupWithUsers, 'users');
    this.updateGroupFromServer({ id: groupWithUsers.id, users: jsonUsers });
    return this.resolveGroup(groupWithUsers.id);
  };

  loadAllDefinedStoryWords = async () => {
    console.log("im loading all dfsw")
    const jsonDefinedStoryWords = await this.definedStoryWordsService.getAll();
    console.log(jsonDefinedStoryWords)
    jsonDefinedStoryWords.forEach(json => this.updateDefinedStoryWordFromServer(json));
    return jsonDefinedStoryWords
  };




  loadDefinedStoryWord = async (id) => {
    const jsonDefinedStoryWord = await this.groupsService.getById(id);
    this.updateDefinedStoryWordFromServer(jsonDefinedStoryWord);
    return this.resolveDefinedStoryWord(id);
  };

  updateDefinedStoryWordFromServer(json) {

    let definedStoryWord = this.definedStoryWords.find(definedStoryWord => definedStoryWord.id === json.id);
    console.log("gecheckt")
     console.log(definedStoryWord)
     if (!definedStoryWord) {
        
        definedStoryWord = new DefinedStoryWordModel({
            id: json.id, 
            content: json.content,
            isReached: json.isReached,
            storyId: json.storyId,
            definedWordId: json.definedWordId,
            store: this
        });

     }
     if (json.isDeleted) {
       this.definedStoryWords.remove(definedStoryWord);
     } else {
       definedStoryWord.updateFromJson(json);
     }
     return definedStoryWord;
    }

  resolveDefinedStoryWord = id => this.definedStoryWords.find(definedStoryWord => definedStoryWord.id === id);

  addDefinedStoryWord = (definedStoryWord) => {
      this.definedStoryWords.push(definedStoryWord);
  }
}

decorate(DefinedStoryWordStore, {
  definedStoryWords: observable,
  addDefinedStoryWord: action,
  updateDefinedStoryWordFromServer: action
});

export default DefinedStoryWordStore;
