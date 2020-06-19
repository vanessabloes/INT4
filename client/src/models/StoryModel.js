import { v4 } from "uuid";
import { decorate, action, computed, observable } from "mobx";
import DefinedStoryWordModel from "./DefinedStoryWordModel";

class StoryModel {

  constructor({ id = v4(), name, journeyId, store }) {
    this.id = id;
    this.name = name;
    this.store = store;
    this.words = [];
    this.definedStoryWords = [];

    //this.getDefinedWords();
    // this.updateFromJson({
    //  journeyId
    // });
    this.setJourney(this.store.rootStore.journeyStore.resolveJourney(journeyId));
    this.store.addStory(this);
    //if(journeyId){
    //    this.journey = this.store.journeyStore.resolveJourney(journeyId);
    //}

  }

  getDefinedWords() {

    const allDefinedWordsFromServer = this.store.rootStore.definedWordStore.definedWords;

    console.log(allDefinedWordsFromServer);
    for (let index = 0; this.definedStoryWords.length < 3; index++) {
      const randomItem = allDefinedWordsFromServer[Math.floor(Math.random() * allDefinedWordsFromServer.length)];
      // console.log("choose a random word");


      if (this.checkDefinedWord(randomItem) === true) {
        //console.log("random word already in journey");
      } else {
        //console.log(randomItem);
      };

    }
  }
  checkDefinedWord(randomDefinedWord) {
    // console.log(this.store.rootStore.uiStore.currentJourney.definedWords.length)
    let isInArray = false;
    if (this.store.rootStore.uiStore.currentJourney.definedWords.length > 0) {
      let count = 0;
      this.store.rootStore.uiStore.currentJourney.definedWords.forEach(definedStoryWord => {
        // console.log(definedStoryWord.definedWordId + "=" + definedWord.id)
        if (definedStoryWord.definedWordId === randomDefinedWord.id) {
          // console.log("id's are same");
          isInArray = true;

        } else {
          count++;

          if (count === this.store.rootStore.uiStore.currentJourney.definedWords.length) { // looped over whole array?
            this.setDefinedWord(randomDefinedWord);
            isInArray = false;

          }
        }
      });
    } else { // if nothing is in journey defined words


      this.setDefinedWord(randomDefinedWord);
      isInArray = false;
    }
    return isInArray;
  }


  setDefinedWord(randomDefinedWord) {
    console.log(randomDefinedWord)
    // moet nog een tussen model gemaakt worden voor enkel story 
    const definedStoryWord = new DefinedStoryWordModel({
      id: v4(),
      content: randomDefinedWord.content,
      storyId: this.id,
      definedWordId: randomDefinedWord.id,
      store: this.store.rootStore.definedStoryWordStore
    });


    this.definedStoryWords.push(definedStoryWord);
    this.store.rootStore.uiStore.currentJourney.addDefinedWord(definedStoryWord);
    definedStoryWord.create();

  }

  create = async () => this.store.createStory(this.asJson);



  setJourney(journey) {
    if (journey) {
      this.journeyId = journey.id;
      journey.linkStory(this);
    }
  }

  addWord(word) {
    this.words.push(word);
  }



  get journey() {
    return this.store.rootStore.journeyStore.resolveJourney(this.journeyId);
  }

  updateFromJson({ words }) {

    this.words = words;

  }


  get asJson() {
    return {
      id: this.id,
      name: this.name,
      definedWords: this.definedWords,
      journeyId: this.journeyId
    };
  }
}

decorate(StoryModel, {
  definedStoryWords: observable,
  getDefinedWords: action,
  setDefinedWord: action,
  setJourney: action,
  journey: computed,
  updateFromJson: action,
  words: observable,
  addWord: action,
  asJson: computed
});

export default StoryModel;