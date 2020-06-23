const ROUTES = {
  home: "/",
  myClan: "/myclan",
  addJourney: "/addjourney",
  addStory: { path: "/:id/addStory/:storyId", to: "/addStory" },
  nameJourney: { path: "/:id/nameJourney", to: "/nameJourney" },
  journeyDetail: { path: "/:id", to: "/" }, // to = de backlink naar parentpagina
  storyDetail: { path: "/:id/:story_id", to: "/:id" }, // to = de backlink naar parentpagina
};

const STATES = {
  HOME_STATE_OPENING_SCREEN: "Opening Screen",
  HOME_STATE_FAMILY: "Opening Family",
  HOME_STATE_SURREAL_WORLD: "Opening Surreal World",
  HOME_STATE_HOME: "home",
  ADDJOURNEY_STATE_ADDWAYFARERS: "Add Wayfarers",
  ADDJOURNEY_STATE_CHOOSEROLES: "Choose roles",
  ADDJOURNEY_STATE_EXPLOREROLES: "Explore roles",
  ADDSTORY_STATE_LOADING: "Loading",
  ADDSTORY_STATE_CORE: "Core function",
  ADDSTORY_STATE_CHALLENGE: "Do challenge",
};

export { ROUTES, STATES };