/**
 * Tanks component
 */

import { ListItems } from './ListItems';
import { aTankActivated } from '../actions/TanksActions';

export class Tanks extends ListItems {
  listItemClick(key) {
    this.dispatchAction(aTankActivated(key));
  }
  getItemTitle(item) {
    return item.get('name');
  }
  componentWillMount() {
    this.dispatchAction(this.actionRequestItems());
  }
}

