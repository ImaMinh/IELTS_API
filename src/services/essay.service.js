  const httpStatus = require('http-status');
const { Essay } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Query for essays
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
exports.queryEssays = async (filter, options) => {
  const essays = await Essay.paginate(filter, options);
  return essays;
};

exports.findById = async (id) => {
  return Essay.findById(id);
};

exports.searchEssays = async (keyword, options) => {
  const $match = {
    $or: [
      { question: {$regex : keyword, $options: 'i'} },
      { textOutline: {$regex : keyword, $options: 'i'} },
      { textAnswer: {$regex : keyword, $options: 'i'} }
    ]
  };

  const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
  const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
  const skip = (page - 1) * limit;

  const res = await Essay.aggregate([
    { $match },
    {
      $facet: {
        results: [
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ],
        pageInfo: [
          {
            $group: {
              _id: null,
              count: {
                $sum: 1,
              },
            },
          },
        ],
      },
    },
  ]);

  const { results, pageInfo } = res[0];

  const totalResults = pageInfo.length ? pageInfo[0].count : 0;
  const totalPages = Math.ceil(totalResults / limit);
  return {
    results,
    page,
    limit,
    totalPages,
    totalResults,
  };
};
