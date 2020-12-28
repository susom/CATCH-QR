import React from 'react'
import Activate from './views/Activate'
import Home from './views/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {

  return (
    <Router>
        <Switch>
          <Route path='/activate/:kitId' render={(props)=><Activate {...props} />}/>
          <Route path='/activate' render={(props)=><Activate {...props}/> }/>
          <Route path='/' render={(props)=><Activate {...props}/> }/>
        </Switch>
    </Router>
  );
}

export default App;
