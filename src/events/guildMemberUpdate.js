const roles = require("../schemas/roles");
const moment = require("moment");
moment.locale("tr");
const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
/**
 * @param { Client } client
 * @param { GuildMember } oldMember
 * @param { GuildMember } newMember
 */

module.exports = async (oldMember, newMember) => {
  const embed = new MessageEmbed().setAuthor(oldMember.user.username, oldMember.user.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${oldMember.user.id} • ${moment().calendar()}`).setThumbnail(oldMember.user.displayAvatarURL({dynamic: true}));
  const audit = await newMember.guild.fetchAuditLogs({ type: "GUILD_MEMBER_UPDATE" });
  const entry = audit.entries.first();
  const channel = newMember.guild.channels.cache.get(conf.penals.role.log);
  if (entry.executor.bot) return;
  let removedRoles = [];
  let givedRoles = [];

  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    oldMember.roles.cache.forEach(function (role) {
      if (!newMember.roles.cache.has(role.id)) removedRoles.push(role);
       roles.findOneAndUpdate({ guildID: newMember.guild.id, userID: newMember.user.id }, { $push: { roles: { staff: entry.executor.id, date: Date.now(), role: role.id, type: false } } }, { upsert: true });
    });  
    removedRoles.forEach((role) => { 
    if(channel) {channel.loggerSend(
      embed.setDescription(`<@!${newMember.user.id}> üyesinden <@&${role.id}> adlı rol alındı.\n\n\`\`\`diff\n- Rol: ${role.name} (${role.id})\n- Alınan Kullanıcı: ${newMember.user.tag} (${newMember.user.id})\n- Alan Kullanıcı: ${entry.executor.tag} (${entry.executor.id})\n+ Rol Alma: ${moment(Date.now()).locale("tr").format("LLL")}\`\`\``))
    } 
  })
  } else if (newMember.roles.cache.size > oldMember.roles.cache.size) {
    newMember.roles.cache.forEach(function (role) {
      if (!oldMember.roles.cache.has(role.id)) givedRoles.push(role);
       roles.findOneAndUpdate({ guildID: newMember.guild.id, userID: newMember.user.id }, { $push: { roles: { staff: entry.executor.id, date: Date.now(), role: role.id, type: true } } }, { upsert: true });
  });
  givedRoles.forEach((role) => {
      if (channel) {channel.loggerSend(
        embed.setDescription(`<@!${newMember.user.id}> üyesine <@&${role.id}> adlı rol verildi.\n\n\`\`\`diff\n- Rol: ${role.name} (${role.id})\n- Eklenen Kullanıcı: ${newMember.user.tag} (${newMember.user.id})\n- Ekleyen Kullanıcı: ${entry.executor.tag} (${entry.executor.id})\n+ Rol Ekleme: ${moment(Date.now()).locale("tr").format("LLL")}\`\`\``))}
  })

  }
};



module.exports.conf = {
  name: "guildMemberUpdate",
};
