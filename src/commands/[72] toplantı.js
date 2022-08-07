const Discord = require('discord.js');
const conf = require('../configs/config.json');
const meeting = require("../schemas/meeting");
const emojis = require('../configs/emojis.json');

module.exports = {
    conf: {
      aliases: ["toplantı"],
      name: "toplantı",
      help: "toplantı [mazeretli/başlat/çağır/bitir]"
    },

run: async (client, message, args, embed, prefix) => {
    const log = message.guild.channels.cache.get(conf.meeting.log);
    const channel = message.guild.channels.cache.get(conf.meeting.channel);
    const excused = message.guild.roles.cache.get(conf.meeting.excused);
    const attend = message.guild.roles.cache.get(conf.meeting.attend);
    const attendt = message.guild.roles.cache.get(conf.meeting.attendt);

    if(!message.member.hasPermission(8)) return message.channel.error(message , `Bu komudu kullanmak için yeterli yetkiniz yok.`).then((x) => {x.delete({ timeout: 10000 }); });
    if(!args[0]) return message.channel.error(message ,`Lütfen bir argüman belirtin! \n \`${prefix}toplantı [start/excused/call/finish]\``).then((x) => {x.delete({ timeout: 10000 }); });

    if(args[0] == "excused" || args[0] == "mazeretli") {
        if (!message.member.permissions.has(8)) return message.react(emojis.carp);
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        if(!member) return message.channel.error(message ,"Lütfen kimi mazeretli olarak belirtmek istiyorsun onu belirt!").then((x) => {x.delete({ timeout: 10000 }); });
        let reason = args.slice(2).join(" ");
        if(!reason) return message.channel.error(message ,"Lütfen bir sebep belirt!").then((x) => {x.delete({ timeout: 10000 }); });
        //await meeting.findOneAndUpdate({ guildID: message.guild.id, userID: member }, { $set: { reason} }, { upsert: true });
        message.channel.send(`${member} adlı yetkili başarılı bir şekilde ${reason} sebeiyle mazeretli olarak belirtildi`)
        log.send(embed.setDescription(`${member} adlı yetkili, <@${message.author.id}> adlı yönetici tarafindan mazereti onaylandı!`).setColor("GREEN"))
        await member.roles.add(excused)
    }
    if(args[0] == "start" || args[0] == "başlat") {
        if (!message.member.permissions.has(8)) return message.react(emojis.carp);
        let voicestaff = message.guild.members.cache.filter(c => c.roles.highest.position >= conf.registration.staffs.some((x) => message.member.roles.cache.has(x))).filter(axi => axi.voice.channelID === channel)
        let unvoicestaff = message.guild.members.cache.filter(c => c.roles.highest.position >= conf.registration.staffs.some((x) => message.member.roles.cache.has(x))).filter(axi => axi.voice.channelID !== channel).filter(m => !m.roles.cache.has(excused))
        voicestaff.array().forEach((member, index) => {
            setTimeout(async() => {
                member.roles.add(attend)
            }, index * 350)
        })

        unvoicestaff.array().forEach((member, index) => {
            setTimeout(async() => {
                member.roles.add(attendt)
            }, index * 350)
        })
        message.channel.send(embed.setDescription(`Herkese Rollerini Dağıtıyorum.\n ${voicestaff.size} adet Yetkili Seste, ${unvoicestaff.size} adet Yetkili Seste Değil.`))
    }

    if(args[0] == "call" || args[0] == "çağır") {
        if (!message.member.permissions.has(8)) return message.react(emojis.carp);
        let yetkili = message.guild.roles.cache.get(conf.registration.staffs); 
        let ses = message.guild.members.cache.filter(kullanici => kullanici.roles.highest.position >= yetkili.position && !kullanici.voice.channel && !kullanici.user.bot && kullanici.id !== "719661452100894761" && kullanici.presence.status !== "offline"); 
        if(ses.length == 0)  message.channel.error(message ,"Seste olmayan yetkili yok!").then((x) => {x.delete({ timeout: 10000 }); });
        message.channel.send(`\`${message.guild.name}\` sunucusunda aktif olup seste olmayan \`${ses.size}\` kişi bulunuyor. \n\n${ses.map(e => e).join(", ")}  \n\nSağ tarafta **aktif gözüktüğünüz sürece** sol tarafta bulunan ses odalarında bulunmanız **zorunludur**. Bu uyarıların yetki **yükseltilmesinde/düşürülmesinde** etkisi olacaktır.`).then(e => message.react(emojis.diamondHeart));
        const mesaj = message.channel.send(`Dağıtım başlatılıyor...`)
        ses.forEach((staff, index) => {
            setTimeout(() => {
                staff.send(message.guild.name+' Sunucusunda toplantı başlatıldı. Ama sen yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetkilerin alınacaktır.').then(x => mesaj.edit(`Dağıtım devam ediyor...`,embed.setDescription(`${staff} yetkilisine özelden bilgilendirme mesajı atıldı!`)).catch(err => message.channel.send(`${staff}, Sunucuda toplantı başladı. Ama sen yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetkilerin alınacaktır.`).then(x => mesaj.edit(embed.setDescription(`Dağıtım devam ediyor...`,`${yetkili} yetkilisine özelden mesaj atılamadığı için kanaldan bildirim geçildi!`)))));
            })
        })
    }

    if(args[0] == "finish" || args[0] == "bitir") {
    if(!message.member.permissions.has(8)) return message.react(emojis.carp);
    const deafeds = channel.members.filter((x) => x.voice.selfDeaf);
    const notDeafeds = channel.members.filter((x) => !x.voice.selfDeaf);
    const publicChannels = message.guild.channels.cache.filter((x) => x.parentID && x.parentID === conf.publicParent);
    
    deafeds.forEach((x, index) => {
      client.wait(index * 1000);
      x.voice.setChannel(conf.sleepRoom);
    });

    notDeafeds.forEach((x, index) => {
      client.wait(index * 1000);
      x.voice.setChannel(publicChannels.random());

      message.channel.send(embed.setDescription(`Toplantımız sonlandırılmıştır. ${emojis.green} \`${deafeds.size}\` kişi sleep odasına, \`${notDeafeds.size}\` kişi public kanallara dağıtıldı!`));

    });
    }
    if(args[0] == "mazeretli-topla" || args[0] == "yoklama") {
        
    }
        },
  };