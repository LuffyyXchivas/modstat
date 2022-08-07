const conf = require("../configs/config.json");
const blacklist = require("../schemas/blacklist");
const { MessageEmbed } = require("discord.js");
const penals = require("../schemas/penals");

module.exports = {
  conf: {
    aliases: ["blacklist"],
    name: "karaliste",
    help: "blacklist [ekle/kaldır/liste]",
    owner: true
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (args[0] == "ekle" || args[0] == "add") {
      const user = message.mentions.users.first() || await client.fetchUser(args[0]);
      if (!user) {
        return message.channel.error(message, `Lütfen bir kişiyi etiketleyiniz`)
      }  else {
          message.channel.send(embed.setDescription(`Başarılı bir şekilde <@!${user.id}> adlı kişiyi karalisteye eklediniz`))
          const replies = ["https://media.discordapp.net/attachments/697505578972348436/806507415268622376/17.gif","https://media.discordapp.net/attachments/697505578972348436/801486319032205382/81f4a429035e1c8faec2078257a2eb7f.gif","https://media.discordapp.net/attachments/697505578972348436/806475926120300575/adf7d5b4c4df14d3638dfa07ba8c62fd.gif","https://media.discordapp.net/attachments/697505578972348436/803617905765777438/72f4b75d0d2a7d2314c25d3a5d687164.gif","https://media.discordapp.net/attachments/697505578972348436/807894209339195402/EL_HERUE_OSCURO.gif","https://media.discordapp.net/attachments/697505578972348436/807894365330472960/You_like_it_when_I_am_Crazy_Kurumi_x_Male_Reader.gif","https://media.discordapp.net/attachments/697505578972348436/807894194143494144/FOREVER_SAILOR_MOON.gif","https://media.discordapp.net/attachments/697505578972348436/807892907927273522/eacadb211638f1552be1a8c17d4680b0-1.gif"];
          const log = new MessageEmbed()
          .setAuthor(user.username, user.avatarURL({ dynamic: true, size: 2048 }))
          .setColor("RED")
          .setDescription(`
    ${member ? member.toString() : user.username} üyesi kara listeye eklendi!
    
    Kara Listeye Eklenen Üye: ${member ? member.toString() : ""} \`(${user.username.replace(/\`/g, "")} - ${user.id})\`
    Listeye Alan Yetkili: ${message.author} \`(${message.author.username.replace(/\`/g, "")} - ${message.author.id})\`
    Alma Tarihi: \`${moment(Date.now()).format("LLL")}\`
          `).setImage(replies.random())
       if(conf.logs.blacklistLog) {
         message.guild.channels.cache.get(conf.logs.blacklistLog).send(log); 
          }
        
      }
    } else {
      if (args[0] == "kaldır" || args[0] == "delete") {
        const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
        if (!user) {
          return message.channel.error(message, `Lütfen bir kişiyi etiketleyiniz`)
        } else {
          if (!data) {
            return message.channel.error(message, `Hata: Etiketlediğiniz kişi zaten karalistede listesinde bulunmuyor.`)
          } else {
            message.channel.send(embed.setDescription(`Başarılı bir şekilde <@!${user.id}> adlı kişiyi karalisteden kaldırdınız.`))
          }
        }
      }
    }

  },
};
