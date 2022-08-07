const settings = require("../configs/settings.json");
const { MessageEmbed } = require("discord.js");
const { specialRoles } = require("../configs/config.json");
const emojis = require("../configs/emojis.json");

/**
 * @param { Client } client
 * @param { Message } message
 */

module.exports = async (message) => {
  const prefix = settings.prefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (specialRoles.size === 0 || message.author.bot || !message.guild || !prefix || !message.member.hasPermission("MANAGE_ROLES")) return;
  const args = message.content.substring(prefix.length).trim().split(" ");

  const embed = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }));
  if (Object.keys(specialRoles).some((x) => args[0].toLowerCase() === x)) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!member) return message.channel.send(embed.setDescription(`${emojis.red} Bir üye belirtmelisin!`));
    const roleName = Object.keys(specialRoles).filter((x) => args[0].toLowerCase() === x)[0];
    const roleID = specialRoles[roleName];
    if (!member.roles.cache.has(roleID[0])) {
      member.roles.add(roleID).catch(() => {});
      message.channel.send(embed.setDescription(`${emojis.green} ${member.toString()} adlı kullanıcıdan <@&${roleID[0]}> Rolü başarılı bir şekilde verildi!`));
    } else {
      member.roles.remove(roleID).catch(() => {});
      message.channel.send(embed.setDescription(`${emojis.green} ${member.toString()} adlı kullanıcıdan <@&${roleID[0]}> Rolü başarılı bir şekilde alındı!`));
    }
  }
};

module.exports.conf = {
  name: "message",
};

