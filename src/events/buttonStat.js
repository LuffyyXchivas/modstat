const conf = require("../configs/config.json");
const moment = require('moment');
moment.locale("tr");
require("moment-duration-format");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");
const messageGuildChannel = require("../schemas/messageGuildChannel");
const voiceGuildChannel = require("../schemas/voiceGuildChannel");
const voiceGuild = require("../schemas/voiceGuild");
const messageGuild = require("../schemas/messageGuild");
const coin = require("../schemas/coin");
const taggeds = require("../schemas/taggeds");
/**
 * @param { Client } client
 */

module.exports = async (button, embed) => {

    if(button.id == 'inviteButton') {
    const inviterData = await inviterSchema.findOne({ guildID: conf.guildID, userID: button.clicker.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviteMemberSchema.find({ guildID: conf.guildID, inviter: button.clicker.id });
    const daily = invMember ? button.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? button.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    const tagged = invMember ? button.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag.tag)).size : 0;
    
        await button.reply.think(true);
        await button.reply.edit(`Toplam **${total}** davet. \`(${regular} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\`
      
        \`Günlük: ${daily}, Haftalık: ${weekly}, Taglı: ${tagged}\``)
    }

    if(button.id == 'voiceButton') {
        const category = async (parentsArray) => {
			const data = await voiceUserParent.find({ guildID: button.guild.id, userID: button.clicker.id });
			const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
			let voiceStat = 0;
			for (var i = 0; i <= voiceUserParentData.length; i++) {
				voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
			}
			return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
		};
        const coinData = await coin.findOne({ guildID: button.guild.id, userID: button.clicker.id });

		const filteredParents = button.guild.channels.cache.filter((x) =>
			x.type === "category" &&
			!conf.publicParents.includes(x.id) &&
			!conf.registerParents.includes(x.id) &&
			!conf.solvingParents.includes(x.id) &&
			!conf.privateParents.includes(x.id) &&
			!conf.aloneParents.includes(x.id) &&
			!conf.funParents.includes(x.id)
		);
        const voiceData = await voiceUser.findOne({ guildID: button.guild.id, userID: button.clicker.id });
        const maxValue = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? Math.floor(coinData.coin) : 0)))] || client.ranks[client.ranks.length-1];
		const taggedData = await taggeds.findOne({ guildID: button.guild.id, userID: button.clicker.id });
		let currentRank = client.ranks.filter(x => (coinData ? Math.floor(coinData.coin) : 0) >= x.coin);
		currentRank = currentRank[currentRank.length-1];

    await button.reply.think(true);
    await button.reply.edit(`
    <@!${button.clicker.id}> kişisinin sunucu verileri

    **───────────────**
    **➥ Ses Bilgileri:**
  • Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`
  • Public Odalar: \`${await category(conf.publicParents)}\`
  • Kayıt Odaları: \`${await category(conf.registerParents)}\`
  • Sorun Çözme & Terapi: \`${await category(conf.solvingParents)}\`
  • Private Odalar: \`${await category(conf.privateParents)}\`
  • Game Odalar: \`${await category(conf.aloneParents)}\`
  • Oyun & Eğlence Odaları: \`${await category(conf.funParents)}\`
  • Diğer: \`${await category(filteredParents.map(x => x.id))}\`
  
  `)

        }

if(button.id === 'topVoice'){
    const messageChannelData = await messageGuildChannel.find({ guildID: conf.guildID }).sort({ channelData: -1 });
    const voiceChannelData = await voiceGuildChannel.find({ guildID: conf.guildID }).sort({ channelData: -1 });
    const messageUsersData = await messageUser.find({ guildID: conf.guildID }).sort({ topStat: -1 });
    const voiceUsersData = await voiceUser.find({ guildID: conf.guildID }).sort({ topStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: conf.guildID });
    const voiceGuildData = await voiceGuild.findOne({ guildID: conf.guildID });


    const messageChannels = messageChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n");
    const voiceChannels = voiceChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join("\n");
    const messageUsers = messageUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join("\n");
    const voiceUsers = voiceUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika] s [saniye]")}\``).join("\n");
    await button.reply.think(true);
    await button.reply.edit(`> **${button.guild.name}** sunucusunun toplam verileri\n**───────────────**\n\n> **➥ Ses Bilgileri: (\`Toplam ${moment.duration(voiceGuildData ? voiceGuildData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`)**\n${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}\n\n> **➥ Ses Kanal Bilgileri:**\n${voiceChannels.length > 0 ? voiceChannels : "Veri Bulunmuyor."}\n\n**───────────────**\n\n> **➥ Mesaj Bilgileri: (\`Toplam ${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`)**\n${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}\n\n> **➥ Mesaj Kanal Bilgileri:**\n${messageChannels.length > 0 ? messageChannels : "Veri Bulunmuyor."}`)
};

if(button.id === 'topİnvite'){
    const data = await inviterSchema.find({ guildID: button.guild.id }).sort({ total: -1 });
    const arr = [];
    data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
    const index = arr.findIndex((x) => x.id === button.clicker.id) + 1;
    const list = data.filter((x) => button.guild.members.cache.has(x.userID)).splice(0, 10).map((x, index) => `${x.userID === button.clicker.id ? `**${index + 1}. <@${x.userID}> - Toplam ${x.total} davet (${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)**` : `**${index + 1}.** <@${x.userID}> - Toplam **${x.total}** davet \`(${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)\``}`).join("\n");
    const veri = await inviterSchema.findOne({ guildID: button.guild.id, userID: button.clicker.id });
    await button.reply.think(true);
    await button.reply.edit(`${data.length ? index < 10 ? list : `${list} \n... \n**${index}. ${button.clicker} Toplam ${veri.total} davet (${veri.regular} gerçek, ${veri.bonus} bonus, ${veri.fake} fake, ${veri.leave} ayrılmış)**`: `Herhangi bir invite verisi bulunamadı!`}`);

};
  
};

module.exports.conf = {
  name: "clickButton"
};  