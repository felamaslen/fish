/**
 * Actions for "last done" items, e.g. last water change
 */

import buildMessage from '../messageBuilder';
import {
  LAST_DONE_UPDATED, LAST_DONE_UPDATE_RECEIVED
} from '../constants/actions';

export const aLastDoneUpdated = (item, tankId) => {
  return buildMessage(LAST_DONE_UPDATED, { item, tankId });
};
export const aLastDoneUpdateReceived = (item, value) => {
  return buildMessage(LAST_DONE_UPDATE_RECEIVED, { item, value });
};

