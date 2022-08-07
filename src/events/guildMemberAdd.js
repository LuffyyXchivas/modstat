const conf = require("../configs/config.json");
const emojis = require("../configs/emojis.json");
const client = global.client;
const moment = require("moment");
moment.locale("tr");
const bannedTag = require("../schemas/bannedTags");

/**
 * @param { Client } client
 * @param { GuildMember } member
 */

module.exports = async (member) => {

  if (member.user.bot) return;
  const channel = member.guild.channels.cache.get(conf.registration.channel);
  const suspectChannel = member.guild.channels.cache.get(conf.registration.suspectChannel);
  const data = await bannedTag.findOne({ guildID: member.guild.id });
  if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
    await member.setRoles(conf.registration.suspectRoles);
    suspectChannel.wsend(`
    ${emojis.welcomeOne} ${member.toString()}, Sunucumuza hoşgeldiniz
Fakat hesap açılma tarihin 1 haftadan erken olduğu için Cezalıya düştün.
Eğer sunucumuza kayıt olmak istiyorsan Üst yetkili biri ile iletişime geçebilirsin
Hesabın açılma tarihi: \`${moment(member.user.createdAt).format("LLL")}\`
	  `);
    channel.wsend(`${member.toString()} Adlı üye sunucumuza giriş yaptı fakar hesabı yeni hesap olduğu için Cezalıya ayıldı!`);
  } else if (data && data.tags.length && data.tags.some((x) => member.user.username.includes(x.tag))) {
    member.setRoles(conf.registration.bannedTagRoles ? conf.registration.bannedTagRoles : conf.penals.jail.roles);
    member.guild.channels.cache.get(conf.registration.bannedTagChannel ? conf.registration.bannedTagChannel : conf.registration.suspectChannel).wsend(`
    ${emojis.welcomeOne} ${member.toString()}, Sunucumuza hoşgeldiniz
    ${emojis.red} Fakat etiketinde veya kullanıcı adında sunucumuzun yasaklı taglarından biri bulunduğu için Cezalıya atıldın!
    `);
    channel.wsend(`${member.toString()} Adlı üye sunucumuza giriş yaptı fakat kullanıcı adında yasaklı taglarımızından biri olduğu için cezalıya atıldı`);
  } else {
    await member.roles.add(conf.registration.unregRoles);
    channel.wsend(`
${emojis.welcomeTada} Sunucumuza hoşgeldin, ${member.toString()}! Hesabın ${moment(member.user.createdAt).format("LLL")} tarihinde  \`(${moment(member.user.createdTimestamp).fromNow()})\` oluşturulmuş.

  ${emojis.inviteStar} Sunucumuza kayıt olabilmek için sol tarafta bulunan <#${conf.registration.voiceChannel}> odalarına giriş yapıp \`İsim Yaş\` vermeniz yeterli olacaktır. 

Sunucumuz seninle beraber **${member.guild.memberCount}** kişiye ulaştı. <@&${conf.registration.staffs[0]}> isimli role sahip yetkililerimiz seninle ilgilenecektir. :tada:
`);
  }
  if (conf.tag.tag.some((x) => member.user.username.includes(x))) member.roles.add(conf.tag.role);
};

module.exports.conf = {
  name: "guildMemberAdd",
};
