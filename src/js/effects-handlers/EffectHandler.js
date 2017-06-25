/**
 * Define side effects here (e.g. API calls)
 */

import axios from 'axios';
import { API_URL } from '../../../local';
import buildEffectHandler from '../effectHandlerBuilder';

import {
  EF_API_LIST_TANKS
} from '../constants/effects';

import {
  aTanksReceived
} from '../actions/TanksActions';

export default buildEffectHandler([
  [EF_API_LIST_TANKS, (req, dispatcher) => {
    axios.get(`${API_URL}api/tanks`).then(
      response => dispatcher.dispatch(aTanksReceived(response.data))
    );
  }]
]);
