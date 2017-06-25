/**
 * Define side effects here (e.g. API calls)
 */

import axios from 'axios';
import { API_URL } from '../../../local';
import buildEffectHandler from '../effectHandlerBuilder';

import {
  EF_API_LIST_TANKS,
  EF_API_EDIT_TANK, EF_API_DELETE_TANK
} from '../constants/effects';

import {
  aTanksReceived, aTankReceived, aTankDeleteReceived
} from '../actions/TanksActions';

export default buildEffectHandler([
  [EF_API_LIST_TANKS, (req, dispatcher) => {
    axios.get(`${API_URL}api/tanks`).then(
      response => {
        if (!response.data.error) {
          dispatcher.dispatch(aTanksReceived(response.data));
        }
      }
    );
  }],
  [EF_API_EDIT_TANK, (tank, dispatcher) => {
    if (tank.get('id') !== null) {
      // update an existing tank
      axios.post(`${API_URL}api/tanks/update`, tank).then(
        response => {
          if (!response.data.error) {
            dispatcher.dispatch(aTankReceived(tank));
          }
        }
      );
    }
    else {
      // add a new tank
      axios.post(`${API_URL}api/tanks/add`, tank).then(
        response => {
          if (!response.data.error) {
            dispatcher.dispatch(aTankReceived(tank.set('id', response.data.data.id)));
          }
        }
      );
    }
  }],
  [EF_API_DELETE_TANK, (id, dispatcher) => {
    axios.post(`${API_URL}api/tanks/delete`, { id }).then(
      response => {
        if (!response.data.error) {
          dispatcher.dispatch(aTankDeleteReceived(id));
        }
      }
    );
  }]
]);
