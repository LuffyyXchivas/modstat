const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const penals = require("../schemas/penals");

module.exports = {
  conf: {
    aliases: [],
    name: "unreklam",
    help: "unreklam [kullanıcı]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission(8) && !conf.penals.reklam.staffs.some(x => message.member.roles.cache.has(x))) return message.channel.error(message, "Yeterli yetkin bulunmuyor!");
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.error(message, "Bir üye belirtmelisin!");
    if (!conf.penals.reklam.role.some(x => member.roles.cache.has(x))) return message.channel.error(message, "Bu üye reklamcıda değil!");
    if (!message.member.hasPermission(8) && member.roles.highest.position >= message.member.roles.highest.position) return message.channel.error(message, "Kendinle aynı yetkide ya da daha yetkili olan birinin reklamcısını kaldıramazsın!");
    if (!member.manageable) return message.channel.error(message, "Bu üyeyi reklamcıdan çıkartamıyorum!");

    member.setRoles(conf.registration.unregRoles);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "REKLAM", active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    message.channel.send(embed.setDescription(`${member.toString()} üyesinin reklamcı cezası ${message.author} tarafından kaldırıldı!`));
    if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, reklamcı cezanız kaldırıldı!`).catch(() => {});

    const log = new MessageEmbed()
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setColor("GREEN")
      .setDescription(`
${member.toString()} üyesinin reklamcı cezası kaldırıldı!

Reklamcısı Kaldırılan Üye: ${member.toString()} \`(${member.user.username.replace(/\`/g, "")} - ${member.user.id})\`
Reklamcıyı Kaldıran Yetkili: ${message.author} \`(${message.author.username.replace(/\`/g, "")} - ${message.author.id})\`
Reklamcının Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
      `)
    message.guild.channels.cache.get(conf.penals.reklam.log).send(log);
  },
};
