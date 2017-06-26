/**
 * Tanks reducers
 */

import buildMessage from '../messageBuilder';
import {
  EF_API_LIST_LIST_ITEMS, EF_API_GET_LAST
} from '../constants/effects';

export const rActivateTank = (reduction, key) => {
  if (reduction.getIn(['appState', 'loading']) || reduction.getIn(
    ['appState', 'tanks', 'active']
  ) === key) {
    return reduction;
  }

  const tankId = reduction.getIn(['appState', 'tanks', 'list', key, 'id']);

  return reduction
  .setIn(['appState', 'tanks', 'active'], key)
  .setIn(['appState', 'loading'], true)
  .set(
    'effects', reduction.get('effects')
    .push(buildMessage(EF_API_LIST_LIST_ITEMS, {
      table: 'water',
      params: [tankId]
    }))
    .push(buildMessage(EF_API_GET_LAST, { item: 'feed', tankId }))
    .push(buildMessage(EF_API_GET_LAST, { item: 'waterChange', tankId }))
    .push(buildMessage(EF_API_GET_LAST, { item: 'filterClean', tankId }))
  );
};

