const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('#formatDates', () => {
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
  it('Returns an array with multiple objects with correctly formatted dates', () => {
    const testArticles = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: 1289996514171
      },
      {
        title: 'A',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Delicious tin of cat food',
        created_at: 911564514171
      }
    ];
    expect(formatDates(testArticles)[0].created_at).to.be.instanceOf(Date);
    expect(formatDates(testArticles)[1].created_at).to.be.instanceOf(Date);
    expect(formatDates(testArticles)[2].created_at).to.be.instanceOf(Date);
  });
});

describe('#makeRefObj', () => {
  it('Returns an empty object when passed an empty array', () => {
    expect(makeRefObj([])).to.eql({});
  });
  it('Returns an object with data from one array correctly formatted', () => {
    const testArr = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const expected = { 'Living in the shadow of a great man': 1 };
    expect(makeRefObj(testArr)).to.eql(expected);
  });
  it('Does not mutate original array', () => {
    const testArr = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    makeRefObj(testArr);
    expect(testArr).to.eql([
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ]);
  });
  it('Returns an object with multiple correctly formatted keys', () => {
    const testArr = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      },
      {
        article_id: 2,
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: 1289996514171
      },
      {
        article_id: 3,
        title: 'A',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Delicious tin of cat food',
        created_at: 911564514171
      }
    ];
    const expected = {
      'Living in the shadow of a great man': 1,
      'Eight pug gifs that remind me of mitch': 2,
      A: 3
    };
    expect(makeRefObj(testArr)).to.eql(expected);
  });
});

describe('#formatComments', () => {
  it('Returns a new empty array when passed an empty array', () => {
    const testArr = [];
    expect(formatComments(testArr)).to.not.equal(testArr);
    expect(formatComments(testArr)).to.eql([]);
  });
  it('Returns an array with an object which has an author property', () => {
    const testComments = [
      {
        body: 'I hate streaming eyes even more',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 0,
        created_at: 1353674163389
      }
    ];
    const refObj = { 'Living in the shadow of a great man': 1 };
    console.log(formatComments(testComments, refObj)[0]);
    expect(formatComments(testComments, refObj)[0].author).to.equal(
      'icellusedkars'
    );
  });
  it('Returns an array with an object which has an article_id key with corresponding article ID', () => {
    const testComments = [
      {
        body: 'I hate streaming eyes even more',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 0,
        created_at: 1353674163389
      }
    ];
    const refObj = { 'Living in the shadow of a great man': 1 };
    expect(formatComments(testComments, refObj)[0].article_id).to.equal(1);
  });
  it('Returns an array with an object which has a created_at object converted to JavaScript time', () => {
    const testComments = [
      {
        body: 'I hate streaming eyes even more',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 0,
        created_at: 1353674163389
      }
    ];
    const refObj = { 'Living in the shadow of a great man': 1 };
    expect(formatComments(testComments, refObj)[0].created_at).to.be.instanceOf(
      Date
    );
  });
  it('Returns an array of mutliple correctly formatted comment objects', () => {
    const testComments = [
      {
        body: 'I hate streaming eyes even more',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 0,
        created_at: 1353674163389
      },
      {
        body: 'Lobster pot',
        belongs_to: 'Eight pug gifs that remind me of mitch',
        created_by: 'icellusedkars',
        votes: 0,
        created_at: 1322138163389
      },
      {
        body: 'This is a bad article name',
        belongs_to: 'A',
        created_by: 'butter_bridge',
        votes: 1,
        created_at: 1038314163389
      }
    ];
    const refObj = {
      'Living in the shadow of a great man': 1,
      'Eight pug gifs that remind me of mitch': 2,
      A: 3
    };
    const actual = formatComments(testComments, refObj);
    expect(actual[0].created_at).to.be.instanceOf(Date);
    expect(actual[1].created_at).to.be.instanceOf(Date);
    expect(actual[2].created_at).to.be.instanceOf(Date);
    expect(actual[2].article_id).to.equal(3);
    expect(actual[1].article_id).to.equal(2);
    expect(actual[0].article_id).to.equal(1);
    expect(actual[0].author).to.equal('icellusedkars');
    expect(actual[1].author).to.equal('icellusedkars');
    expect(actual[2].author).to.equal('butter_bridge');
  });
});
