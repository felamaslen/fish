/**
 * Tank actions
 */

import buildMessage from '../messageBuilder';

import {
  TANKS_REQUESTED,
  TANKS_RECEIVED
} from '../constants/actions';

export const aTanksRequested = () => buildMessage(TANKS_REQUESTED);
export const aTanksReceived = response => buildMessage(TANKS_RECEIVED, response);

