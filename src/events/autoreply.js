const conf = require("../configs/config.json");
const emojis = require("../configs/emojis.json");
const client = global.client;

/**
 * @param { Client } client
 * @param { Message } message
 */

module.exports = async (message) => {
  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === "!tag" || message.content.toLowerCase() === ".tag") {
    await message.channel.send(`\`${conf.tag.tag},#${conf.tag.etiket}\``);
  }
};

module.exports.conf = {
  name: "message"
};
