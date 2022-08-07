const moment = require("moment");
moment.locale("tr");
const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");

module.exports = async (oldUser, newUser) => {
    if (oldUser.bot || newUser.bot) return;
    const guild = client.guilds.cache.get(conf.guildID);
    if (!guild) return;
    const member = guild.members.cache.get(oldUser.id);
    if (!member) return;
    const channel = guild.channels.cache.get(conf.tag.log);

    if (oldUser.discriminator.includes(conf.tag.etiket[0]) && !newUser.discriminator.includes(conf.tag.etiket[0])) {
        if (member.manageable && member.displayName.includes(conf.tag.tag[0])) member.setNickname(member.displayName.replace(conf.tag.tag[0], conf.tag.tag2));
        if (conf.taglıAlım && !member.premiumSince) member.roles.set(conf.registration.unregRoles);
        else member.roles.remove(conf.tag.role);
        if (!channel) return;
        const embed = new MessageEmbed()
        .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
        .setTitle("• Bir kullanıcı etiketi saldı!")
          .setDescription(`
    ${member.toString()} kullanıcısı **${conf.tag.etiket[0]}** etiketini saldığı için <@&${conf.tag.role}> rolü alındı.
    Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.discriminator.includes(conf.tag.etiket[0])).size}
    ─────────────────

    Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}`);
        channel.loggerSend(embed);
      } else if (!oldUser.discriminator.includes(conf.tag.etiket[0]) && newUser.discriminator.includes(conf.tag.etiket[0])){
        if (member.manageable) member.setNickname(member.displayName.replace(conf.tag.tag2, conf.tag.etiket[0]));
        member.roles.add(conf.tag.role);
        if (!channel) return;
        const embed = new MessageEmbed()
        .setAuthor(newUser.displayName, newUser.avatarURL({ dynamic: true })).setColor(conf.colors.renk_mor).setFooter(`ID: ${newUser.id} • ${moment().calendar()}`).setThumbnail(newUser.displayAvatarURL({dynamic: true}))
        .setTitle("• Bir kullanıcı etiketi aldı!")
          .setDescription(`
    ${member.toString()} kullanıcısı **${conf.tag.etiket[0]}** etiketini aldığı için <@&${conf.tag.role}> rolü verildi.
    Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.discriminator.includes(conf.tag.etiket[0])).size}
    ─────────────────

    Eski adı : ${oldUser.tag} | Yeni adı : ${newUser.tag}
      `);
        channel.loggerSend(embed);
      }
};

module.exports.conf = {
  name: "userUpdate",
};
