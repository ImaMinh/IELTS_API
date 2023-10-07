const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../config/logger');
const { Essay } = require('../models');

const json1 = require('./Thanh.json');
const json2 = require('./Minh.json');

// json1 = [];
const json = [...json1, ...json2];

const main = async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);

  logger.info('Connected to MongoDB');

  const operations = json.map(({ question, ...others }) => ({
    updateOne: {
      filter: { question },
      update: {
        $set: {
          ...others,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      upsert: true,
    },
  }));

  logger.info('Bunk');
  await Essay.bulkWrite(operations);
  logger.info('Done');
  process.exit(0);
};

main();
