const moment = require("moment");
moment.locale("tr");
const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const snipe = require("../schemas/snipe");

module.exports = async (message) => {
  if (message.author.bot) return;

  await snipe.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $set: { messageContent: message.content, author: message.author.id, image: message.attachments.first() ? message.attachments.first().proxyURL : null, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
  const channel = message.guild.channels.cache.get(conf.logs.messageLog);
  if (!channel) return;
  const embed = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${message.member.user.id} • ${moment().calendar()}`).setThumbnail(message.member.user.displayAvatarURL({dynamic: true}))
    .setDescription(`
    <#${message.channel.id}> adlı kanalda bir mesaj **silindi**!

    \`Silinen Mesaj •❯\`
    ${message.content}
    \`\`\`diff
- Mesaj Kanalı : #${message.channel.name} - ${message.channel.id}
- Kullanıcı : ${message.member.displayName} - ${message.member.id}
+ Zaman : ${moment(message.createdTimestamp).locale("tr").format("LLL")}\`\`\``)  
  if (message.attachments.first()) embed.setImage(message.attachments.first().proxyURL);
  channel.send(embed);
};

module.exports.conf = {
  name: "messageDelete",
};
