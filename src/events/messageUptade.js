const moment = require("moment");
moment.locale("tr");
const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");

module.exports = async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;

  const channel = newMessage.guild.channels.cache.get(conf.logs.messageLog);
  if (!channel) return;
  const embed = new MessageEmbed().setAuthor(newMessage.member.displayName, newMessage.member.user.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newMessage.member.user.id} • ${moment().calendar()}`).setThumbnail(newMessage.member.user.displayAvatarURL({dynamic: true}))
    .setDescription(`<#${newMessage.channel.id}> adlı kanalda bir mesaj **düzenlendi**!

    \`Eski Mesaj •❯\`
    ${oldMessage.content} 

    \`Yeni Mesaj •❯\`
    ${newMessage.content}
    \`\`\`diff
- Mesaj Kanalı : #${newMessage.channel.name} - ${newMessage.channel.id}
- Kullanıcı : ${newMessage.member.displayName} - ${newMessage.member.id}
+ Zaman : ${moment(newMessage.createdTimestamp).locale("tr").format("LLL")}\`\`\``)
  if (newMessage.attachments.first()) embed.setImage(newMessage.attachments.first().proxyURL);
  channel.send(embed);
};

module.exports.conf = {
  name: "messageUpdate",
};
