exports.formatDates = list => {
  return list.map(obj => {
    obj.created_at = new Date(obj.created_at);
    return obj;
  });
};

exports.makeRefObj = list => {
  if (!list.length) return {};
  const refObj = {};
  const formattedObj = list.map(obj => {
    refObj[obj.title] = obj.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map(obj => {
    obj.author = obj.created_by;
    obj.article_id = articleRef[obj.belongs_to];
    obj.created_at = new Date(obj.created_at);
    delete obj.belongs_to;
    delete obj.created_by;
    return obj;
  });
  return formattedComments;
};
