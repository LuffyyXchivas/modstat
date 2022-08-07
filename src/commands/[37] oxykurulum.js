const conf = require("../configs/config.json");
const settings = require("../configs/settings.json");
const { Database } = require("ark.db");
const emojis = require("../configs/emojis.json")
const db = new Database("/src/configs/emojis.json");
const penalsConfig = new Database("/src/configs/config.json");
const client = global.client;
const disbut = require('discord-buttons');

module.exports = {
  conf: {
    aliases: ["oxypanel"],
    name: "panel",
    owner: true,
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed, prefix) => {
    if (args[0] === "guildCreate" || args[0] === "sunucuKurulum") {
      const everyone = message.guild.roles.cache.find(e => e.name === "@everyone");
      serverEmojis.forEach(async (x) => {
        if (message.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
        const emoji = await message.guild.emojis.create(x.url, x.name);
        await db.set(x.name, emoji.toString());
        message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
      });
      numEmojis.forEach(async (x) => {
        if (message.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
        const emoji = await message.guild.emojis.create(x.url, x.name);
        await db.set(`numEmojis.${emoji.name.slice(0, 1)}`, emoji.toString());
        message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
      });
      roles.forEach(async (x) => {
        let newRole = await message.guild.roles.create({
          data: {
            name: x.name,
            color: x.color,
          }
        });
        message.channel.send(`\`${x.name}\` isimli Rol oluşturuldu! (${newRole.toString()})`);
      });
      message.guild.channels.create("</>", {
        type: "category"
      }).then(a => {
        var mod = a.id;
        a.updateOverwrite(everyone, {
          VIEW_CHANNEL: false,
        });

        message.guild.channels.create("Role Sellect", {
          type: "category"
        }).then(c => {
          var sellect = c.id;
          c.updateOverwrite(everyone, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false,
          });
          sellectChannels.forEach(async (x) => {
            let newLog = await message.guild.channels.create(x.name ,{
                type: x.type,
                parent: sellect
            });
            message.channel.send(`\`${x.name}\` isimli Kanal oluşturuldu! (${newLog.toString()})`);
          });
        message.guild.channels.create("Guard Logs", {
          type: "category"
        }).then(b => {
          var guard = b.id;
          b.updateOverwrite(everyone, {
            VIEW_CHANNEL: false
          });
            modChannels.forEach(async (x) => {
              let newLog = await message.guild.channels.create(x.name ,{
                  type: x.type,
                  parent: mod
              });
              message.channel.send(`\`${x.name}\` isimli Kanal oluşturuldu! (${newLog.toString()})`);
            });
            guardChannels.forEach(async (x) => {
              let newLog = await message.guild.channels.create(x.name ,{
                  type: x.type,
                  parent: guard
              });
              message.channel.send(`\`${x.name}\` isimli Kanal oluşturuldu! (${newLog.toString()})`);
            });
          });
        });
      });
    }
    if (args[0] === "emoji" || args[0] === "e") {
      serverEmojis.forEach(async (x) => {
        if (message.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
        const emoji = await message.guild.emojis.create(x.url, x.name);
        await db.set(x.name, emoji.toString());
        message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
      });
      numEmojis.forEach(async (x) => {
        if (message.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
        const emoji = await message.guild.emojis.create(x.url, x.name);
        await db.set(`numEmojis.${emoji.name.slice(0, 1)}`, emoji.toString());
        message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
      });
    }
    if (args[0] === "rolKurulum") {
      roles.forEach(async (x) => {
        let newRole = await message.guild.roles.create({
          data: {
            name: x.name,
            color: x.color,
          }
        });
        message.channel.send(`\`${x.name}\` isimli Rol oluşturuldu! (${newRole.toString()})`);
      });
}
    if (args[0] === "logKurulum") {
      const everyone = message.guild.roles.cache.find(e => e.name === "@everyone");
      message.guild.channels.create("</>", {
        type: "category"
      }).then(a => {
        var mod = a.id;
        a.updateOverwrite(everyone, {
          VIEW_CHANNEL: false,
        });
        message.guild.channels.create("Guard Logs", {
          type: "category"
        }).then(b => {
          var guard = b.id;
          b.updateOverwrite(everyone, {
            VIEW_CHANNEL: false
          });
            modChannels.forEach(async (x) => {
              let newLog = await message.guild.channels.create(x.name ,{
                  type: x.type,
                  parent: mod
              });
              message.channel.send(`\`${x.name}\` isimli Kanal oluşturuldu! (${newLog.toString()})`);
            });
            guardChannels.forEach(async (x) => {
              let newLog = await message.guild.channels.create(x.name ,{
                  type: x.type,
                  parent: guard
              });
              message.channel.send(`\`${x.name}\` isimli Kanal oluşturuldu! (${newLog.toString()})`);
            });
        });
      });
    }
    if (args[0] === "katılımcı" || args[0] === "k") {
      let ck = new disbut.MessageButton().setStyle('green').setLabel('🎉 Çekiliş Katılımcısı').setID('ck')
      let ek = new disbut.MessageButton().setStyle('red').setLabel('🎁 Etkinlik Katılımcısı').setID('ek')
      let vk = new disbut.MessageButton().setStyle('green').setLabel('🧛‍♂️ Vampir Köylü Oyuncusu ').setID('vk')
      let dc = new disbut.MessageButton().setStyle('red').setLabel('✨ Doğruluk Cesaret Oyuncusu').setID('dc')
      message.channel.send(`Sunucuda sizleri rahatsız etmemek için \`@everyone veya @here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.
        \n\`⦁\` Eğer \`@Etkinlik Katılımcısı 🎉\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz.
        \n\`⦁\` Eğer \`@Çekiliş Katılımcısı 🎁\` Rolünü alırsanız sunucumuzda sıkça  vereceğimiz Nitro.Spotify,Netflix,Deezer,Exxen ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 
        \n\`⦁\` Eğer \`@Vampir Köylü\` Rolünü alırsanız sunucumuzda sıkça oynadığımız Vampir Köylü etkinliklerinden haberdar olabilirsiniz.
        \n\`⦁\` Eğer \`@Doğruluk Cesaret\` Rolünü alırsanız sunucumuzda sıkça oynadığımız Doğruluk Mu? Cesaretlik Mi? etkinliklerinden haberdar olabilirsiniz.
        \n\`NOT :\` **Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.**`,
        {
          buttons: [ck, ek, vk, dc]
        });
    }
    if (args[0] === "burç" || args[0] === "b") {
      let koc = new disbut.MessageButton().setStyle('green').setLabel('♈').setID('koc')
      let boga = new disbut.MessageButton().setStyle('green').setLabel('♉').setID('boga')
      let ikizler = new disbut.MessageButton().setStyle('green').setLabel('♊').setID('ikizler')
      let yengec = new disbut.MessageButton().setStyle('green').setLabel('♋').setID('yengec')
      let aslan = new disbut.MessageButton().setStyle('green').setLabel('♌').setID('aslan')
      let basak = new disbut.MessageButton().setStyle('green').setLabel('♍').setID('basak')
      let terazi = new disbut.MessageButton().setStyle('green').setLabel('♎').setID('terazi')
      let akrep = new disbut.MessageButton().setStyle('green').setLabel('♏').setID('akrep')
      let yay = new disbut.MessageButton().setStyle('green').setLabel('♐').setID('yay')
      let oglak = new disbut.MessageButton().setStyle('green').setLabel('♑').setID('oglak')
      let kova = new disbut.MessageButton().setStyle('green').setLabel('♒').setID('kova')
      let balık = new disbut.MessageButton().setStyle('green').setLabel('♓').setID('balık')
      let row1 = new disbut.MessageActionRow().addComponent(koc).addComponent(boga).addComponent(ikizler)
      let row2 = new disbut.MessageActionRow().addComponent(yengec).addComponent(aslan).addComponent(basak)
      let row3 = new disbut.MessageActionRow().addComponent(terazi).addComponent(akrep).addComponent(yay)
      let row4 = new disbut.MessageActionRow().addComponent(oglak).addComponent(kova).addComponent(balık)
      message.channel.send(`**Merhabalar arkadaşlar**, burç rolünüzü seçmek için aşağıdaki emojilerden herhangi birine basabilirsiniz. \`Etiket yemeyeceksiniz.\`
        \n \`♈\` : \`Koç\`\n \`♉\` : \`Boğa\`\n \`♊\` : \`İkizler\`\n \`♋\` : \`Yengeç\`\n \`♌\` : \`Aslan\`\n \`♍\` : \`Başak\`\n \`♎\` : \`Terazi\`\n \`♏\` : \`Akrep\`\n \`♐\` : \`Yay\`\n \`♑\` : \`Oğlak\`\n \`♒\` : \`Kova\`\n \`♓\` : \`Balık\``, { components: [row1, row2, row3, row4] });
    }
    if (args[0] === "game" || args[0] === "g") {
      let amongus = new disbut.MessageButton().setStyle('green').setLabel('🎮 Among Us').setID('amongus')
      let Rainbow = new disbut.MessageButton().setStyle('red').setLabel('🎮 Rainbow Six Siege').setID('Rainbow')
      let lol = new disbut.MessageButton().setStyle('red').setLabel('🎮 League of Legends').setID('lol')
      let Valorant = new disbut.MessageButton().setStyle('red').setLabel('🎮 Valorant').setID('Valorant')
      let CSGO = new disbut.MessageButton().setStyle('green').setLabel('🎮 CS:GO').setID('CSGO')
      let Minecraft = new disbut.MessageButton().setStyle('red').setLabel('🎮 Minecraft').setID('Minecraft')
      let Fortnite = new disbut.MessageButton().setStyle('red').setLabel('🎮 Fortnite').setID('Fortnite')
      let GTA = new disbut.MessageButton().setStyle('green').setLabel('🎮 GTA V').setID('GTA')
      let ML = new disbut.MessageButton().setStyle('red').setLabel('🎮 Mobile Legends').setID('ML')
      let satır1 = new disbut.MessageActionRow().addComponent(Rainbow).addComponent(amongus).addComponent(Valorant)
      let satır2 = new disbut.MessageActionRow().addComponent(lol).addComponent(CSGO).addComponent(Minecraft)
      let satır3 = new disbut.MessageActionRow().addComponent(ML).addComponent(GTA).addComponent(Fortnite)
      message.channel.send(`**Merhabalar arkadaşlar**, Oyun rolünüzü seçmek için aşağıdaki emojilerden herhangi birine basabilirsiniz. \`Etiket yemeyeceksiniz.\`
        \n \`🎮 Rainbow Six Siege\`\n \`🎮 Among Us\`\n \`🎮 Valorant\`\n \`🎮 League of Legends\`\n \`🎮 CS:GO\`\n \`🎮 Minecraft\`\n \`🎮 Mobile Legends\`\n \`🎮 GTA V\`\n \`🎮 Fortnite\``,
        { components: [satır1, satır2, satır3] })
    }
    if (args[0] === "ilişki" || args[0] === "i") {
      let lovers = new disbut.MessageButton().setStyle('red').setLabel('💖').setID('lovers')
      let alone = new disbut.MessageButton().setStyle('green').setLabel('💔').setID('alone')
      let LGBT = new disbut.MessageButton().setStyle('blurple').setLabel('💙').setID('LGBT')
      let uzak = new disbut.MessageButton().setStyle('gray').setLabel('🖤').setID('uzak')
      message.channel.send(`**Merhabalar arkadaşlar**, ilişki rolünüzü seçmek için aşağıdaki emojilerden herhangi birine basabilirsiniz. \`Etiket yemeyeceksiniz.\`
        \n 💖 : \`Lovers\`\n 💔 : \`Alone\`\n 💙 : \`LGBT\`\n 🖤 : \`I do not need anyone\``,
        { buttons: [lovers, alone, LGBT, uzak] });
    }
    if (args[0] === "panel" || args[0] === "p") {
      let a = new disbut.MessageButton().setStyle('blurple').setLabel('1').setID('a')
      let b = new disbut.MessageButton().setStyle('blurple').setLabel('2').setID('b')
      let c = new disbut.MessageButton().setStyle('blurple').setLabel('3').setID('c')
      let d = new disbut.MessageButton().setStyle('blurple').setLabel('4').setID('d')
      let e = new disbut.MessageButton().setStyle('blurple').setLabel('5').setID('e')
      let f = new disbut.MessageButton().setStyle('blurple').setLabel('6').setID('f')
      let g = new disbut.MessageButton().setStyle('red').setLabel('❌').setID('g')
      let h = new disbut.MessageButton().setStyle('gray').setLabel('🔔').setID('h')
      let ı = new disbut.MessageButton().setStyle('green').setLabel('📜').setID('ı')
      let ırezbız1 = new disbut.MessageActionRow().addComponent(a).addComponent(b).addComponent(c)
      let ırezbız2 = new disbut.MessageActionRow().addComponent(d).addComponent(e).addComponent(f)
      let ırezbız3 = new disbut.MessageActionRow().addComponent(g).addComponent(h).addComponent(ı)
      message.channel.send(`Aşağıdaki menüden kendinize bir işlem seçip sunucu içi depolanan verilerinizi sorgulayabilirsiniz. Verileriniz sadece sizin görebileceğiniz şekilde gönderilir.
      
    • 1 : Sunucuya giriş tarihinizi öğrenin.
    • 2 : Veri tabanındaki eski isimlerinizi görüntüleyin.
    • 3 : Devam eden cezanız (varsa) hakkında bilgi alın.
  
    • 4 : Davet bilgileriniz hakkında bilgi alın.
    • 5 : Üstünüzde bulunan rollerin listesini alın.
    • 6 : Hesabınızın açılış tarihini öğrenin.

    • ❌ : Kaydınızı temizletin ve yeniden kayıt olun.
    • 🔔 : Kendi istatistiklerinizi görüntüleyin.
    • 📜 : Sunucunun istatisliklerini görüntüleyin.`,
        { components: [ırezbız1, ırezbız2, ırezbız3] });
    }
    if (args[0] === "info" || args[0] === "help") {
      message.channel.send(`Aşşağıda bu komutun yardım komudu yer almaktadır. Kurulum için <@!${conf.botOwner}>' e ulaşın.`, 
      embed
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setTitle(`Komut Kullanım Şekilleri`)
      .setColor(conf.colors.renk_mor)
      .setDescription(`
      \`•\` **Emoji kurulumu** yapılmadıysa \`${prefix}oxypanel emoji\` 
      \`•\` **Katılımcı kurulumu** yapılmadıysa \`${prefix}oxypanel katılımcı\` 
      \`•\` **Burç kurulumu** yapılmadıysa \`${prefix}oxypanel burç\`
      \`•\` **Oyun kurulumu** yapılmadıysa \`${prefix}oxypanel game\`
      \`•\` **İlişki kurulumu** yapılmadıysa \`${prefix}oxypanel ilişki\`
      \`•\` **Panel kurulumu** yapılmadıysa \`${prefix}oxypanel panel\`
      \`•\` **Sunucu kurulumu** yapılmadıdıysa \`${prefix}oxypanel guildCreate\`
      \`•\` **Rol kurulumu** yapılmadıdıysa \`${prefix}oxypanel rolKurulum\`
      \`•\` **Log kurulumu** yapılmadıysa \`${prefix}oxypanel logKurulum\`
      \`•\` **Register** Komutları için  \`${prefix}oxypanel register help\` 
      \`•\` **Cezalandırma** Komutları için \`${prefix}oxypanel penals help\``));
    }
    if (args[0] === "register" || args[0] === "reg") {
      registerRoleConfig.forEach(async (x) => {
      if(args[1] == x.name) {
        let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(oxy => oxy.name === args.join(" "));
        let db = penalsConfig.get(`${x.conf}`)
        if (rol) {
          if (db.some(oxy => oxy.includes(rol.id))) {
            penalsConfig.pull(`${x.conf}` , rol.id)
            message.channel.send(embed.setDescription(`${rol} ${x.cmdname} listeden başarıyla **kaldırıldı!**`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
          } else {
            penalsConfig.push(`${x.conf}` , rol.id)
            message.channel.send(embed.setDescription(`${rol} ${x.cmdname} listeye başarıyla **eklendi!**`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
          }
        } else return message.channel.send(embed.setDescription(`${x.cmdname} Olarak Giriceğiniz Rolü Belirtin. \nÖrnek: \`${prefix}oxypanel register ${x.name} [@OxY/ID]\``).addField(`${x.cmdname} listesi:`, db.length > 0 ? db.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `<@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `<@&${oxy}>`).join('\n') : "`Listede Rol Bulunmuyor.`"));
      }
      });    
      registerChannelConfig.forEach(async (x) => {
        if(args[1] == x.name) {
          let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(oxy => oxy.name === args.join(" "));
          let db = penalsConfig.get(`${x.conf}`)
          if (channel) {
            if (db == channel.id) {
              message.channel.send(embed.setDescription(`${channel.toString()} Bu kanal zaten listede bulunuyor.`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
            } else {
              penalsConfig.set(`${x.conf}`, channel.id)
              message.channel.send(embed.setDescription(`${channel} ${x.cmdname} listeye başarıyla **eklendi!**`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
            }
          } else return message.channel.send(embed.setDescription(`${x.cmdname} Olarak Giriceğiniz Kanalı Belirtin. \nÖrnek: \`${prefix}oxypanel register ${x.name} [@OxY/ID]\``).addField(`${x.cmdname}:`, db.length > 0 ? `<#${db}>` : "`Listede Kanal Bulunmuyor.`"));
        }
      })
      if (args[1] === "help" || args[1] === "yardım") {
        let vocalRole = conf.specialRoles.vokal || [];
        let sponsorRole = conf.specialRoles.sponsor || [];
        let envoyRole = conf.specialRoles.envoy || [];
        let streamerRole = conf.specialRoles.streamer || [];
        let designer = conf.specialRoles.ressam || [];
        let special = conf.specialRoles.vip || [];
        let unregRoles = conf.registration.unregRoles || [];
        let staffs = conf.registration.staffs || [];
        let womanRoles = conf.registration.womanRoles || [];
        let manRoles = conf.registration.manRoles || [];
        let channel = conf.registration.channel || [];
        let voiceChannel = conf.registration.voiceChannel || [];
        let inviteChannel = conf.invite.channel || [];
            message.channel.send(`Aşşağıda bu komutun yardım komudu yer almaktadır. Kurulum için <@!${conf.botOwner}>' e ulaşın.`, 
            embed.setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor(conf.colors.renk_mor).setDescription(`
              **Rol ayarları :**
               \`•\` ${prefix}oxypanel register manRoles **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register womanRoles **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register unregister **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register staff **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register special **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register ressam **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register streamer **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register envoy **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register sponsor **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register vocal **[@OxY/ID]**
               
               **Kanal Ayarları :**
               \`•\` ${prefix}oxypanel register channel **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register voiceChannel **[@OxY/ID]**
               \`•\` ${prefix}oxypanel register invChannel **[@OxY/ID]**`)
       .addField(`\`Erkek Rolleri :\``, manRoles.length > 0 ? manRoles.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Kadın Rolleri :\``, womanRoles.length > 0 ? womanRoles.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Kayıtsız Rolleri :\``, unregRoles.length > 0 ? unregRoles.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Yetkili Rolleri :\``, staffs.length > 0 ? staffs.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Vip Rolleri :\``, special.length > 0 ? special.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Ressam Rolleri :\``, designer.length > 0 ? designer.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Streamer Rolleri :\``, streamerRole.length > 0 ? streamerRole.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Envoy Rolleri :\``, envoyRole.length > 0 ? envoyRole.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Sponsor Rolleri :\``, sponsorRole.length > 0 ? sponsorRole.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Vocal Rolleri :\``, vocalRole.length > 0 ? vocalRole.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `${emojis.tik} <@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `${emojis.tik} <@&${oxy}>`).join('\n') : `${emojis.carp} \`Listede Rol Bulunmuyor.\``,true)
       .addField(`\`Welcome Kanalı :\``, channel.length > 0 ? `<#${channel}>` : "`Listede Kanal Bulunmuyor.`",true)
       .addField(`\`Welcome Sesli Kanalı :\``, voiceChannel.length > 0 ? `<#${voiceChannel}>` : "`Listede Kanal Bulunmuyor.`",true)
       .addField(`\`Davet Kanalı :\``, inviteChannel.length > 0 ? `<#${inviteChannel}>` : "`Listede Kanal Bulunmuyor.`",true)
            )}
    }
    if (args[0] === "penals" || args[0] === "ceza") {
      if (args[1] === "help" || args[1] === "yardım") {
        let info = new disbut.MessageButton().setStyle('gray').setLabel('İnfo/Bilgi📝').setID('kurulumİnfo')
        message.channel.send( 
        embed.setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor(conf.colors.renk_mor).setDescription(`
          **Yetkili rol ayarları :**
           \`•\` ${prefix}oxypanel penals banStaffs **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals jailStaffs **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals cMutedStaffs **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals vMutedStaffs **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals adsStaffs **[@OxY/ID]**

           **Rol ayarları :**
           \`•\` ${prefix}oxypanel penals jailRoles **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals cMutedRoles **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals vMutedRoles **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals adsRoles **[@OxY/ID]**
           
           **Kanal Ayarları :**
           \`•\` ${prefix}oxypanel penals banChannel **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals jailChannel **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals cMuteChannel **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals vMuteChannel **[@OxY/ID]**
           \`•\` ${prefix}oxypanel penals adsChannel **[@OxY/ID]**

           **Limit Ayarları :**
           \`•\` ${prefix}oxypanel penals banLimit **[0-100]**
           \`•\` ${prefix}oxypanel penals jailLimit **[0-100]**
           \`•\` ${prefix}oxypanel penals cMuteLimit **[0-100]**
           \`•\` ${prefix}oxypanel penals vMuteLimit **[0-100]**
           \`•\` ${prefix}oxypanel penals adsLimit **[0-100]**
   `),{ buttons: [info] })
      }
      penalsRolesConfig.forEach(async (x) => {
        if(args[1] == x.name) {
          let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(oxy => oxy.name === args.join(" "));
          let db = penalsConfig.get(`${x.conf}`)
          if (rol) {
            if (db.some(oxy => oxy.includes(rol.id))) {
              penalsConfig.pull(`${x.conf}` , rol.id)
              message.channel.send(embed.setDescription(`${rol} ${x.cmdname} listeden başarıyla **kaldırıldı!**`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
            } else {
              penalsConfig.push(`${x.conf}` , rol.id)
              message.channel.send(embed.setDescription(`${rol} ${x.cmdname} listeye başarıyla **eklendi!**`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
            }
          } else return message.channel.send(embed.setDescription(`${x.cmdname} Olarak Giriceğiniz Rolü Belirtin. \nÖrnek: \`${prefix}oxypanel penals ${x.name} [@OxY/ID]\``).addField(`${x.cmdname} listesi:`, db.length > 0 ? db.map(oxy => (message.guild.roles.cache.has(oxy.slice(1))) ? `<@&${message.guild.roles.cache.get(oxy.slice(1))}>` : `<@&${oxy}>`).join('\n') : "`Listede Rol Bulunmuyor.`"));
        }
        });
        penalsChannelConfig.forEach(async (x) => {
          if(args[1] == x.name) {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(oxy => oxy.name === args.join(" "));
            let db = penalsConfig.get(`${x.conf}`)
            if (channel) {
              if (db == channel.id) {
                message.channel.send(embed.setDescription(`${channel.toString()} Bu kanal zaten listede bulunuyor.`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
              } else {
                penalsConfig.set(`${x.conf}`, channel.id)
                message.channel.send(embed.setDescription(`${channel} ${x.cmdname} listeye başarıyla **eklendi!**`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
              }
            } else return message.channel.send(embed.setDescription(`${x.cmdname} Olarak Giriceğiniz Kanalı Belirtin. \nÖrnek: \`${prefix}oxypanel penals ${x.name} [@OxY/ID]\``).addField(`${x.cmdname}:`, db.length > 0 ? `<#${db}>` : "`Listede Kanal Bulunmuyor.`"));
          }
        })
        penalsLimitConfig.forEach(async (x) => {
          if(args[1] == x.name) {
            let limit = args[2];
            let db = penalsConfig.get(`${x.conf}`)
            if (!isNaN(limit)) {
              if (x.limit == limit) {
                message.channel.send(embed.setDescription(`${limit} Bu limit zaten listede bulunuyor.`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
              } else {
                penalsConfig.set(`${x.conf}`, limit)
                message.channel.send(embed.setDescription(`${limit} ${x.cmdname} listeye başarıyla **eklendi!**`)).then(oxy => oxy.delete({ timeout: 10000 }) && message.react(emojis.green));
              }
            } else return message.channel.send(embed.setDescription(`${x.cmdname} Olarak Giriceğiniz Limit Belirtin. \nÖrnek: \`${prefix}oxypanel penals ${x.name} [@OxY/ID]\``).addField(`${x.cmdname}:`, db.length > 0 ? `<#${db}>` : "`Listede Kanal Bulunmuyor.`"));
          }
        })
    }
  },
};
const serverEmojis = [
  { name: "ates", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439806018879488/ates.gif" },
  { name: "tacc", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439808544243762/tacc.gif" },
  { name: "sonsuzkalp", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439863346364436/sonsuzkalp.gif" },
  { name: "star", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439871505072178/star.gif" },
  { name: "red", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439875170500629/red.gif" },
  { name: "green", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439878664486913/green.gif" },
  { name: "coin", url: "https://cdn.discordapp.com/attachments/827439712834158622/861702995371884634/coin.gif" },
  { name: "selfMute", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788856373190696/863339054744469515.png" },
  { name: "serverMute", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788891156578384/909831494908932166.png" },
  { name: "selfDeaf", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788861901303838/897615532856057916.png" },
  { name: "serverDeaf", url: "https://cdn.discordapp.com/attachments/910788803747270657/910791914809331752/909831522134134894.png" },
  { name: "openMute", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788859615399936/873236218605883392.png" },
  { name: "openDeaf", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788863956488232/901829761310003230.png" },
  { name: "openStream", url: "https://cdn.discordapp.com/attachments/910788803747270657/910791382199832606/images-removebg-preview_4.png" },
  { name: "closeStream", url: "https://cdn.discordapp.com/attachments/910788803747270657/910791417100660736/462620-200-removebg-preview.png" },
  { name: "announcement", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788955379744768/oxy_emojis_6.png" },
  { name: "diamondHeart", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788929907732490/gehenna_witcher_1_1.png" },
  { name: "diamondIcon", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788861033086976/893410795080265778_3.png" },
  { name: "chatMute", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788854968107028/839087750753681438.png" },
  { name: "security", url: "https://cdn.discordapp.com/attachments/910788803747270657/910794599151329320/905940386097287238.png" },
  { name: "tik", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788990351843368/utopia_emojis_9.gif" },
  { name: "carp", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788858814267392/871431118149263361.gif" },
  { name: "welcomeTada", url: "https://cdn.discordapp.com/attachments/910788803747270657/910801060250157086/907342218950496296.gif" },
  { name: "welcomeOne", url: "https://cdn.discordapp.com/attachments/910788803747270657/910800736865112074/oxynin_animeleri_15.gif" },
  { name: "welcomeTwo", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788928703963136/gehenna_tatli_45.gif" },
  { name: "welcomeThree", url: "https://cdn.discordapp.com/attachments/910788803747270657/910799752591978536/oxynin_animeleri_9.gif" },
  { name: "welcomeFour", url: "https://cdn.discordapp.com/attachments/910788803747270657/910788928053854278/gehenna_tatli_32.gif" },
  { name: "inviteStar", url: "https://cdn.discordapp.com/attachments/910788803747270657/919997491854868510/871820474211004476.gif" },
  { name: "statEmote", url: "https://cdn.discordapp.com/attachments/910788803747270657/910814556316663829/910071053248770078.png" },
  { name: "open", url: "https://cdn.discordapp.com/attachments/910788803747270657/911193486521401354/910598035044696134.png" },
  { name: "close", url: "https://cdn.discordapp.com/attachments/910788803747270657/911193486747910164/910598039306121307.png" },
  { name: "join", url: "https://cdn.discordapp.com/attachments/916622527156076594/929653352541847572/7962_arrow_join.png" },
  { name: "leave", url: "https://cdn.discordapp.com/attachments/916622527156076594/929653422960025630/images-removebg-preview_5.png" },
  { name: "oxyuser", url: "https://cdn.discordapp.com/attachments/910788803747270657/954648813279252500/932282826030743582.png" },
  { name: "oxytaggeds", url: "https://cdn.discordapp.com/attachments/910788803747270657/954648812813688862/926420103539593246.png" },
  { name: "oxybooster", url: "https://cdn.discordapp.com/attachments/910788803747270657/954648812998242314/932282825657446421.png" },
  { name: "oxyvoice", url: "https://cdn.discordapp.com/attachments/910788803747270657/954648813539319859/932282826206904340.png" },
  { name: "oxylink", url: "https://cdn.discordapp.com/attachments/910788803747270657/910945113507762288/901887875891752981.png" },
  { name: "oxytrash", url: "https://cdn.discordapp.com/attachments/910788803747270657/910945327366955068/897188574347296828.png" },
  { name: "oxygift", url: "https://cdn.discordapp.com/attachments/910788803747270657/910945113088348170/901887438115467304.png" },
  { name: "oxypc", url: "https://cdn.discordapp.com/attachments/910788803747270657/910945327761199124/893023470961692722.png" },
];
const numEmojis = [
  { name: "0emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439854140915753/0emoji.gif" },
  { name: "1emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439866211074068/1emoji.gif" },
  { name: "2emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439821433470976/2emoji.gif" },
  { name: "3emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439820543492116/3emoji.gif" },
  { name: "4emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439817650208810/4emoji.gif" },
  { name: "5emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439816425603122/5emoji.gif" },
  { name: "6emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439814600425502/6emoji.gif" },
  { name: "7emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439814047039508/7emoji.gif" },
  { name: "8emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439812796612618/8emoji.gif" },
  { name: "9emoji", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439809391362058/9emoji.gif" }
];
const roles = [
  { name: "Legion Her Daim.", color: "#6182e1" },
  { name: "▬▬▬▬▬▬▬▬▬▬", color: "#f8f8f8" },
  { name: "♈ | Koç", color: "#00fff8" },
  { name: "♊ | İkizler", color: "#00fff8" },
  { name: "♋ | Yengeç", color: "#00fff8" },
  { name: "♌ | Aslan", color: "#00fff8" },
  { name: "♍ | Başak", color: "#00fff8" },
  { name: "♎ | Terazi", color: "#00fff8" },
  { name: "♏ | Akrep", color: "#00fff8" },
  { name: "♉ | Boğa", color: "#00fff8" },
  { name: "♐ | Yay", color: "#00fff8" },
  { name: "♑ | Oğlak", color: "#00fff8" },
  { name: "♒ | Kova", color: "#00fff8" },
  { name: "♓ | Balık", color: "#00fff8" },
  { name: "▬▬▬▬▬▬▬▬▬▬", color: "#f8f8f8" },
  { name: "Çekiliş Katılımcısı", color: "#0c0c0c" },
  { name: "Etkinlik Katılımcısı", color: "#0c0c0c" },
  { name: "Vampir Köylü", color: "#00ff32" },
  { name: "Doğruluk Cesaret", color: "#00ff32" },
  { name: "▬▬▬▬▬▬▬▬▬▬", color: "#f8f8f8" },
  { name: "LGBT", color: "#00c8ff" },
  { name: "Sevgilim Var", color: "#ff0000" },
  { name: "Sevgilim Yok", color: "#050505" },
  { name: "İlişki Yapmıyorum", color: "#fcfffd" },
  { name: "▬▬▬▬▬▬▬▬▬▬", color: "#f8f8f8" },
];
let modChannels = [
  { name: "legion-destiny", type: "text" },
  { name: "l-tag", type: "text" },
  { name: "l-blacklist", type: "text" },
  { name: "l-role", type: "text" },
  { name: "l-ceza", type: "text" },
  { name: "l-rank", type: "text" },
  { name: "l-message", type: "text" },
  { name: "l-voice-log", type: "text" },
  { name: "l-join-leave", type: "text" },
  { name: "l-cmds", type: "text" },
  { name: "Legion Destiny", type: "voice" },
];
let guardChannels = [
  { name: "l-database", type: "text" },
  { name: "l-cmds", type: "text" },
  { name: "l-guard-1", type: "text" },
  { name: "l-guard-2", type: "text" },
  { name: "l-guard-3", type: "text" },
];
let sellectChannels = [
  { name: "kullanıcı-panel", type: "text" },
  { name: "burç-seçim", type: "text" },
  { name: "ilişki-seçim", type: "text" },
  { name: "renk-seçim", type: "text" },
  { name: "oyun-seçim", type: "text" },
];
let registerRoleConfig = [
  { name: "manRoles", conf: "registration.manRoles", cmdname: "Erkek rolü" , type: "role" },
  { name: "womanRoles", conf: "registration.womanRoles", cmdname: "Kadın rolü" , type: "role" },
  { name: "staff", conf: "registration.staffs", cmdname: "Yetkili rolü" , type: "role" },
  { name: "unregister", conf: "registration.unregRoles", cmdname: "Kayıtsız rolü" , type: "role" },
  { name: "special", conf: "specialRoles.vip", cmdname: "Vip rolü" , type: "role" },
  { name: "ressam", conf: "specialRoles.ressam", cmdname: "Ressam rolü" , type: "role" },
  { name: "envoy", conf: "specialRoles.envoy", cmdname: "Envoy rolü" , type: "role" },
  { name: "sponsor", conf: "specialRoles.sponsor", cmdname: "Sponsor rolü" , type: "role" },
  { name: "vokal", conf: "specialRoles.vokal", cmdname: "Vokal rolü" , type: "role" },
  { name: "streamer", conf: "specialRoles.streamer", cmdname: "Streamer rolü" , type: "role" },
];
let registerChannelConfig = [
  { name: "channel", conf: "registration.channel", cmdname: "Welcome kanalı" , type: "channel" },
  { name: "invChannel", conf: "invite.channel", cmdname: "İnvite kanalı" , type: "channel" },
  { name: "invLog", conf: "invite.log", cmdname: "İnvite Log kanalı" , type: "channel" },
  { name: "voiceChannel", conf: "registration.voiceChannel", cmdname: "Welcome Sesli kanalı" , type: "channel" },
];
let penalsRolesConfig = [
  { name: "banStaffs", conf: "penals.ban.staffs", cmdname: "Ban yetkili rolü" , type: "role" },
  { name: "jailStaffs", conf: "penals.jail.staffs", cmdname: "Karantina yetkili rolü" , type: "role" },
  { name: "jailRoles", conf: "penals.jail.roles", cmdname: "Karantina rolü" , type: "role" },
  { name: "cMutedStaffs", conf: "penals.chatMute.staffs", cmdname: "Chat Mute yetkili rolü" , type: "role" },
  { name: "cMutedRoles", conf: "penals.chatMute.roles", cmdname: "Chat Mute rolü" , type: "role" },
  { name: "vMutedStaffs", conf: "penals.voiceMute.staffs", cmdname: "Voice Mute yetkili rolü" , type: "role" },
  { name: "vMutedRoles", conf: "penals.voiceMute.roles", cmdname: "Voice Mute rolü" , type: "role" },
  { name: "adsStaffs", conf: "penals.reklam.staffs", cmdname: "ADS yetkili rolü" , type: "role" },
  { name: "adsRoles", conf: "penals.reklam.roles", cmdname: "ADS rolü" , type: "role" },
];
let penalsChannelConfig = [
  { name: "banChannel", conf: "penals.ban.log", cmdname: "Ban log kanalı" , type: "channel" },
  { name: "jailChannel", conf: "penals.jail.log", cmdname: "Jail log kanalı" , type: "channel" },
  { name: "cMuteChannel", conf: "penals.chatMute.log", cmdname: "Chat Mute log kanalı" , type: "channel" },
  { name: "vMuteChannel", conf: "penals.voiceMute.log", cmdname: "Voice Mute log kanalı" , type: "channel" },
  { name: "adsChannel", conf: "penals.reklam.log", cmdname: "ADS log kanalı" , type: "channel" },
];
let penalsLimitConfig = [
  { name: "banLimit", conf: "penals.ban.limit", cmdname: "Ban limidi" , type: "limit" },
  { name: "jailLimit", conf: "penals.jail.limit", cmdname: "Jail limidi" , type: "limit" },
  { name: "cMuteLimit", conf: "penals.chatMute.limit", cmdname: "Chat Mute limidi" , type: "limit" },
  { name: "vMuteLimit", conf: "penals.voiceMute.limit", cmdname: "Voice Mute limidi" , type: "limit" },
  { name: "adsLimit", conf: "penals.reklam.limit", cmdname: "ADS limidi" , type: "limit" },
];