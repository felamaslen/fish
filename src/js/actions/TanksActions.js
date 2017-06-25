/**
 * Tanks actions
 */

import buildMessage from '../messageBuilder';
import { TANK_ACTIVATED } from '../constants/actions';

export const aTankActivated = key => buildMessage(TANK_ACTIVATED, key);

