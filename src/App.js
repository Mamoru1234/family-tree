import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { createAppStore } from './store/StoreUtils';
import TreeContainer from "./components/TreeContainer";

const store = createAppStore();

function App() {
  return (
    <Provider
      store = {store}
    >
      <div className="App">
        <TreeContainer/>
      </div>
    </Provider>
  );
}

export default App;
