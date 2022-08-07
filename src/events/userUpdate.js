const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const client = global.client;
const bannedTag = require("../schemas/bannedTags");
const moment = require("moment");
moment.locale("tr");
/**
 * @param { Client } client
 * @param { ClientUser } oldUser
 * @param { ClientUser } newUser
 */

module.exports = async (oldUser, newUser) => {
  if (oldUser.bot || newUser.bot) return;
  const guild = client.guilds.cache.get(conf.guildID);
  if (!guild) return;
  const member = guild.members.cache.get(oldUser.id);
  if (!member) return;
  const channel = guild.channels.cache.get(conf.tag.log);
  const log = guild.channels.cache.get(conf.registration.bannedTagChannel);

  if (oldUser.username.includes(conf.tag.tag[0]) && !newUser.username.includes(conf.tag.tag[0])) {
    if (member.manageable && member.displayName.includes(conf.tag.tag[0])) member.setNickname(member.displayName.replace(conf.tag.tag[0], conf.tag.tag2));
    if (conf.taglıAlım && !member.premiumSince) member.roles.set(conf.registration.unregRoles);
    else member.roles.remove(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
      .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
      .setTitle("• Bir kullanıcı tag saldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[0]}** tagını saldığı için <@&${conf.tag.role}> rolü alındı.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[0])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
       `);
    channel.send(embed);
  } else if (!oldUser.username.includes(conf.tag.tag[0]) && newUser.username.includes(conf.tag.tag[0])){
    if (member.manageable) member.setNickname(member.displayName.replace(conf.tag.tag2, conf.tag.tag[0]));
    member.roles.add(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
    .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
    .setTitle("• Bir kullanıcı tag aldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[0]}** tagını aldığı için <@&${conf.tag.role}> rolü verildi.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[0])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
  `);
    channel.send(embed);
  }
  if (oldUser.username.includes(conf.tag.tag[2]) && !newUser.username.includes(conf.tag.tag[2])) {
    if (conf.taglıAlım && !member.premiumSince) member.roles.set(conf.registration.unregRoles);
    else member.roles.remove(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
      .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
      .setTitle("• Bir kullanıcı tag saldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[2]}** tagını saldığı için <@&${conf.tag.role}> rolü alındı.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[2])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
       `);
    channel.send(embed);
  } else if (!oldUser.username.includes(conf.tag.tag[2]) && newUser.username.includes(conf.tag.tag[2])){
    member.roles.add(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
    .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
    .setTitle("• Bir kullanıcı tag aldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[2]}** tagını aldığı için <@&${conf.tag.role}> rolü verildi.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[2])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
  `);
    channel.send(embed);
  }
  if (oldUser.username.includes(conf.tag.tag[1]) && !newUser.username.includes(conf.tag.tag[1])) {
    if (conf.taglıAlım && !member.premiumSince) member.roles.set(conf.registration.unregRoles);
    else member.roles.remove(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
      .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
      .setTitle("• Bir kullanıcı tag saldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[1]}** tagını saldığı için <@&${conf.tag.role}> rolü alındı.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[1])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
       `);
    channel.send(embed);
  } else if (!oldUser.username.includes(conf.tag.tag[1]) && newUser.username.includes(conf.tag.tag[1])){
    member.roles.add(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
    .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
    .setTitle("• Bir kullanıcı tag aldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[1]}** tagını aldığı için <@&${conf.tag.role}> rolü verildi.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[0])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
  `);
    channel.send(embed);
  }

  if (oldUser.username.includes(conf.tag.tag[3]) && !newUser.username.includes(conf.tag.tag[3])) {
    if (conf.taglıAlım && !member.premiumSince) member.roles.set(conf.registration.unregRoles);
    else member.roles.remove(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
      .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
      .setTitle("• Bir kullanıcı tag saldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[3]}** tagını saldığı için <@&${conf.tag.role}> rolü alındı.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[3])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
       `);
    channel.send(embed);
  } else if (!oldUser.username.includes(conf.tag.tag[3]) && newUser.username.includes(conf.tag.tag[3])){
    member.roles.add(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
    .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
    .setTitle("• Bir kullanıcı tag aldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[3]}** tagını aldığı için <@&${conf.tag.role}> rolü verildi.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[3])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
  `);
    channel.send(embed);
  }

  if (oldUser.username.includes(conf.tag.tag[4]) && !newUser.username.includes(conf.tag.tag[4])) {
    if (conf.taglıAlım && !member.premiumSince) member.roles.set(conf.registration.unregRoles);
    else member.roles.remove(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
      .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
      .setTitle("• Bir kullanıcı tag saldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[4]}** tagını saldığı için <@&${conf.tag.role}> rolü alındı.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[4])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
       `);
    channel.send(embed);
  } else if (!oldUser.username.includes(conf.tag.tag[4]) && newUser.username.includes(conf.tag.tag[4])){
    member.roles.add(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
    .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
    .setTitle("• Bir kullanıcı tag aldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[4]}** tagını aldığı için <@&${conf.tag.role}> rolü verildi.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[4])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
  `);
    channel.send(embed);
  }
  
  if (oldUser.username.includes(conf.tag.tag[5]) && !newUser.username.includes(conf.tag.tag[5])) {
    if (conf.taglıAlım && !member.premiumSince) member.roles.set(conf.registration.unregRoles);
    else member.roles.remove(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
      .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
      .setTitle("• Bir kullanıcı tag saldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[5]}** tagını saldığı için <@&${conf.tag.role}> rolü alındı.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[5])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
       `);
    channel.send(embed);
  } else if (!oldUser.username.includes(conf.tag.tag[5]) && newUser.username.includes(conf.tag.tag[5])){
    member.roles.add(conf.tag.role);
    if (!channel) return;
    const embed = new MessageEmbed()
    .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
    .setTitle("• Bir kullanıcı tag aldı!")
      .setDescription(`
${member.toString()} kullanıcısı **${conf.tag.tag[5]}** tagını aldığı için <@&${conf.tag.role}> rolü verildi.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag.tag[5])).size}
─────────────────

Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
  `);
    channel.send(embed);
  }
  
  const data = await bannedTag.findOne({ guildID: guild.id });
  if (!data || !data.tags.length) return;
  if (data.tags.some((x) => !oldUser.username.includes(x.tag) && newUser.username.includes(x.tag))) {
    let bannedTag = data.tags.some((x) => !oldUser.username.includes(x.tag) && newUser.username.includes(x.tag))
    member.setRoles(conf.bannedTag.role);
    guild.channels.cache.get(conf.jail.channel).send(`${member.toString()}, Sunucumuzda yasaklı taglarından birini aldığın için yasaklıya atıldın!`);
    log.loggerSend(embed.setDescription(`<@!${member.user.id}> adlı kullanıcı ${bannedTag} tagını adına eklediği için cezalıya düştü.`))
  } else if (data.tags.some((x) => oldUser.username.includes(x.tag) && !newUser.username.includes(x.tag))) {
    member.setRoles(conf.registration.unregRoles);
  }

};

module.exports.conf = {
  name: "userUpdate",
};
