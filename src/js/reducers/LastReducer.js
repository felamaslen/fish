/**
 * Reducer for "last done" items, e.g. last water change
 */

import { List as list } from 'immutable';
import buildMessage from '../messageBuilder';
import { EF_API_UPDATE_LAST } from '../constants/effects';

const formatAge = (milliseconds, shortAbbr) => {
  if (milliseconds === null) {
    return null;
  }
  const seconds = (new Date().getTime() - milliseconds) / 1000;

  const measures = list([
    [1, 's', 'second'],
    [60, 'm', 'minute'],
    [3600, 'h', 'hour'],
    [86400, 'd', 'day'],
    [86400 * 30, 'M', 'month'],
    [86400 * 365, 'Y', 'year']
  ]);

  const getMeasureText = (measure, thisSeconds, floor) => {
    const value = thisSeconds / measure[0];
    const rounded = floor ? Math.floor(value) : Math.round(value);
    const plural = !shortAbbr ? (rounded === 1 ? '' : 's') : '';
    const units = measure[shortAbbr ? 1 : 2] + plural;

    return shortAbbr ? `${rounded}${units}` : `${rounded} ${units}`;
  };

  const secondsNormalised = Math.max(seconds, 1);
  const mainMeasureIndex = measures.findLastIndex(item => item[0] <= secondsNormalised);
  const mainMeasure = measures.get(mainMeasureIndex);
  const measureText = [getMeasureText(mainMeasure, secondsNormalised, true)];

  if (mainMeasureIndex > 0) {
    const extraSeconds = secondsNormalised % mainMeasure[0];
    if (extraSeconds > 0) {
      measureText.push(getMeasureText(measures.get(mainMeasureIndex - 1), extraSeconds));
    }
  }

  return measureText.join(', ') + (shortAbbr ? '' : ' ago');
};

export const rUpdateLastDone = (reduction, res) => {
  return reduction.setIn(['appState', 'last', res.item], formatAge(res.value));
};

export const rRequestLastItemUpdate = (reduction, req) => {
  return reduction.set(
    'effects', reduction.get('effects')
    .push(buildMessage(EF_API_UPDATE_LAST, { item: req.item, tankId: req.tankId }))
  );
};
