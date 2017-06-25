/**
 * Tanks reducers
 */

import { fromJS } from 'immutable';
import buildMessage from '../messageBuilder';
import { EF_API_LIST_TANKS } from '../constants/effects';

export const rRequestTanks = reduction => {
  return reduction.set('effects', reduction.get('effects').push(
    buildMessage(EF_API_LIST_TANKS)
  ));
};
export const rReceiveTanks = (reduction, response) => {
  if (response.error) {
    return reduction;
  }
  return reduction
  .setIn(['appState', 'tanks', 'list'], fromJS(response.data.tanks))
  .setIn(['appState', 'tanks', 'active'], -1);
};

