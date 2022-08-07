const emojis = require("../configs/emojis.json");
const { tag } = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["taggeds"],
    name: "taglıbul",
    help: "taggeds ",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {

    //message.channel.send(`Aşşağıdan dağıtım yapılıcak katagoriyi seçiniz.` , embed.setDescription(``))

    let taglilar2 = message.guild.members.cache.filter(s => s.user.username.includes(tag.tag[1]) && !s.roles.cache.has(tag.role))
    let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(tag.tag[0]) && !s.roles.cache.has(tag.role))
    let taglilar3 = message.guild.members.cache.filter(s => s.user.username.includes(tag.tag[2]) && !s.roles.cache.has(tag.role))
    let taglilar4 = message.guild.members.cache.filter(s => s.user.username.includes(tag.tag[3]) && !s.roles.cache.has(tag.role))
    let taglilar5 = message.guild.members.cache.filter(s => s.user.username.includes(tag.tag[4]) && !s.roles.cache.has(tag.role))
    let taglilar6 = message.guild.members.cache.filter(s => s.user.username.includes(tag.tag[5]) && !s.roles.cache.has(tag.role))
    let etiketliler = message.guild.members.cache.filter(s => s.user.discriminator.includes(tag.etiket[0]) && !s.roles.cache.has(tag.role))
    let tagsizlar = message.guild.members.cache.filter(s => !s.user.username.includes(tag.tag[0]) && !s.user.username.includes(tag.tag[1]) && !s.user.username.includes(tag.tag[2]) && !s.user.username.includes(tag.tag[3]) && !s.user.username.includes(tag.tag[4]) && !s.user.username.includes(tag.tag[5]) && !s.user.username.includes(tag.tag[6]) && !s.user.discriminator.includes(tag.etiket[0]) && s.roles.cache.has(tag.role))

    taglilar.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.add(tag.role)
        }, index * 1000)
    })
    taglilar2.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.add(tag.role)
        }, index * 1000)
    })
    taglilar3.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.add(tag.role)
        }, index * 1000)
    })
    taglilar4.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.add(tag.role)
        }, index * 1000)
    })
    taglilar5.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.add(tag.role)
        }, index * 1000)
    })
    taglilar6.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.add(tag.role)
        }, index * 1000)
    })
    etiketliler.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.add(tag.role)
        }, index * 1000)
    })
    tagsizlar.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.remove(tag.role)
        }, index * 1000)
    })
    embed.setDescription(`
Toplam **${taglilar.size + taglilar2.size + taglilar3.size + taglilar4.size + taglilar5.size + taglilar6.size+ etiketliler.size}** kadar kullanıcıda tagımız bulunuyor fakat <@&${tag.role}> rolü yok.
Bu yüzden dağıtım işlemini başlattım.

${emojis.inviteStar} **${taglilar.size}** adet kullanıcıda **${tag.tag[0]}** tagı var fakat <@&${tag.role}> rolü yok.
${emojis.inviteStar} **${taglilar2.size}** adet kullanıcıda **${tag.tag[1]}** tagı var fakat <@&${tag.role}> rolü yok.
${emojis.inviteStar} **${taglilar3.size}** adet kullanıcıda **${tag.tag[2]}** tagı var fakat <@&${tag.role}> rolü yok.
${emojis.inviteStar} **${taglilar4.size}** adet kullanıcıda **${tag.tag[3]}** tagı var fakat <@&${tag.role}> rolü yok.
${emojis.inviteStar} **${taglilar5.size}** adet kullanıcıda **${tag.tag[4]}** tagı var fakat <@&${tag.role}> rolü yok.
${emojis.inviteStar} **${taglilar6.size}** adet kullanıcıda **${tag.tag[5]}** tagı var fakat <@&${tag.role}> rolü yok.
${emojis.inviteStar} **${etiketliler.size}** adet kullanıcıda **${tag.etiket[0]}** etiketi var fakat <@&${tag.role}> rolü yok.


**${tagsizlar.size}** adet kullanıcıda eskiden tagımız bulunmasına rağmen artık olmadığından kaynaklı rolleri alınmıştır.
`)
    message.channel.send(embed)

  },
};
