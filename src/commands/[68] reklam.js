const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const reklamLimit = new Map();
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["reklam"],
    name: "reklam",
    help: "reklam [kullanıcı]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission(8) && !conf.penals.reklam.staffs.some(x => message.member.roles.cache.has(x))) return message.channel.error(embed.setDescription("Yeterli yetkin bulunmuyor!"));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.error(message, "Bir üye belirtmelisin!");
    if (conf.penals.reklam.role.some(x => member.roles.cache.has(x))) return message.channel.error(message, "Bu üye zaten cezalı!");
    if (!message.member.hasPermission(8) && member.roles.highest.position >= message.member.roles.highest.position) return message.channel.error(embed.setDescription("Kendinle aynı yetkide veya senden yüksek yetkide olan birini reklamcıya atamazsın!"));
    if (!member.manageable) return message.channel.error(message, "Bu üyeyi cezalandıramıyorum!");
    if (conf.penals.reklam.limit > 0 && reklamLimit.has(message.author.id) && reklamLimit.get(message.author.id) == conf.penals.reklam.limit) return message.channel.error(message, "Saatlik reklam sınırına ulaştın!");

    member.setRoles(conf.penals.reklam.role);
    const penal = await client.penalize(message.guild.id, member.user.id, "REKLAM", true, message.author.id, reason);
    message.channel.send(embed.setDescription(`${member.toString()} üyesi, ${message.author} tarafından reklamcıya atıldı! \`(Ceza ID: #${penal.id})\``));
    if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından reklamcıya atıldınız!`).catch(() => {});

    const log = new MessageEmbed()
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setColor("RED")
      .setDescription(`
${member.toString()} üyesi Cezalandırıldı!

Ceza ID: \`#${penal.id}\`
Reklamcıya Atılan Üye: ${member.toString()} \`(${member.user.username.replace(/\`/g, "")} - ${member.user.id})\`
Reklamcıya Atan Yetkili: ${message.author} \`(${message.author.username.replace(/\`/g, "")} - ${message.author.id})\`
Ceza Tarihi: \`${moment(Date.now()).format("LLL")}\`
      `)
    message.guild.channels.cache.get(conf.penals.reklam.log).send(log);

    if (conf.penals.reklam.limit > 0) {
      if (!reklamLimit.has(message.author.id)) reklamLimit.set(message.author.id, 1);
      else reklamLimit.set(message.author.id, reklamLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (reklamLimit.has(message.author.id)) reklamLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  },
};
