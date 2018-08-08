import React, { Component } from 'react';
import * as io from 'socket.io-client/dist/socket.io';
import { get } from 'lodash';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.initSocketIo();
    this.state = { gameState: { } };
  }

  initSocketIo() {
    // TODO: Get backend URL from config
    this.socket = io('http://localhost:8888/');
    this.socket.on('gameStateUpdated', gameState => {
      this.setState({ gameState });
    });
  }

  getState(keys) {
    const list = get(this.state.gameState, keys, { });
    return (
      <ul>
        {Object.keys(list).map(key => <li key={key}>{key}: {list[key]}</li>)}
      </ul>
    );
  }

  render() {
    const { gameState } = this.state;
    return (
      <div>
        <h1>Odysseus Engineering</h1>
        <h2>System health</h2>
        {this.getState('systems.health')}
        <h2>System heat</h2>
        {this.getState('systems.heat')}
        <h2>Weapons</h2>
        {this.getState('weapons')}
        <h2>Pure JSON</h2>
        <pre>
          {JSON.stringify(gameState)}
        </pre>
      </div>
    );
  }
}

export default App;
