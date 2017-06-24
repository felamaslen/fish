import { Record, fromJS, List as list } from 'immutable';

import {
  formDefaultValues,
  formGetStatus
} from './config';

// the state of the app (reduction) is stored as an immutable object,
// and returned (modified) by reducers
export default new Record({
  appState: fromJS({
  }),
  // side effects
  effects: list.of()
});

