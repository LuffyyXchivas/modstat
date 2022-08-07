const moment = require("moment");
require("moment-duration-format");
const conf = require("../configs/config.json");
const messageUserChannel = require("../schemas/messageUserChannel");
const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const disbut = require('discord-buttons');

module.exports = {
	conf: {
		aliases: [],
		name: "oxystat",
		help: "oxystat",
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
		let voiceButton = new disbut.MessageButton().setStyle('green').setLabel('Ses Verileri').setID('voiceButton')
		let inviteButton = new disbut.MessageButton().setStyle('green').setLabel('Davet Verileri').setID('inviteButton')

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
		const total = inviterData ? inviterData.total : 0;
		const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
		const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
		const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;

		const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
		const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
		const voiceLength = Active2 ? Active2.length : 0;
		let voiceTop;
		let messageTop;
		Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor.";
		Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `<#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join("\n") : voiceTop = "Veri bulunmuyor.";

		const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
		const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });

		const messageDaily = messageData ? messageData.dailyStat : 0;
		const messageWeekly = messageData ? messageData.weeklyStat : 0;

		const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika] s [saniye]");
		const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika] s [saniye]");

		embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }));
		embed.setDescription(`
    ${message.author.toString()} (${message.member.roles.highest}) adlı kullanıcının sunucu verileri

    **───────────────**
    **➥ Sesli Kanal Bilgileri: (\`Toplam ${voiceLength} kanal\`)**
    ${voiceTop}
    **───────────────**
    **➥ Mesaj Bilgileri: (\`Toplam ${messageData ? messageData.topStat : 0} mesaj\`)**
    ${messageTop} 
    `);
		embed.addField("Ses Verileri:", `
     \`•\` Haftalık : \`${voiceWeekly}\`
     \`•\` Günlük : \`${voiceDaily}\`
    `, true);
		embed.addField("Mesaj Verileri:", `
    \`•\` Haftalık : \`${Number(messageWeekly).toLocaleString()} mesaj\`
    \`•\` Günlük : \`${Number(messageDaily).toLocaleString()} mesaj\`
    `, true);
	embed.addField("İnvite Verileri:", `
	\`•\` Toplam : \`${total} davet\`
    \`•\` Haftalık : \`${weekly} davet\`
    \`•\` Günlük : \`${daily} davet\`
    `, true);
	    embed.setFooter(`Butona tıkaldğınızda tıklayan kişinin verileri gözükür.`)
		message.channel.send(embed,
			{ buttons: [voiceButton, inviteButton] });
	}
};