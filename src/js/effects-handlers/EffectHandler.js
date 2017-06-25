/**
 * Define side effects here (e.g. API calls)
 */

import axios from 'axios';
import { API_URL } from '../../../local';
import buildEffectHandler from '../effectHandlerBuilder';

import {
  EF_API_LIST_LIST_ITEMS, EF_API_EDIT_LIST_ITEM, EF_API_DELETE_LIST_ITEM
} from '../constants/effects';

import {
  aListItemsReceived, aListItemReceived, aListItemDeleteReceived
} from '../actions/ListItemActions';

export default buildEffectHandler([
  [EF_API_LIST_LIST_ITEMS, (req, dispatcher) => {
    let url = `${API_URL}api/${req.table}`;
    if (req.params) {
      url += `/${req.params.join('/')}`;
    }
    axios.get(url).then(
      response => {
        if (!response.data.error) {
          dispatcher.dispatch(aListItemsReceived(req.table, response.data));
        }
      }
    );
  }],
  [EF_API_EDIT_LIST_ITEM, (req, dispatcher) => {
    if (req.item.get('id') !== null) {
      // update an existing item
      axios.post(`${API_URL}api/${req.table}/update`, req.item).then(
        response => {
          if (!response.data.error) {
            dispatcher.dispatch(aListItemReceived(req.table, req.item));
          }
        }
      );
    }
    else {
      // add a new item
      axios.post(`${API_URL}api/${req.table}/add`, req.item).then(
        response => {
          if (!response.data.error) {
            dispatcher.dispatch(aListItemReceived(
              req.table, req.item.set('id', response.data.data.id))
            );
          }
        }
      );
    }
  }],
  [EF_API_DELETE_LIST_ITEM, (req, dispatcher) => {
    axios.post(`${API_URL}api/${req.table}/delete`, { id: req.id }).then(
      response => {
        if (!response.data.error) {
          dispatcher.dispatch(aListItemDeleteReceived(req.table, req.id));
        }
      }
    );
  }]
]);
