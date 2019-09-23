exports.formatDates = list => {
  const date = new Date(list[0].created_at);
  list[0].created_at = date;
  console.log(list);
  return list;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
