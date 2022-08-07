const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["koruma"],
    name: "koruma",
    help: "koruma [aç/kapat]",
    owner: true
  },
  
  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if(!args[0] === "aç") {

        message.channel.send(`Koruma nedeniyle sunucudaki tüm yetkiler kapatıldı.`)
    }
    if(args[0] === "kapat") {
        await message.guild.roles.cache.get("rol_id").setPermissions(8) // bot yt
        await message.guild.roles.cache.get("rol_id").setPermissions(8) // owner yt
        await message.guild.roles.cache.get("rol_id").setPermissions(268435456) // rolyt
        await message.guild.roles.cache.get("rol_id").setPermissions(128) // denetimkaydı
        await message.guild.roles.cache.get("rol_id").setPermissions(16) // kanalyt
        message.channel.send(embed.setDescription(`Sunucumuzun yönetici rolleri tekrardan aktif hale getirilmiştir.`))
    } 
}
};
  