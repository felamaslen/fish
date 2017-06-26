/**
 * Main App component initates the global dispatcher, sets the app state
 * and renders other components
 */

import { List as list } from 'immutable';
import React, { Component } from 'react';
import { Dispatcher } from 'flux';

// the global reducer decides what to do for each action
import globalReducer from '../reducers/GlobalReducer';

// side-effect handlers
import effectHandler from '../effects-handlers/EffectHandler';

// the reduction holds the state of the app
import Reduction from '../reduction';

// import sub-components
import { Header } from './Header';
import { Content } from './Content';

export default class App extends Component {
  constructor(props) {
    super(props);

    // define a flux model
    const dispatcher = new Dispatcher();

    // top-level store defined here
    dispatcher.register(action => {
      let reduction = this.state.reduction;

      // log all actions for debugging purposes
      const actionLog = this.state.actionLog.push(action);

      // purge side effects
      reduction = reduction.set('effects', list.of());
      // execute reducers
      reduction = globalReducer(reduction, action);
      reduction.get('effects').forEach(effectHandler.bind(null, dispatcher));

      // render views with changed properties
      this.setState({ reduction, actionLog });
    });

    // the state contains the dispatcher and reduction as its main properties
    this.state = {
      dispatcher,
      reduction: new Reduction(),
      actionLog: list.of() // for debugging
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Content dispatcher={this.state.dispatcher}
          tanks={this.state.reduction.getIn(['appState', 'tanks'])}
          water={this.state.reduction.getIn(['appState', 'water'])}
          last={this.state.reduction.getIn(['appState', 'last'])}
        />
      </div>
    );
  }
}

