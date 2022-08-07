const data = require("../schemas/names");
const inviteMemberSchema = require("../schemas/inviteMember");
const inviterSchema = require("../schemas/inviter");
const conf = require("../configs/config.json");
const client = global.client;
const emojis = require("../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const {  MessageEmbed } = require("discord.js");
/**
 * @param { Client } client
 * @param { GuildMember } member
 */

module.exports = async (member) => {
  const embed = new MessageEmbed().setAuthor(member.user.username, member.user.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${member.user.id} • ${moment().calendar()}`).setThumbnail(member.user.displayAvatarURL({dynamic: true}));
  const channel = member.guild.channels.cache.get(conf.invite.channel);
  const log = member.guild.channels.cache.get(conf.invite.log);
  if (!log || !channel || member.user.bot) return;

  await data.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $push: { names: { name: member.displayName, rol: "Sunucudan Ayrılma", date: Date.now() } } }, { upsert: true });

  const inviteMemberData = await inviteMemberSchema.findOne({ guildID: member.guild.id, userID: member.user.id });
  if (!inviteMemberData) {
    channel.send(`${emojis.inviteStar} \`${member.user.tag}\` sunucumuzdan ayrıldı fakat kimin davet ettiğini bulamadım.`);
    log.loggerSend(embed.setDescription(`${emojis.inviteStar} <@!${member.user.id}> (\`${member.user.id}\`) adlı kullanıcı sunucumuzdan ayrıldı.\n\n\`\`\`diff\n- Kullanıcı: ${member.user.tag} (${member.user.id})\n- Davet Eden: BULUNAMADI!\n+ Ayrılma: ${moment(Date.now()).locale("tr").format("LLL")}\`\`\``))
 } 
  
  else {
    const inviter = await client.users.fetch(inviteMemberData.inviter);
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { leave: 1, total: -1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: inviter.id, });
    const total = inviterData ? inviterData.total : 0;
    channel.send(`${emojis.inviteStar} \`${member.user.tag}\` sunucumuzdan ayrıldı ve ${inviter.tag} tarafından davet edilmiş. (**${total}** davet) ${emojis.carp}`);
    log.loggerSend(embed.setDescription(`${emojis.inviteStar} <@!${member.user.id}> (\`${member.user.id}\`) adlı kullanıcı sunucumuzdan ayrıldı.\n\n\`\`\`diff\n- Kullanıcı: ${member.user.tag} (${member.user.id})\n- Davet Eden: ${inviter.tag} (${inviter.id})\n+ Ayrılma: ${moment(Date.now()).locale("tr").format("LLL")}\`\`\``))
  }
};

module.exports.conf = {
  name: "guildMemberRemove",
};
