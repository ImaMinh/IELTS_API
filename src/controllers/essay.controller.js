const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { essayService } = require('../services');

exports.getEssays = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await essayService.queryEssays(filter, options);
  res.send(result);
});

exports.getEssay = catchAsync(async (req, res) => {
  const { essayId } = req.params;
  const result = await essayService.findById(essayId);
  res.send(result);
});

exports.searchEssay = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['search']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const search = filter.search || '';
  const result = await essayService.searchEssays(search, options);
  res.send(result);
});
