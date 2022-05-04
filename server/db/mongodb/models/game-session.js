const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');
const paginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;
var GameSessionSchema = new Schema({
  player: String,
  platform: String,
  game: String,
  inCharge: { type: Schema.Types.ObjectId },
  startTime: String,
  duration: Number,
  cost: Number,
  paid: Boolean
}, { timestamps: true });


GameSessionSchema.plugin(uniqueValidator);
GameSessionSchema.plugin(paginate);
var GameSession = mongoose.model('GameSession', GameSessionSchema);

module.exports = GameSession;
