const Discord = require("discord.js");
const conf = require("../configs/config.json");
const { jail } = require("../configs/emojis.json")
const disbut = require("discord-buttons")
module.exports = {
  conf: {
    aliases: ["cezalarım"],
    name: "cezabutton",
    owner: false,
  },

  run: async (client, message, args , embed) => {
    const member = message.member;
    if(!message.member.hasPermission(128)) return message.channel.error(message , `Bu komudu kullanmak için yeterli yetkiniz yok.`).then(x => x.delete({timeout: 5000}))

    let kalanZaman = new disbut.MessageButton().setStyle('red').setLabel('Kalan Zamanım?').setID('kalan')
    let ceza = new disbut.MessageButton().setStyle('red').setLabel('Cezalarım').setID('ceza')
    let cezaP = new disbut.MessageButton().setStyle('red').setLabel('Ceza Puanı').setID('cezaP')
    message.channel.send(`${jail} ${member} adlı kullanıcının ceza listesini, ceza puanını ve aktif cezasını aşağıda ki düğmelerden görüntüleyebilirsiniz.`,
    {buttons: [ceza, cezaP, kalanZaman]
    })


  },
};

  
