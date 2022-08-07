const conf = require("../configs/config.json");
const emojis = require("../configs/emojis.json");

module.exports = {
  conf: {
    aliases: [],
    name: "say",
    help: "say",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission(128)) return;
    embed.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }));
    embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
    embed.setDescription(`${emojis.oxyuser} Sunucumuzda \`${message.guild.memberCount}\` adet üye bulunuyor.
    ${emojis.security} Sunucumuzda \`${message.guild.members.cache.filter((x) => x.user.presence.status !== "offline").size}\` adet **online** üye bulunuyor.
    ${emojis.oxytaggeds} Sunucumuzda \`${message.guild.members.cache.filter((x) => x.user.username.includes(conf.tag.tag[0])).size + message.guild.members.cache.filter((x) => x.user.username.includes(conf.tag.tag[1])).size + message.guild.members.cache.filter((x) => x.user.username.includes(conf.tag.tag[2])).size + message.guild.members.cache.filter((x) => x.user.username.includes(conf.tag.tag[3])).size + message.guild.members.cache.filter((x) => x.user.username.includes(conf.tag.tag[4])).size + message.guild.members.cache.filter((x) => x.user.username.includes(conf.tag.tag[5])).size + message.guild.members.cache.filter((x) => x.user.username.includes(conf.tag.tag[6])).size + message.guild.members.cache.filter((x) => x.user.discriminator.includes(conf.tag.etiket[0])).size}\` **taglı** üye bulunuyor. 
    ${emojis.oxybooster} Sunucumuzda \`${message.guild.members.cache.filter((x) => x.premiumSince).size}\` adet **boost  basan** üye bulunuyor.
    ${emojis.oxyvoice} Sunucumuzda \`${message.guild.members.cache.filter((x) => x.voice.channel).size}\` adet **sesli** üye bulunuyor.
    `);

    message.channel.send(embed);
  },
};
