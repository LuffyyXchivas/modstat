const conf = require("../configs/config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageEmbed } = require("discord.js");
const { chatMute, serverDeaf, selfDeaf, selfMute, serverMute, open, openDeaf, openStream, openMute, closeStream, close , join, leave} = require("../configs/emojis.json");
const penals = require("../schemas/penals");

module.exports = async (oldState, newState) => {

  const finishedPenal = await penals.findOne({ guildID: newState.guild.id, userID: newState.id, type: "VOICE-MUTE", removed: false, temp: true, finishDate: { $lte: Date.now() } });
  if (finishedPenal) {
    if (newState.serverMute && oldState.channelID && newState.channelID) newState.setMute(false);
    await newState.member.roles.remove(conf.penals.voiceMute.roles);
    finishedPenal.active = false;
    finishedPenal.removed = true;
    await finishedPenal.save();
  }

  const activePenal = await penals.findOne({ guildID: newState.guild.id, userID: oldState.id, type: "VOICE-MUTE", active: true });
  if (activePenal) {
    if (!newState.serverMute && oldState.channelID && newState.channelID) newState.setMute(true);
    if (!conf.penals.voiceMute.roles.some((x) => newState.member.roles.cache.has(x)) && oldState.channelID && newState.channelID) newState.member.roles.add(conf.penals.voiceMute.roles);
  }  
const embed = new MessageEmbed().setAuthor(newState.member.user.tag, newState.member.user.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newState.member.user.id} • ${moment().calendar()}`).setThumbnail(newState.member.user.displayAvatarURL({dynamic: true}));
const channel = newState.guild.channels.cache.get(conf.logs.voiceLog);
if (!channel) return;

if (!oldState.channel && newState.channel) return channel.loggerSend(
embed.setDescription(`${join} <@!${newState.member.id}> üyesi \`${newState.channel.name}\` adlı sesli kanala girdi!

Kanala Girdiği Anda:
Mikrofonu: **${newState.mute == true ? `${close} Kapalı` : `${open} Açık`}**
Kulaklığı: **${newState.deaf == true ? `${close} Kapalı` : `${open} Açık`}**

\`\`\`diff
- Girdiği Kanal : #${newState.channel.name} - ${newState.channel.id}
- Kullanıcı : ${newState.member.displayName} - ${newState.member.id}
+ Zaman : ${moment(newState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`

Girdiği Kanalda Bulunan Üyeler:
${newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
`));

if (oldState.channel && !newState.channel) return channel.loggerSend(
embed.setDescription(`${leave} ${newState.member.displayName} üyesi \`${oldState.channel.name}\` adlı sesli kanaldan ayrıldı!

Kanaldan Çıktığı Anda:
Mikrofonu: **${newState.mute == true ? `${close} Kapalı` : `${open} Açık`}**
Kulaklığı: **${newState.deaf == true ? `${close} Kapalı` : `${open} Açık`}**

\`\`\`diff
- Çıktığı Kanal : #${oldState.channel.name} - ${oldState.channel.id}
- Kullanıcı : ${oldState.member.displayName} - ${oldState.member.id}
+ Zaman : ${moment(oldState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`

Çıktığı Kanalda Bulunan Üyeler:
${oldState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : oldState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
`));

if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id) return channel.loggerSend(
embed.setDescription(`${newState.member.displayName} üyesi ses kanalını değiştirdi! 

Kanal değiştirdiği Anda:
Mikrofonu: **${newState.mute == true ? `${close} Kapalı` : `${open} Açık`}**
Kulaklığı: **${newState.deaf == true ? `${close} Kapalı` : `${open} Açık`}**

\`\`\`diff
- Eski Kanal : #${oldState.channel.name} - ${oldState.channel.id}
- Yeni Kanal : #${newState.channel.name} - ${newState.channel.id}
- Kullanıcı : ${newState.member.displayName} - ${newState.member.id}
+ Zaman : ${moment(oldState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`

Eski Kanalında Bulunan Üyeler:
${oldState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}

Yeni Kanalında Bulunan Üyeler:
${newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
`));
if (oldState.channel.id && oldState.selfMute && !newState.selfMute) return channel.loggerSend(
  embed.setDescription(`${openMute} ${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi susturmasını kaldırdı!

Kendi Susturmasını Açtığı Anda:
Kulaklığı: **${newState.deaf == true ? `${close} Kapalı` : `${open} Açık`}**

\`\`\`diff
- Susturduğu Kanal : #${newState.channel.name} - ${newState.channel.id}
- Kullanıcı : ${newState.member.displayName} - ${newState.member.id}
+ Zaman : ${moment(oldState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`

Kanalında Bulunan Üyeler:
${newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
  `));
if (oldState.channel.id && !oldState.selfMute && newState.selfMute) return channel.loggerSend(
  embed.setDescription(`${selfMute} ${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini susturdu!

  Kendisini Susturduğu Anda:
  Kulaklığı: **${newState.deaf == true ? `${close} Kapalı` : `${open} Açık`}**
  
  \`\`\`diff
- Susturduğu Kanal : #${newState.channel.name} - ${newState.channel.id}
- Kullanıcı : ${newState.member.displayName} - ${newState.member.id}
+ Zaman : ${moment(oldState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`
  
  Kanalında Bulunan Üyeler:
  ${newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : oldState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
  `));
if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) return channel.loggerSend(
  embed.setDescription(`${openDeaf} ${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!
  
  Kendi Sağırlaştımasını Açtığı Anda:
  Mikrofonu: **${newState.mute == true ? `${close} Kapalı` : `${open} Açık`}**
  
  \`\`\`diff
- Sağırlaştırdığı Kanal : #${newState.channel.name} - ${newState.channel.id}
- Kullanıcı : ${newState.member.displayName} - ${newState.member.id}
+ Zaman : ${moment(oldState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`
  
  Kanalında Bulunan Üyeler:
  ${newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : oldState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
  `));
if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) return channel.loggerSend(
  embed.setDescription(`${serverDeaf} ${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini sağırlaştırdı!
  
  Kendi Sağırlaştırdığı Anda:
  Mikrofonu: **${newState.mute == true ? `${close} Kapalı` : `${open} Açık`}**
  
  \`\`\`diff
- Sağırlaştırdığı Kanal : #${newState.channel.name} - ${newState.channel.id}
- Kullanıcı : ${newState.member.displayName} - ${newState.member.id}
+ Zaman : ${moment(oldState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`
  
  Kanalında Bulunan Üyeler:
  ${newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
  `));
if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) return channel.loggerSend(
  embed.setDescription(`${openStream} ${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayın açtı!
  
Yayın Açtığı Anda:
Mikrofonu: **${newState.mute == true ? `${close} Kapalı` : `${open} Açık`}**
Kulaklığı: **${newState.deaf == true ? `${close} Kapalı` : `${open} Açık`}**

\`\`\`diff
- Yayın Kanalı : #${newState.channel.name} - ${newState.channel.id}
- Kullanıcı : ${newState.member.displayName} - ${newState.member.id}
+ Zaman : ${moment(newState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`

Kanalda Bulunan Üyeler:
${newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
`))
if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) return channel.loggerSend(
  embed.setDescription(`${closeStream} ${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayını kapattı!
  
  Yayını Kapattığı Anda:
  Mikrofonu: **${newState.mute == true ? `${close} Kapalı` : `${open} Açık`}**
  Kulaklığı: **${newState.deaf == true ? `${close} Kapalı` : `${open} Açık`}**
  
  \`\`\`diff
- Yayın Kanalı : #${oldState.channel.name} - ${oldState.channel.id}
- Kullanıcı : ${oldState.member.displayName} - ${oldState.member.id}
+ Zaman : ${moment(oldState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`
  
  Kanalda Bulunan Üyeler:
  ${oldState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
   `))
if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo) return channel.loggerSend(
  embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını açtı!
    
  Kamera Açıldığı Anda:
  Mikrofonu: **${newState.mute == true ? `${close} Kapalı` : `${open} Açık`}**
  Kulaklığı: **${newState.deaf == true ? `${close} Kapalı` : `${open} Açık`}**
  
  \`\`\`diff
- Kamera Açılan Kanal : #${newState.channel.name} - ${newState.channel.id}
- Kullanıcı : ${newState.member.displayName} - ${newState.member.id}
+ Zaman : ${moment(newState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`
  
  Kanalda Bulunan Üyeler:
  ${newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
  `))
if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo) return channel.loggerSend(
  embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını kapattı!
    
  Kamera Kapandığı Anda:
  Mikrofonu: **${newState.mute == true ? `${close} Kapalı` : `${open} Açık`}**
  Kulaklığı: **${newState.deaf == true ? `${close} Kapalı` : `${open} Açık`}**
  
  \`\`\`diff
- Kamera Kapanan Kanal : #${newState.channel.name} - ${newState.channel.id}
- Kullanıcı : ${newState.member.displayName} - ${newState.member.id}
+ Zaman : ${moment(newState.channel.join.createdTimestamp).locale("tr").format("LLL")}\`\`\`
  
  Kanalda Bulunan Üyeler:
  ${newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`) == 0 ? `\`Herhangi bir kullanıcı bulunmamaktadır.\`` : newState.channel.members.map(x => `<@!${x.id}> \`${x.displayName}\` - (\`${x.id}\`)`).join("\n")}
  `))
};

module.exports.conf = {
  name: "voiceStateUpdate",
};

