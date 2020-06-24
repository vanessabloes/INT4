import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import DefinedWordModel from "../models/DefinedWordModel";
import { v4 } from "uuid";
import DefinedStoryWordModel from "../models/DefinedStoryWordModel";
let checkedJourneyArray = [];
class DefinedWordStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.definedWords = [];
    this.definedWordsService = new RestService("definedwords");
  }


  loadAllDefinedWords = async () => {
    const jsonDefinedWords = await this.definedWordsService.getAll();
    jsonDefinedWords.forEach(json => this.updateDefinedWordFromServer(json));
  };

  loadDefinedWord = async (id) => {
    const jsonDefinedWord = await this.groupsService.getById(id);
    this.updateDefinedWordFromServer(jsonDefinedWord);
    return this.resolveDefinedWord(id);
  };

  updateDefinedWordFromServer(json) {
    console.log(json)
     let definedWord = this.definedWords.find(definedWord => definedWord.id === json.id);
     if (!definedWord) {
        definedWord = new DefinedWordModel({
            id: json.id, 
            content: json.content,
            store: this
         
        });
  
     }
    console.log(definedWord)
     //if (json.isDeleted) {
     //  this.definedWords.remove(definedWord);
     //} else {
     //  definedWord.updateFromJson(json);
     //}
     return definedWord;
    }

  resolveDefinedWord = id => this.definedWords.find(definedWord => definedWord.id === id);

  

//_____________________________//

  getDefinedWords(storyId){
    console.log("getting defined words from server")
    let allDefinedWordsFromServer = this.definedWords; // 22 models
    let allDefinedStoryWords = this.rootStore.uiStore.currentStory.definedStoryWords; // length = 0
    console.log(allDefinedWordsFromServer); // check
    console.log(allDefinedStoryWords);  // 0

    for (let index = 0; allDefinedStoryWords.length < this.rootStore.uiStore.currentJourney.wayfarers.length + 2; index++) {
     
      const randomItem = allDefinedWordsFromServer[Math.floor(Math.random() * allDefinedWordsFromServer.length)];
       console.log("choose a random word");
      console.log("_________LENGTE VAN DSW VAN DE CURRENT STORY", allDefinedStoryWords.length);

      if (this.checkDefinedWord(randomItem, storyId) === true) {
        console.log("random word already in journey");
      } else {
        console.log(randomItem);
      };

    }
   }

   checkDefinedWord(randomDefinedWord, storyId) {
    // console.log(this.store.rootStore.uiStore.currentJourney.definedWords.length)
    let isInArray = false;
    if (this.rootStore.uiStore.currentJourney.definedStoryWords.length > 0) {
      console.log("checkin length")
      let count = 0;
      
      this.rootStore.uiStore.currentJourney.definedStoryWords.forEach(definedStoryWord => {
        // console.log(definedStoryWord.definedWordId + "=" + definedWord.id)
        if (definedStoryWord.definedWordId === randomDefinedWord.id) {
          // console.log("id's are same");
          isInArray = true;
          !checkedJourneyArray.includes(definedStoryWord) && checkedJourneyArray.push(definedStoryWord);
          if(checkedJourneyArray.length === this.rootStore.uiStore.currentJourney.definedStoryWords.length){
            this.setDefinedWord(randomDefinedWord, storyId); // set anyway to prevent infinite loops
          }
        } else {
          count++;

          if (count === this.rootStore.uiStore.currentJourney.definedStoryWords.length) { // looped over whole array?
            this.setDefinedWord(randomDefinedWord, storyId);
            isInArray = false;

          }
        }
      });
    } else { // if nothing is in journey defined words

      console.log("lenght of journey array = 0")
      this.setDefinedWord(randomDefinedWord, storyId);
      isInArray = false;
    }
    return isInArray;
  }

  setDefinedWord = async (randomDefinedWord, storyId) => {
    console.log("set defined word")
   
    // moet nog een tussen model gemaakt worden voor enkel story 
  //  const definedStoryWord = new DefinedStoryWordModel({
  //    id: v4(),
  //    content: randomDefinedWord.content,
  //    storyId: storyId,
  //    definedWordId: randomDefinedWord.id,
  //    store: this.rootStore.definedStoryWordStore
  //  });

   // OUDE CODE const definedStoryWord = this.rootStore.definedStoryWordStore.updateDefinedStoryWordFromServer({id: v4(), content: randomDefinedWord.content, storyId: storyId, definedWordId: randomDefinedWord.id})
    
   const definedStoryWord = new DefinedStoryWordModel({
    id: v4(),
    content: randomDefinedWord.content,
    storyId: storyId,
    definedWordId: randomDefinedWord.id,
    store: this.rootStore.definedStoryWordStore
   });
   console.log("model made")
    if(definedStoryWord !== undefined){
   // this.rootStore.definedStoryWordStore.definedStoryWords.push(definedStoryWord);
    this.rootStore.uiStore.currentStory.addDefinedStoryWord(definedStoryWord);
    this.rootStore.uiStore.currentJourney.addDefinedStoryWord(definedStoryWord);
    }
    await definedStoryWord.create();

  }

  addDefinedWord(definedWord){
    this.definedWords.push(definedWord);
  }
}

decorate(DefinedWordStore, {
  definedWords: observable,
  addDefinedWord: action,
  updateDefinedWordFromServer: action,
  definedStoryWords: observable,
});

export default DefinedWordStore;
