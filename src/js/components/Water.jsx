/**
 * Water tests component
 */

import PropTypes from 'prop-types';
import { ListItems } from './ListItems';

export class Water extends ListItems {
  addButtonClick() {
    if (this.props.tankKey === -1) {
      console.warn('Please select a tank first');
      return;
    }
    super.addButtonClick();
  }
  getItemTitle(item) {
    return item.get('date');
  }
}

Water.propTypes = {
  tankKey: PropTypes.number
};

