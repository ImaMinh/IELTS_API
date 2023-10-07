const express = require('express');
const validate = require('../../middlewares/validate');
const essayValidation = require('../../validations/essay.validation');
const essayController = require('../../controllers/essay.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(essayValidation.getEssays), essayController.getEssays);

router
  .route('/search')
  .get(validate(essayValidation.searchEssay), essayController.searchEssay);

router
  .route('/:essayId')
  .get(validate(essayValidation.getEssay), essayController.getEssay);

module.exports = router;
