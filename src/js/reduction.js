import { Record, fromJS, List as list } from 'immutable';

import {
  currentDate
} from './config';

// the state of the app (reduction) is stored as an immutable object,
// and returned (modified) by reducers
export default new Record({
  appState: fromJS({
    loading: false,
    tanks: {
      list: [],
      active: -1,
      editing: {},
      props: [
        { key: 'name', defaultValue: () => '', name: 'Name', inputProps: {}, noList: true },
        { key: 'volume', defaultValue: () => 0, name: 'Volume (l)', inputProps: {
          type: 'number', step: 1
        } }
      ]
    },
    water: {
      list: [],
      active: -1,
      editing: {},
      props: [
        { key: 'date', defaultValue: () => currentDate(), name: 'Date', inputProps: {
          type: 'date'
        }, noList: true },
        { key: 'ph', defaultValue: () => 7, name: 'pH', inputProps: {
          type: 'number', min: 0, max: 14, step: 0.1
        } },
        { key: 'nh3', defaultValue: () => 0, name: 'NH3 (Ammonia)', inputProps: {
          type: 'number', min: 0, step: 0.1
        } },
        { key: 'no2', defaultValue: () => 0, name: 'NO2 (Nitrite)', inputProps: {
          type: 'number', min: 0, step: 0.1
        } },
        { key: 'no3', defaultValue: () => 0, name: 'NO3 (Nitrate)', inputProps: {
          type: 'number', min: 0, step: 0.1
        } },
        { key: 'kh', defaultValue: () => 0, name: 'KH (Hardness)', inputProps: {
          type: 'number', min: 0, step: 0.1
        } },
        { key: 'gh', defaultValue: () => 0, name: 'GH (Hardness)', inputProps: {
          type: 'number', min: 0, step: 0.1
        } },
        { key: 'notes', defaultValue: () => '', name: 'Notes', inputProps: {
          type: 'text'
        } },
        { key: 'tankId', defaultValue: reduction => {
          return reduction.getIn(['appState', 'tanks', 'list', reduction.getIn(
            ['appState', 'tanks', 'active']
          ), 'id']);
        }, name: null, inputProps: { type: 'hidden' }, noList: true }
      ]
    }
  }),
  // side effects
  effects: list.of()
});

