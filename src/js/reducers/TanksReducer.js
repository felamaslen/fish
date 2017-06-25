/**
 * Tanks reducers
 */

import buildMessage from '../messageBuilder';
import { EF_API_LIST_LIST_ITEMS } from '../constants/effects';

export const rActivateTank = (reduction, key) => {
  if (reduction.getIn(['appState', 'loading']) || reduction.getIn(
    ['appState', 'tanks', 'active']
  ) === key) {
    return reduction;
  }
  return reduction
  .setIn(['appState', 'tanks', 'active'], key)
  .setIn(['appState', 'loading'], true)
  .set('effects', reduction.get('effects').push(buildMessage(
    EF_API_LIST_LIST_ITEMS, {
      table: 'water',
      params: [reduction.getIn(['appState', 'tanks', 'list', key, 'id'])]
    }
  )));
};

