const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const underworldLimit = new Map();
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["underworld"],
    name: "ban",
    help: "ban [kullanıcı] [sebep]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission(8) && !conf.penals.underworld.staffs.some(x => message.member.roles.cache.has(x))) return message.channel.error(embed.setDescription("Yeterli yetkin bulunmuyor!"));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.error(message, "Bir üye belirtmelisin!");
    if (conf.penals.underworld.roles.some(x => member.roles.cache.has(x))) return message.channel.error(message, "Bu üye zaten banlı!");
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    if (!message.member.hasPermission(8) && member.roles.highest.position >= message.member.roles.highest.position) return message.channel.error(embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini banlıyamazsın!"));
    if (!member.manageable) return message.channel.error(message, "Bu üyeyi banlıyamıyorum!");
    if (conf.penals.underworld.limit > 0 && underworldLimit.has(message.author.id) && underworldLimit.get(message.author.id) == conf.penals.underworld.limit) return message.channel.error(message, "Saatlik ban sınırına ulaştın!");

    member.setRoles(conf.penals.underworld.roles);
    const penal = await client.penalize(message.guild.id, member.user.id, "JAİL", true, message.author.id, reason);
    message.channel.send(embed.setDescription(`${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle underworld e yollandı! \`(Ceza ID: #${penal.id})\``));
    if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle underworld e yollandınız!`).catch(() => {});

    const log = new MessageEmbed()
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setColor("RED")
      .setDescription(`
${member.toString()} üyesi Underworld e atıldı!

Ceza ID: \`#${penal.id}\`
Underworld atılan Üye: ${member.toString()} \`(${member.user.username.replace(/\`/g, "")} - ${member.user.id})\`
Underworld atan Yetkili: ${message.author} \`(${message.author.username.replace(/\`/g, "")} - ${message.author.id})\`
Underworld Tarihi: \`${moment(Date.now()).format("LLL")}\`
Underworld Sebebi: \`${reason}\`
      `)
    message.guild.channels.cache.get(conf.penals.underworld.log).send(log);

    if (conf.penals.underworld.limit > 0) {
      if (!underworldLimit.has(message.author.id)) underworldLimit.set(message.author.id, 1);
      else underworldLimit.set(message.author.id, underworldLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (underworldLimit.has(message.author.id)) underworldLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  },
};