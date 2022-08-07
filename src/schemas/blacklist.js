const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  staff: { type: String, default: "" },
  date: { type: Number, default: Date.now() }
});

module.exports = model("blacklist", schema);