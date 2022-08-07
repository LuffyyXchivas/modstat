const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
let alarmModel = require("../schemas/alarm");
let ms = require("ms")
let moment = require("moment");
moment.locale("tr");

module.exports = {
    conf: {
      aliases: ["alarm"],
      name: "alarm",
      help: "alarm [süre] [hatırlatma]",
    },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.guild) return;
    
    let sure = args[0] ? ms(args[0]) : undefined;
    if (!sure) return message.channel.send(embed.setDescription("Geçerli bir süre belirtmelisin! (1s/1m/1h/1d)")).then(x => x.delete({ timeout: 5000 }));
    if (!args[1]) return message.channel.send(embed.setDescription("Hatırlatmamı istediğin şeyi belirtmelisin!")).then(x => x.delete({ timeout: 5000 }));
    let baslangic = Date.now();
    let yeniAlarm = new alarmModel({
      uye: message.author.id,
      kanal: message.channel.id,
      baslangic: baslangic,
      bitis: baslangic + sure,
      aciklama: args.slice(1).join(" ")
    });
    yeniAlarm.save();
    let total = (baslangic + sure) - (baslangic - sure)
    message.channel.send(embed.setDescription(`Başarıyla alarm kuruldu.\n\n\`•\`Alarmı kuran kullanıcı : <@!${message.author.id}>\n\`•\` Alarmın kurulduğu kanal : <#${message.channel.id}>\n\`•\` Alarmın başlangıç zamanı : \`${moment(baslangic).format("LLL")}\` \n\`•\` Alarmın bitiş zamanı : \`${moment(baslangic + sure).format("LLL")}\`\n\`•\` Alarm kurulan metin : **${args.slice(1).join(" ")}**`)).then(x => x.delete({ timeout: 10000 }));
  },
};
