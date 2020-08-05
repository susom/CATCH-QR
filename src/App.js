import React from 'react'
import Landing from './views/Landing'
import Register from './views/Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {

  return (
    <Router>
        <Switch>
          {/* <Route path='/register/:kitId' render={(props)=><Register {...props} />}/> */}
          <Route path='/register/:kitId' component={() => { 
              window.location.href = 'https://google.com'; 
              return null;
          }}/>
          <Route path='/' render={(props)=><Landing {...props}/> }/>
        </Switch>
    </Router>
  );
}

export default App;
