import { decorate, action, computed, observable } from "mobx";
import { v4 } from "uuid";

class JourneyModel {
  constructor({ id = v4(), stories = [], image = "image", name = "Your journey", clanId, store }) {
    if (!store) {
      throw new Error("A journey needs a store");
    }
    this.id = id;
    this.name = name;
    this.image = image;
    this.store = store;
    this.stories = stories;
    this.wayfarers = [];
    this.definedStoryWords = [];
    this.setClan(this.store.rootStore.clanStore.resolveClan(clanId));
    //this.updateFromJson(json);
    this.store.addJourney(this);
  }

  create = async () => this.store.createJourney(this.asJson);

  update = async () => this.store.updateJourney(this.asJson);

  linkStory(story) {
    !this.stories.includes(story) && this.stories.push(story);
  }

  linkWayfarer(wayfarer) {
    !this.wayfarers.includes(wayfarer) && this.wayfarers.push(wayfarer);
  }

  setClan(clan) {
    if (clan) {
      this.clanId = clan.id;
      clan.linkJourney(this);
    }
  }

  setJourneyName(name) {
    this.name = name;
  }

  setImage(image) {
    this.image = image;
  }

  updateFromJson({ name, image, wayfarers = undefined, stories = undefined }) {
  

    if(name !== undefined){
    this.name = name;
    this.image = image;
    }
    if (wayfarers !== undefined) {
      wayfarers.forEach(wayfarer => {
        console.log(wayfarer)
        this.store.rootStore.wayfarerStore.updateWayfarerFromServer(wayfarer).setJourney(this);
      });
    }
    if (stories !== undefined) {
      stories.forEach(story => {
  
        this.store.rootStore.storyStore.updateStoryFromServer(story).setJourney(this);
      });
    }

  }

   addDefinedStoryWord(definedStoryWord) {
    !this.definedStoryWords.includes(definedStoryWord) && this.definedStoryWords.push(definedStoryWord);
  }

  get wordCounter() {
    return (this.wayfarers.length * 30) - this.store.rootStore.uiStore.currentStory.words.length;
}

get definedJourneyStoryWords() {
  let array = [];
  this.stories.forEach(story => {
      story.definedStoryWords.forEach(definedStoryWord => {
        array.push(definedStoryWord);
      });
  });
  return array;
}

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      clanId: this.clanId
    };
  }
}

decorate(JourneyModel, {
  definedWords: observable,
  addDefinedWord: action,
  wayfarers: observable,
  stories: observable,
  linkStory: action,
  linkWayfarer: action,
  updateFromJson: action,
  asJson: computed,
  setJourneyName: action,
  setImage: action,
  setClan: action,
  wordCounter: computed,

  definedJourneyStoryWords: computed
});

export default JourneyModel;