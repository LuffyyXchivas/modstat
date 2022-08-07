const client = global.client;
const { Collection , MessageEmbed } = require("discord.js");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const conf = require("../configs/config.json");
const emojis = require("../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");

/**
 * @param {GuildMember} member
 * @returns {Promise<void>}
 */

module.exports = async (member) => {
  const embed = new MessageEmbed().setAuthor(member.user.username, member.user.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${member.user.id} • ${moment().calendar()}`).setThumbnail(member.user.displayAvatarURL({dynamic: true}));
  const channel = member.guild.channels.cache.get(conf.invite.channel);
  const log = member.guild.channels.cache.get(conf.invite.log);
  if (!log ||!channel || member.user.bot) return;

  const gi = client.invites.get(conf.guildID).clone() || new Collection().clone();
  const invites = await member.guild.fetchInvites();
  const invite = invites.find((x) => gi.has(x.code) && gi.get(x.code).uses < x.uses) || gi.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
  client.invites.set(member.guild.id, invites);
  
  if (invite === member.guild.vanityURLCode) {
    const url = await member.guild.fetchVanityData();
    channel.send(`${emojis.inviteStar} ${member} sunucumuza \`Özel Url (${member.guild.vanityURLCode})\` kullanarak katıldı. (**${url.uses}** kullanım) ${emojis.tik}`);
    log.loggerSend(embed.setDescription(`${emojis.inviteStar} <@!${member.user.id}> (\`${member.user.id}\`) adlı kullanıcı sunucumuza katıldı.\n\n\`\`\`diff\n- Kullanıcı: ${member.user.tag} (${member.user.id})\n- Davet Eden: Özel Url (${member.guild.vanityURLCode} url , ${url.uses} kullanım)\n+ Katılma: ${moment(Date.now()).locale("tr").format("LLL")}\`\`\``))
  }

  if (!invite.inviter) return;
  await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: invite.inviter.id, date: Date.now() } }, { upsert: true });
  if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
    const total = inviterData ? inviterData.total : 0;
    channel.send(`${emojis.inviteStar} ${member} adlı kullanıcı ${invite.inviter.tag} tarafından davet edildi. (**${total}** davet) ${emojis.tik}`);
    log.loggerSend(embed.setDescription(`${emojis.inviteStar} <@!${member.user.id}> (\`${member.user.id}\`) adlı kullanıcı sunucumuza katıldı.\n\n\`\`\`diff\n- Kullanıcı: ${member.user.tag} (${member.user.id})\n- Davet Eden: ${invite.inviter.tag} (${invite.inviter.id} , ${total} davet)\n+ Katılma: ${moment(Date.now()).locale("tr").format("LLL")}\`\`\``))
  } else {
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
    const total = inviterData ? inviterData.total : 0;
    channel.send(`${emojis.inviteStar} ${member} adlı kullanıcı ${invite.inviter.tag} tarafından davet edildi. (**${total}** davet) ${emojis.tik}`);
    log.loggerSend(embed.setDescription(`${emojis.inviteStar} <@!${member.user.id}> (\`${member.user.id}\`) adlı kullanıcı sunucumuza katıldı.\n\n\`\`\`diff\n- Kullanıcı: ${member.user.tag} (${member.user.id})\n- Davet Eden: ${invite.inviter.tag} (${invite.inviter.id} , ${total} davet)\n+ Katılma: ${moment(Date.now()).locale("tr").format("LLL")}\`\`\``))
  }
};

module.exports.conf = {
  name: "guildMemberAdd",
};
