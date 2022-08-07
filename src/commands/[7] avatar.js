const { MessageEmbed } = require("discord.js");
const { MessageButton , MessageActionRow } = require('discord-buttons');

module.exports = {
  conf: {
    aliases: [],
    name: "avatar",
    help: "avatar",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */
  
  run: async (client, message, args) => {
    var kontrol;
    const user = args[0] ? message.mentions.users.first() || await client.users.fetch(args[0]) : message.author;
    const gif = user.displayAvatarURL({ dynamic: true }).endsWith(".gif") ? ` | [GIF](${user.displayAvatarURL({ format: "gif" })})` : "";
    let webp = new MessageButton().setStyle('gray').setLabel('Webp 🎨').setID('webp')
    let jpeg = new MessageButton().setStyle('gray').setLabel('Jpeg 🎨').setID('jpeg')
    let png = new MessageButton().setStyle('gray').setLabel('Png 🎨').setID('png')
    let gifs = new MessageButton().setStyle('gray').setLabel('Gif 🎨').setID('gifs')
    let row1 = new MessageActionRow().addComponent(webp).addComponent(jpeg).addComponent(png)
    let row2 = new MessageActionRow().addComponent(webp).addComponent(jpeg).addComponent(png).addComponent(gifs)
  if(user.displayAvatarURL({ dynamic: true }).endsWith(".gif")) { kontrol = row2 } else { kontrol = row1 }
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${user.username} Adlı Kullanıcnın Profili`)
      .setDescription(`**[WEBP](${user.displayAvatarURL({ format: "webp", })}) | [JPEG](${user.displayAvatarURL({ format: "jpeg", })}) | [PNG](${user.displayAvatarURL({ format: "png" })}) ${gif}**`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));
     await message.channel.send(embed,{ components: [kontrol] });

client.on('clickButton', async (button) => {
  const embeds = new MessageEmbed().setColor(button.clicker.member.diplayHexColor);
  if(button.id === "webp") {
    await button.reply.think(true);
    await button.reply.edit(`<@!${button.clicker.id}> istediğiniz webp biçimindeki avatar ;`,embeds.setImage(user.displayAvatarURL({ format: "webp", })))
}
  if(button.id === "jpeg") {
    await button.reply.think(true);
    await button.reply.edit(`<@!${button.clicker.id}> istediğiniz jpeg biçimindeki avatar ;`,embeds.setImage(user.displayAvatarURL({ format: "jpeg", })))
}
  if(button.id === "png") {
    await button.reply.think(true);
    await button.reply.edit(`<@!${button.clicker.id}> istediğiniz png biçimindeki avatar ;`,embeds.setImage(user.displayAvatarURL({ format: "png", })))
}
  if(button.id === "gifs") {
    await button.reply.think(true);
    await button.reply.edit(`<@!${button.clicker.id}> istediğiniz gif biçimindeki avatar ;`,embeds.setImage(user.displayAvatarURL({ format: "gif", })))
}
});
  },
};