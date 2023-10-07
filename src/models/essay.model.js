const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const outlineSchema = mongoose.Schema(
  {
    type: { type: String, enum: ['strong', 'em', 'heading'] },
    outline: { type: String },
    level: { type: Number, default: 0 },
    isTitle: { type: Number, default: 0 },
  },
  {
    timestamp: false,
    _id: false,
  }
);

const essaySchema = mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    htmlAnswer: { type: String, required: true, trim: true },
    originalQuetion: { type: String, required: true, trim: true },
    textAnswer: { type: String, required: true, trim: true },
    textOutline: { type: String, required: true, trim: true },
    outline: { type: [outlineSchema] },
    title: { type: String },
    conclusion: { type: String },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
essaySchema.plugin(toJSON);
essaySchema.plugin(paginate);

/**
 * @typedef Essay
 */
const Essay = mongoose.model('Essay', essaySchema);

module.exports = Essay;
