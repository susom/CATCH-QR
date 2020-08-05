import React, {useState} from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button'

function App() {
  const [test, updateTest] = useState('')
  const handleClick = () => {
    axios.get(`/api?name=hii`)
      .then(res=>updateTest(res?.data?.greeting))
      .catch(err=>console.log(err))
  }
  return (
    <div className="App">
      <header className="App-header">
        {test ? test : 'Nothing'}
        <p>
          Welcome 
        </p>
        <Button
          onClick={handleClick}
          variant="outlined" color="primary"
        >
          Click
        </Button>
        <Button variant="outlined">Second</Button>
      </header>
    </div>
  );
}

export default App;
