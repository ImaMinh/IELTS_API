const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

exports.getEssays = {
  query: Joi.object()
    .keys({
      topic: Joi.string(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    })
    .options({ stripUnknown: true }),
};

exports.getEssay = {
  params: Joi.object().keys({
    essayId: Joi.string().custom(objectId),
  }),
};

exports.searchEssay = {
  query: Joi.object()
    .keys({
      search: Joi.string(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    })
    .options({ stripUnknown: true }),
};
