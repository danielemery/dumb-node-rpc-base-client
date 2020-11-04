import { assert } from 'chai';

import parseDates from '../parseDates';

const SAMPLE_DATE_STRING = '2020-11-04T22:21:20.456Z';
const SAMPLE_DATE = new Date(Date.UTC(2020, 10, 4, 22, 21, 20, 456));

describe('parseDates', () => {
  it('must parse an ISO date string to a date', () => {
    const actual = parseDates(SAMPLE_DATE_STRING);
    const expected = SAMPLE_DATE;

    assert.deepEqual(actual, expected);
  });
  it('must parse a date within an object', () => {
    const subject = {
      a_date: SAMPLE_DATE_STRING,
      not_a_date: 'This is not a date',
    };

    const actual = parseDates(subject);
    const expected = {
      a_date: SAMPLE_DATE,
      not_a_date: 'This is not a date',
    };

    assert.deepEqual(actual, expected);
  });
  it('must leave an object untouched', () => {
    const expected = {
      field1: 'Hello',
      field2: 'World',
    };
    const actual = parseDates(expected);

    assert.deepEqual(actual, expected);
  });
  it('must parse a date within an array', () => {
    const subject = [SAMPLE_DATE_STRING, 'This is not a date'];

    const actual = parseDates(subject);
    const expected = [SAMPLE_DATE, 'This is not a date'];

    assert.deepEqual(actual, expected);
  });
  it('must leave an array untouched', () => {
    const expected = ['first entry', 'second entry'];
    const actual = parseDates(expected);

    assert.deepEqual(actual, expected);
  });
});
