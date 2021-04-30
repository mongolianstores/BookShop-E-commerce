import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './state/main-state'
import Header from './components/header/header'
import Pages from './components/pages/pages'
import Bottom from './components/bottom/bottom'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
          <Bottom />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
