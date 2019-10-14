exports.formatDates = list => {
  return list.map(obj => {
    obj.created_at = new Date(obj.created_at);
    return obj;
  });
};

exports.makeRefObj = list => {
  if (!list.length) return {};
  const refObj = {};
  list.forEach(obj => {
    refObj[obj.title] = obj.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map(obj => {
    const cloneObj = Object.assign({}, obj);
    cloneObj.author = obj.created_by;
    cloneObj.article_id = articleRef[obj.belongs_to];
    cloneObj.created_at = new Date(obj.created_at);
    delete cloneObj.belongs_to;
    delete cloneObj.created_by;
    return cloneObj;
  });
  return formattedComments;
};
