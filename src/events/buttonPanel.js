const conf = require("../configs/config.json");
const emojis = require("../configs/emojis.json");
const moment = require('moment');
moment.locale("tr");
require("moment-duration-format");
const isimler = require("../schemas/names");
const penals = require("../schemas/penals");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const messageUserChannel = require("../schemas/messageUserChannel");
const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");
const messageGuildChannel = require("../schemas/messageGuildChannel");
const voiceGuildChannel = require("../schemas/voiceGuildChannel");
const messageGuild = require("../schemas/messageGuild");
const voiceGuild = require("../schemas/voiceGuild");
const penalPoint = require("../schemas/penalPoint");
const { MessageEmbed } = require("discord.js");

/**
 * @param { Client } client
 */

module.exports = async (button) => {
    if (button.id === 'kurulumİnfo') {
        let oxy = button.guild.members.cache.get(button.clicker.id)
        if(!oxy.hasPermission(8)) return;
        let banStaff = conf.penals.ban.staffs || [];
        let jailStaff = conf.penals.jail.staffs || [];
        let cMuteStaff = conf.penals.chatMute.staffs || [];
        let vMuteStaff = conf.penals.voiceMute.staffs || [];
        let adsStaff = conf.penals.reklam.staffs || [];
        let karantina = conf.penals.jail.roles || [];
        let cMuted = conf.penals.chatMute.roles || [];
        let vMuted = conf.penals.voiceMute.roles || [];
        let adsRoles = conf.penals.reklam.roles || [];
        let banChannel = conf.penals.ban.log || [];
        let jailChannel = conf.penals.jail.log || [];
        let cMuteChannel = conf.penals.chatMute.log || [];
        let vMuteChannel = conf.penals.voiceMute.log || [];
        let adsChannel = conf.penals.reklam.log || [];
        let banLimit = conf.penals.ban.limit || 0;
        let jailLimit = conf.penals.jail.limit || 0;
        let cMuteLimit = conf.penals.chatMute.limit || 0;
        let vMutelimit = conf.penals.voiceMute.limit || 0;
        let adsLimit = conf.penals.reklam.limit || 0;
        await button.message.channel.send(new MessageEmbed().setDescription(`**Kurlum Paneli Bilgi Menüsü**`)
        .addField(`${emojis.inviteStar} Ban Yetkili Rolü \`•❯\``, banStaff.length > 0 ? banStaff.map(oxy => (button.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${button.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Rol Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} Jail Yetkili Rolü \`•❯\``, jailStaff.length > 0 ? jailStaff.map(oxy => (button.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${button.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Rol Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} C.Mute Yetkili Rolü \`•❯\``, cMuteStaff.length > 0 ? cMuteStaff.map(oxy => (button.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${button.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Rol Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} V.Mute Yetkili Rolü \`•❯\``, vMuteStaff.length > 0 ? vMuteStaff.map(oxy => (button.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${button.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Rol Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} ADS Yetkili Rolü \`•❯\``, adsStaff.length > 0 ? adsStaff.map(oxy => (button.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${button.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Rol Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} Jail Rolü \`•❯\``, karantina.length > 0 ? karantina.map(oxy => (button.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${button.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Rol Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} C.Mute Rolü \`•❯\``, cMuted.length > 0 ? cMuted.map(oxy => (button.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${button.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Rol Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} V.Mute Rolü \`•❯\``, vMuted.length > 0 ? vMuted.map(oxy => (button.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${button.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Rol Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} ADS Rolü \`•❯\``, adsRoles.length > 0 ? adsRoles.map(oxy => (button.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${button.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Rol Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} Ban Logu \`•❯\``, banChannel.length > 0 ? `${emojis.tik} <#${banChannel}>` : `${emojis.carp} \`Kanal Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} Jail Logu \`•❯\``, jailChannel.length > 0 ? `${emojis.tik} <#${jailChannel}>` : `${emojis.carp} \`Kanal Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} C.Mute Logu \`•❯\``, cMuteChannel.length > 0 ? `${emojis.tik} <#${cMuteChannel}>` : `${emojis.carp} \`Kanal Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} V.Mute Logu \`•❯\``, vMuteChannel.length > 0 ? `${emojis.tik} <#${vMuteChannel}>` : `${emojis.carp} \`Kanal Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} ADS Mute Logu \`•❯\``, adsChannel.length > 0 ? `${emojis.tik} <#${adsChannel}>` : `${emojis.carp} \`Kanal Bulunmuyor.\``,true)
        .addField(`${emojis.inviteStar} Ban Limit \`•❯\` `, `${emojis.tik} ${banLimit}`,true)
        .addField(`${emojis.inviteStar} Jail Limit \`•❯\` `, `${emojis.tik} ${jailLimit}` ,true)
        .addField(`${emojis.inviteStar} C.Mute Limit \`•❯\` `, `${emojis.tik} ${cMuteLimit}` ,true)
        .addField(`${emojis.inviteStar} V.Mute Limit \`•❯\` `, `${emojis.tik} ${vMutelimit}` ,true)
        .addField(`${emojis.inviteStar} ADS Limit \`•❯\` `, `${emojis.tik} ${adsLimit}` ,true)


        );
}
    if (button.id === 'a') {
        await button.reply.think(true);
        await button.reply.edit(`Sunucuya Katılma Tarihiniz : \`${moment(button.clicker.user.joinedAt).format("LLL")}\` `);
}
    if(button.id === 'b'){
        const data = await isimler.findOne({ guildID: conf.guildID, userID: button.clicker.id });
        await button.reply.think(true);
        await button.reply.edit(`Geçmiş Kullanıcı Adlarınız :\n\n ${data ? data.names.splice(0, 10).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol})`).join("\n") : "Bulunmuyor!"}`)
}

    if(button.id === 'c'){
        let data = await penals.find({ guildID:  conf.guildID, userID: button.clicker.id, }).sort({ date: -1 });
        await button.reply.think(true);
        await button.reply.edit(`${data.length === 0 ? `siciliniz temiz!` : data = data.map((x) => `#${x.id} ${x.active ? others.Emoji1 : others.Emoji2} **[${x.type}]** ${moment(x.date).format("LLL")} tarihinde, <@${x.staff}> tarafından, \`${x.reason}\` nedeniyle, ${x.type.toLowerCase().replace("-", " ")} cezası almış.`).join("\n")} `)
}
    if(button.id === 'd'){
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
if(button.id === 'e'){
    await button.reply.think(true);
    await button.reply.edit(`Üstünüzde Bulunan Roller : \n \`>\` ${button.guild.members.cache.get(button.clicker.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') || "**Bu kullanıcıda hiçbir rol bulunmuyor**"}`)
}
if (button.id === 'f') {
    await button.reply.think(true);
    await button.reply.edit(`Hesabınızın Oluşturma Tarihi : \`${moment(button.clicker.user.createdAt).format("LLL")}\` `);
}
if(button.id === 'g'){
    let cevap = ""
    let oxy = button.guild.members.cache.get(button.clicker.id)
    await oxy.manageable ? oxy.roles.cache.has(oxy.boosterRole) ? oxy.roles.set([oxy.boosterRole, conf.registration.unregister]) : oxy.roles.set([conf.registration.unregister]) : cevap == `Maalesef Bu İşlemi Gerçekleştiremiyorum.`
    await button.reply.think(true);
    await button.reply.edit(`${oxy.manageable ? "Başarıyla Kayıtsız Kanalına Atıldınız. İyi Teyitler Dileriz <3" : "Maalesef Bu İşlemi Gerçekleştiremiyorum."}`)
}
if (button.id === 'h') {
    const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: message.author.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;}
        return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
    };
        const Active1 = await messageUserChannel.find({ guildID: conf.guildID, userID: button.clicker.id }).sort({ channelData: -1 });
		const Active2 = await voiceUserChannel.find({ guildID: conf.guildID, userID: button.clicker.id }).sort({ channelData: -1 });
		const voiceLength = Active2 ? Active2.length : 0;
		let voiceTop;
		let messageTop;
		Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor.";
		Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `<#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join("\n") : voiceTop = "Veri bulunmuyor.";

		const messageData = await messageUser.findOne({ guildID: conf.guildID, userID: button.clicker.id });
		const voiceData = await voiceUser.findOne({ guildID: conf.guildID, userID: button.clicker.id });

		const messageDaily = messageData ? messageData.dailyStat : 0;
		const messageWeekly = messageData ? messageData.weeklyStat : 0;
        const voiceDaily = voiceData ? voiceData.dailyStat : 0;
		const voiceWeekly = voiceData ? voiceData.weeklyStat : 0;
    await button.reply.think(true);
    await button.reply.edit(`> **➥ Sesli Kanal Bilgileri: (\`Toplam ${voiceLength} kanal\`)**\n${voiceTop}\n**───────────────**\n> **➥ Mesaj Bilgileri: (\`Toplam ${messageData ? messageData.topStat : 0} mesaj\`)**\n${messageTop}\n\n> Sesli Verileri :\n\`•\` Haftalık Ses : \`${moment.duration(voiceWeekly).format("H [saat], m [dakika] s [saniye]")}\`\n\`•\` Günlük Ses : \`${moment.duration(voiceDaily).format("H [saat], m [dakika] s [saniye]")}\`\n\n> Mesaj Verileri :\n\`•\` Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`\n\`•\` Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\``);
}
if(button.id === 'ı'){
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

  
};

module.exports.conf = {
  name: "clickButton"
};
