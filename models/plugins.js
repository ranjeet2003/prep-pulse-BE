const toJSON = (schema) => {
  schema.set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  });
};

const paginate = (schema) => {
  schema.query.paginate = function (limit, page) {
    return this.limit(limit).skip(limit * (page - 1));
  };
};

module.exports = { toJSON, paginate };
