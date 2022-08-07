const emojis = require("../configs/emojis.json");
const conf = require("../configs/config.json");
const roles = require("../schemas/roles");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["role"],
    name: "rol",
    help: "rol bilgi [rolID/<@&Role>]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed, prefix) => {
    if (!message.member.permissions.has(524288)) return  message.channel.error(message, `Bu komudu kullanmak için gerekli yetkiye sahip değilsin.`);;
    if (!args[0]) return message.channel.error(message, `Komutu hatalı kullandınız! Gerekli argümanları doldurup tekrar deneyin. \nÖrnek: \`${prefix}rol [al-ver-bilgi-liste] [@OxY/ID] [@Rol/RolID]\``);
    const log = message.guild.channels.cache.get(conf.penals.role.log);

    if(args[0] == "give" || args[0] === "ver") {
      if (!args[1]) return message.channel.error(message, "Üzerinde işlem yapmak istediğin kullanıcıyı belirtmelisin!");
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
      if (!user) return message.channel.error(message, "Belirttiğin kullanıcıyı bulamıyorum. Lütfen geçerli bir kullanıcıyı belirt!");
      if (!args[2]) return message.channel.error(message, "Vermek veya almak istediğin rolü belirtmelisin!");
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
      if (!role) return message.channel.error(message, "Belirtmiş olduğun rolü bulamadım. Lütfen geçerli bir rol etiketle veya ID gir!");
      if (message.member.roles.highest.rawPosition <= role.rawPosition) return message.channel.error(message, "Senden daha üstteki veya eşit bir rolle işlem yapamazsın!");
      if (!role.editable) return message.channel.error(message, "Bu rolü kontrol yetkim bulunmuyor.");
    }
    if(args[0] == "get" || args[0] === "al") {
      if (!args[1]) return message.channel.error(message, "Üzerinde işlem yapmak istediğin kullanıcıyı belirtmelisin!");
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
      if (!user) return message.channel.error(message, "Belirttiğin kullanıcıyı bulamıyorum. Lütfen geçerli bir kullanıcıyı belirt!");
      if (!args[2]) return message.channel.error(message, "Vermek veya almak istediğin rolü belirtmelisin!");
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
      if (!role) return message.channel.error(message, "Belirtmiş olduğun rolü bulamadım. Lütfen geçerli bir rol etiketle veya ID gir!");
      if (message.member.roles.highest.rawPosition <= role.rawPosition) return message.channel.error(message, "Senden daha üstteki veya eşit bir rolle işlem yapamazsın!");
      if (!role.editable) return message.channel.error(message, "Bu rolü kontrol yetkim bulunmuyor.");
      if (user.roles.cache.has(role.id)) {
        user.roles.remove(role.id);
        message.channel.send(embed.setDescription(`${user} kullanıcısından ${role} rolü başarıyla alındı.`)).then(() => message.react(config.emojis.onay));
        if (log) log.send(embed.setDescription(`${client.emojis.cache.get(config.emojis.red)} **Rol alındı. Rol:** ${role}, **Yetkili:** ${message.author} \n**Tarih:** ${moment(Date.now()).format("LLL")} \`(${moment(Date.now()).fromNow()})\``));
        roles.findOne({ userID: user.id }, async (err, veri) => {
            if (!veri) {
                const veriler = [];
                veriler.push({
                    staff: message.author.id,
                    date: Date.now(),
                    role: role.id,
                    type: false
                });
                const yeniRollerVeri = new roles({
                    guildID: message.guild.id,
                    userID: user.id,
                    roles: veriler
                });
                yeniRollerVeri.save().catch(e => console.log(e));
            } else {
                veri.roles.push({
                    staff: message.author.id,
                    date: Date.now(),
                    role: role.id,
                    type: false
                });
                veri.save().catch(e => e.console.log(e));
            }
        });
    } else {
        return message.channel.error(message, `${user} kullanıcısında ${role} rolü zaten mevcut değil.`);
    }
    }

    if (args[0] === "bilgi" || args[0] === "info") {
    let RoleID = args[1];
    if (!message.guild.roles.cache.has(RoleID)) return message.channel.send("Belirttiğiniz ID ile bir rol bulunamadı!").then(x => x.delete({timeout: 10000}));
    let List;
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]); 
    let roles = message.guild.members.cache.filter(x => !x.user.bot && x.roles.cache.has(RoleID));
    let Users = message.guild.members.cache.filter(x => !x.user.bot && x.roles.cache.has(RoleID) && (x.user.presence.status != "offline"));
    let nonVoiceChannel = Users.filter(x => !x.voice.channel);

    await message.channel.send(`\`•\` ${message.author} Rolde bulunan üyelerin etiket yemesini istiyorsanız \`evet\` istemiyorsanız \`hayır\` yazınız.`).then(async (msg) => {
        let awaitMessage = await message.channel.awaitMessages(x => x.author.id === message.author.id, { max: 1, time: 60000 });
        if (!awaitMessage.size) return message.channel.send(`\`•\` Maalesef. Uyku moduna girdiğiniz için cevap alamadım.`).then(x => { x.delete({timeout: 10000}); msg.delete()});
        let response = awaitMessage.first();
        if (response.content.includes("evet")) {
          await msg.delete();
          await message.channel.send(`\`•\` ${message.author}, Rahatsızlık yarattığım için özür dilerim. Etiketlediğiniz role denetim için aşşağıdaki argümanları kullanın. \n\n\`•\`Eğer bütün herkes ise \`tüm\`,\n\`•\`Eğer sadece çevrimiçiler ise \`online\`, \n\`•\`Eğer seste olmayanlar ise \`unvoice\` yazınız.`).then(async (msg2) => {
        let awaitMessage2 = await message.channel.awaitMessages(x => x.author.id === message.author.id, { max: 1, time: 60000 });
        if (!awaitMessage2.size) return message.channel.send(`\`•\` Maalesef. Uyku moduna girdiğiniz için cevap alamadım.`).then(x => { x.delete({timeout: 10000}); msg2.delete(); });
        let response2 = awaitMessage2.first();
        if (response2.content.includes("tüm")) {
          await message.channel.send(`Rol İsmi : **${role.name}**\nRol ID : (\`${role.id}\`)\nÜye Sayısı : ${role.members.size < 1 ? `${message.guild.emojis.cache.get(emojis.red)} Bu rolde hiç üye yok!` : `(${emojis.oxyuser} ${role.members.size})\n─────────────────\n`}Roldeki Kişiler :\n${roles.map(x => `${message.guild.members.cache.get(x.id)} - (\`${x.id}\`) ${Date.now()-x.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7 ? message.guild.emojis.cache.get(emojis.red) : `${emojis.tik}`}`).join("\n"), { split: { char: ',\n' }}}`);
          } else if (response2.content.includes("online")) { 
          const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]); 
          List = Users.size > 0 ? Users.map(x => `${message.guild.members.cache.get(x.id)} - (\`${x.id}\`) ${Date.now()-x.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7 ? message.guild.emojis.cache.get(emojis.red) : `${emojis.tik}`}`).join("\n") : ""; 
          await message.channel.send(`Rol İsmi : **${role.name}**\nRol ID : (\`${role.id}\`) \nÜye Sayısı : (${Users.size < 1 ? `${message.guild.emojis.cache.get(emojis.red)} Bu rolde hiç online üye yok!)` : `${emojis.oxyuser} ${Users.size})\n─────────────────\n`}Roldeki Kişiler :\n${List}`);
        } else if (response2.content.includes("unvoice")) {
          const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]); 
          List = nonVoiceChannel.size > 0 ? nonVoiceChannel.map(x => `${message.guild.members.cache.get(x.id)} - (\`${x.id}\`) ${Date.now()-x.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7 ? message.guild.emojis.cache.get(emojis.red) : `${emojis.tik}`}`).join("\n") : "Aranan argümana uygun kimse bulunamadı"; 
          await message.channel.send(`Rol İsmi : **${role.name}**\nRol ID : (\`${role.id}\`) \nÜye Sayısı : (${Users.size < 1 ? `${message.guild.emojis.cache.get(emojis.red)} Bu rolde seste olmayan üye yok!)` : `${emojis.oxyuser} ${Users.size})\n─────────────────\n`}Roldeki Kişiler :\n${List}`);
            };
          });
        } else if (response.content.includes("hayır")) {
      await msg.delete();
          await message.channel.send(`\`•\` ${message.author},  Rahatsızlık yarattığım için özür dilerim. Etiketlediğiniz role denetim için aşşağıdaki argümanları kullanın. \n\n\`•\`Eğer bütün herkes ise \`tüm\`,\n\`•\`Eğer sadece çevrimiçiler ise \`online\`, \n\`•\`Eğer seste olmayanlar ise \`unvoice\` yazınız.`).then(async (msg2) => {
        let awaitMessage2 = await message.channel.awaitMessages(x => x.author.id === message.author.id, { max: 1, time: 60000 });
        if (!awaitMessage2.size) return message.channel.send(`\`•\` Maalesef. Uyku moduna girdiğiniz için cevap alamadım.`).then(x => { x.delete({timeout: 10000}); msg2.delete(); });
        let response2 = awaitMessage2.first();
        if (response2.content.includes("tüm")) { 
            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
            message.channel.send(`Rol İsmi : **${role.name}** (\`${role.id}\`) Kişi Sayısı : (${role.members.size < 1 ? `${message.guild.emojis.cache.get(emojis.red)} Bu rolde hiç üye yok!` : `${emojis.tik} ${role.members.size}`})`);
            message.channel.send(role.members.array().map((x) => x.toString()).join(',\n'), { code: 'xl', split: { char: ',\n' } });
        } else if (response2.content.includes("online")) { 
      List = Users.map(x => `${message.guild.members.cache.get(x.id).displayName} - ${x.id}`).join("\n");
          await message.channel.send(`\`•\` ${message.guild.roles.cache.get(RoleID).name} adlı rolde bulup online olan ${Users.size} kişi bulunuyor. \n\n${List}`, { code: 'xl', split: true });
        } else if (response2.content.includes("unvoice")) {
          List = nonVoiceChannel.map(x => `${message.guild.members.cache.get(x.id).displayName} - ${x.id}`).join("\n");
          await message.channel.send(`\`•\` ${message.guild.roles.cache.get(RoleID).name} adlı rolde bulup seste olmayan ${nonVoiceChannel.size} kişi bulunuyor. \n\n${List}`, { code: 'xl', split: true });
                  };
              });
          };
      });

    }
  },
};
