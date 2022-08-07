const conf = require("../configs/config.json");
const { red, green } = require("../configs/emojis.json");
const voice = require("../schemas/voiceInfo");
const moment = require('moment');
moment.locale("tr");
require("moment-duration-format");

module.exports = {
  conf: {
    aliases: [],
    name: "userinfo",
    help: "userinfo",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    const User = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const Status = {
      idle: `\`Boşta\` :crescent_moon:`,
      dnd: `\`Rahatsız Etmeyin\` :no_entry:`,
      offline: `\`Çevrimdışı\` :black_circle:`,
      online: `\`Çevrimiçi\` :green_circle:`
    };
    const cihaz = {
      web: `\`Wep Tarayıcısı\` :desktop:`,
      desktop: `\`Bilgisasyar (Uygulama)\` :computer:`,
      mobile: `\`Mobile \` :mobile_phone:`
    };
    const Member = message.guild.members.cache.get(User.id);
    const data = await voice.findOne({ userID: Member.user.id });
    let OBJ;
    if (message.member.user.presence.status !== 'offline') {
      OBJ = `Bağlandığı Cihaz: ${cihaz[Object.keys(Member.user.presence.clientStatus)[0]]}`
    } else { OBJ = `Bağlandığı Cihaz: \`Çevrimdışı\`` }
    const gif = User.displayAvatarURL({ dynamic: true }).endsWith(".gif") ? ` | [GIF](${User.displayAvatarURL({ format: "gif" })})` : "";
    
    embed.setDescription(`**Kullanıcı Bilgisi:**

    Profil: <@${User.id}> (\`${User.id}\`)
    Avatar: **[WEBP](${User.displayAvatarURL({ format: "webp", })}) | [JPEG](${User.displayAvatarURL({ format: "jpeg", })}) | [PNG](${User.displayAvatarURL({ format: "png" })}) ${gif}**
    Durum: **${Status[User.presence.status]}**
    ${OBJ}
    Roller: ${Member.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' \`|\` ') || `\`Bu kullanıcıda hiçbir rol bulunmuyor\``}
    Oluşturulma: \`${moment(Member.user.createdAt).format("LLL")}\`(\`${moment(Member.user.createdTimestamp).fromNow()}\`)
    Sunucuya Katılma: \`${moment(Member.user.joinedAt).format("LLL")}\`

    ${!Member.voice.channel ? `` : `Kullanıcı <#${Member.voice.channel.id}> adlı sesli kanalda
    \`Mikrofonu:\` ${Member.voice.mute ? `Kapalı ${red}` : `Açık ${green}`}
    \`Kulaklığı:\` ${Member.voice.deaf ? `Kapalı ${red}` : `Açık ${green}`}
    ${data ? `\`${moment.duration(Date.now() - data.date).format("H [saat], m [dakika], s [saniyedir]")}\` seste.` : "Kullanıcı seste değil."}`}`)
    embed.setThumbnail(User.avatarURL({ dynamic: true }));
    message.channel.send(embed)
  },
};
