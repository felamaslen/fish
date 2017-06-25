/**
 * This is run whenever an action is called by a view, and decides which
 * reducer to run based on the action given.
 */

import {
  LIST_ITEMS_REQUESTED, LIST_ITEMS_RECEIVED,

  LIST_ITEM_EDIT_MODAL_OPENED, LIST_ITEM_EDIT_MODAL_EDITED,
  LIST_ITEM_EDIT_MODAL_REMOVED,

  LIST_ITEM_EDIT_REQUESTED,
  LIST_ITEM_RECEIVED,
  LIST_ITEM_DELETE_REQUESTED, LIST_ITEM_DELETE_RECEIVED,

  TANK_ACTIVATED
} from '../constants/actions';

import {
  rRequestListItems, rReceiveListItems,
  rListItemEditModalOpen, rListItemEditModalEdit,
  rListItemEditModalRemove,
  rRequestEditListItem, rReceiveListItem,
  rRequestDeleteListItem, rReceiveDeleteListItem
} from './ListItemReducer';
import {
  rActivateTank
} from './TanksReducer';

export default (reduction, action) => {
  switch (action.type) {
  case LIST_ITEMS_REQUESTED:
    return rRequestListItems(reduction, action.payload);
  case LIST_ITEMS_RECEIVED:
    return rReceiveListItems(reduction, action.payload);

  case LIST_ITEM_EDIT_MODAL_OPENED:
    return rListItemEditModalOpen(reduction, action.payload);
  case LIST_ITEM_EDIT_MODAL_EDITED:
    return rListItemEditModalEdit(reduction, action.payload);
  case LIST_ITEM_EDIT_MODAL_REMOVED:
    return rListItemEditModalRemove(reduction, action.payload);

  case LIST_ITEM_EDIT_REQUESTED:
    return rRequestEditListItem(reduction, action.payload);
  case LIST_ITEM_RECEIVED:
    return rReceiveListItem(reduction, action.payload);
  case LIST_ITEM_DELETE_REQUESTED:
    return rRequestDeleteListItem(reduction, action.payload);
  case LIST_ITEM_DELETE_RECEIVED:
    return rReceiveDeleteListItem(reduction, action.payload);

  case TANK_ACTIVATED:
    return rActivateTank(reduction, action.payload);

  default:
    // By default, the reduction is simply returned unchanged.
    return reduction;
  }
};

