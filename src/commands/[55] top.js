const moment = require("moment");
require("moment-duration-format");
const messageGuildChannel = require("../schemas/messageGuildChannel");
const voiceGuildChannel = require("../schemas/voiceGuildChannel");
const db = require("../schemas/inviter");
const disbut = require('discord-buttons');

module.exports = {
  conf: {
    aliases: [],
    name: "top",
    help: "top",
    enabled: true
  },

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {Array<string>} args
   * @param {MessageEmbed} embed
   * @returns {Promise<void>}
   */
  run: async (client, message, args, embed) => {

    let topVoice = new disbut.MessageButton().setStyle('green').setLabel('Ses Verileri').setID('topVoice')
		let topİnvite = new disbut.MessageButton().setStyle('green').setLabel('Davet Verileri').setID('topİnvite')

    const messageChannelData = await messageGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const voiceChannelData = await voiceGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });

    const messageChannels = messageChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n");
    const voiceChannels = voiceChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join("\n");
 
    const data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
    const arr = [];
    data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
    const index = arr.findIndex((x) => x.id === message.author.id) + 1;
    const list = data.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 5).map((x, index) => `${x.userID === message.author.id ? `**${index + 1}. <@${x.userID}> - Toplam ${x.total} davet (${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)**` : `**${index + 1}.** <@${x.userID}> - Toplam **${x.total}** davet \`(${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)\``}`).join("\n");
    const veri = await db.findOne({ guildID: message.guild.id, userID: message.author.id });

    embed.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }));
    embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
    message.channel.send(embed.setDescription(`
    ${message.guild.name} sunucusunun toplam verileri
    **───────────────**

    **➥ Ses Kanal Bilgileri:**
    ${voiceChannels.length > 0 ? voiceChannels : "Veri Bulunmuyor."}
    
    **───────────────**
    
    **➥ Mesaj Kanal Bilgileri:**
    ${messageChannels.length > 0 ? messageChannels : "Veri Bulunmuyor."}

    **───────────────**
    
    **➥ İnvite Bilgileri:**
    ${data.length ? index < 5 ? list : `${list} \n... \n**${index}. ${message.author} Toplam ${veri.total} davet (${veri.regular} gerçek, ${veri.bonus} bonus, ${veri.fake} fake, ${veri.leave} ayrılmış)**` : `Herhangi bir invite verisi bulunamadı!`} 

    `),
    { buttons: [topVoice, topİnvite] });
  }
};