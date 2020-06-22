import React from "react";
//import styles from "./App.module.css";

import { useStore } from "./hooks/index";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "./consts";
import Home from "./containers/Home";
import JourneyDetail from "./containers/JourneyDetail";
import StoryDetail from "./containers/StoryDetail";
import MyClan from "./containers/MyClan";
import AddJourney from "./containers/AddJourney";
import AddStory from "./containers/AddStory";
import NameJourney from "./components/NameJourney";
import { useObserver } from "mobx-react-lite";
import Loading from "./components/Loading";
import Styles from "./App.module.css"



const App = () => {
  const { journeyStore, uiStore } = useStore() // is nodig om de window.store te kunnen gebruiken om te testen
  return useObserver(() => (
      <div className={Styles.appContainer}>
      {uiStore.loadedAllData ? 
        <Switch>
       <Route path={ROUTES.myClan}>
           <MyClan />
       </Route>

       <Route path={ROUTES.addJourney}>
           <AddJourney />
       </Route>

       <Route path={ROUTES.addStory.path}>
           <AddStory />
       </Route>

       <Route path={ROUTES.nameJourney.path}>
           <NameJourney />
       </Route>

       <Route path={ROUTES.storyDetail.path}>
           <StoryDetail />
       </Route>

       <Route path={ROUTES.journeyDetail.path}>
           <JourneyDetail />
       </Route>

       <Route path={ROUTES.home}>
           <Home page={ROUTES.home}/>
       </Route>
 </Switch>
: <Loading/>}
    </div>
    
  ));
};

export default App;
