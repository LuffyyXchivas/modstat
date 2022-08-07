const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  reason: { type: String, default: "" }
});

module.exports = model("meeting", schema);