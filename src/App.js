import React from 'react';
import './App.css';
import Search from './components/Search';
import './Styles/Search.css';

class App extends React.Component{
  render(){
    return(
      <div>
          <nav class="navbar navbar-dark bg-dark">
            <div class="container">
            <h6 class="nav-text">iTune</h6></div>
          </nav>
        <Search/>
      </div>
    )
  }
}

export default App;
