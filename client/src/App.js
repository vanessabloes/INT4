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
import OpeningScreen from "./components/OpeningScreen/OpeningScreen";

const App = () => {
  const { journeyStore, uiStore } = useStore() // is nodig om de window.store te kunnen gebruiken om te testen
  return useObserver(() => (
      <div className={Styles.appContainer}>
   
        <Switch>
       <Route path={ROUTES.myClan}>
       {uiStore.loadedAllData ? 
           <MyClan />
           : <OpeningScreen/>}
       </Route>

       <Route path={ROUTES.addJourney}>
       {uiStore.loadedAllData ? 
           <AddJourney />
           : <Loading/>}
       </Route>

       <Route path={ROUTES.addStory.path}>
       {uiStore.loadedAllData ? 
           <AddStory />
           : <Loading/>}
       </Route>

       <Route path={ROUTES.nameJourney.path}>
       {uiStore.loadedAllData ? 
           <NameJourney />
           : <Loading/>}
       </Route>

       <Route path={ROUTES.storyDetail.path}>
       {uiStore.loadedAllData ? 
           <StoryDetail />
           : <Loading/>}
       </Route>

       <Route path={ROUTES.journeyDetail.path}>
       {uiStore.loadedAllData ? 
           <JourneyDetail />
           : <Loading/>}
       </Route>

       <Route path={ROUTES.home}>
           <Home page={ROUTES.home}/>
       </Route>
 </Switch>
    </div>
    
  ));
};

export default App;
