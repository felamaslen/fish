/**
 * ListItem actions
 */

import buildMessage from '../messageBuilder';

import {
  LIST_ITEMS_REQUESTED, LIST_ITEMS_RECEIVED,

  LIST_ITEM_EDIT_MODAL_OPENED, LIST_ITEM_EDIT_MODAL_EDITED,
  LIST_ITEM_EDIT_MODAL_REMOVED,

  LIST_ITEM_EDIT_REQUESTED, LIST_ITEM_RECEIVED,
  LIST_ITEM_DELETE_REQUESTED, LIST_ITEM_DELETE_RECEIVED
} from '../constants/actions';

export const aListItemsRequested = table => {
  return buildMessage(LIST_ITEMS_REQUESTED, table);
};
export const aListItemsReceived = (table, response) => {
  return buildMessage(LIST_ITEMS_RECEIVED, { table, response });
};

export const aListItemEditModalOpened = (table, id) => {
  return buildMessage(LIST_ITEM_EDIT_MODAL_OPENED, { table, id });
};
export const aListItemEditModalEdited = (table, props) => {
  return buildMessage(LIST_ITEM_EDIT_MODAL_EDITED, { table, props });
};
export const aListItemEditModalRemoved = table => {
  return buildMessage(LIST_ITEM_EDIT_MODAL_REMOVED, table);
};

export const aListItemEditRequested = table => {
  return buildMessage(LIST_ITEM_EDIT_REQUESTED, table);
};
export const aListItemReceived = (table, item) => {
  return buildMessage(LIST_ITEM_RECEIVED, { table, item });
};
export const aListItemDeleteRequested = (table, id) => {
  return buildMessage(LIST_ITEM_DELETE_REQUESTED, { table, id });
};
export const aListItemDeleteReceived = (table, id) => {
  return buildMessage(LIST_ITEM_DELETE_RECEIVED, { table, id });
};

