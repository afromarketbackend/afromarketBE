exports.sanitizeObj = (obj) => {
  const sanitizedObj = {};

  const keys = Object.keys(obj);

  keys.forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      sanitizedObj[key] = obj[key];
    }
  });

  return sanitizedObj;
};
