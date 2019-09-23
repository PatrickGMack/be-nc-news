const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('Returns an array with an object with a correctly formatted date when given one item', () => {
    const testArticle = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(formatDates(testArticle)[0].created_at).to.be.instanceOf(Date);
  });
  it('Returns an array with multiple objects with correctly formatted dates', () => {});
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
