const conf = require("../configs/config.json");
const { asd } = require("../configs/config.json");
const moment = require('moment');
moment.locale("tr");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");

/**
 * @param { Client } client
 */

module.exports = async (button) => {
    if (button.id === 'ck') {
        let role = button.guild.roles.cache.find(x => x.name === `Çekiliş Katılımcısı`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("Çekiliş Katılımcısı rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("Çekiliş Katılımcısı rolü üzerinize verildi.")
        }
    }
    if (button.id === 'ek') {
        let role = button.guild.roles.cache.find(x => x.name === `Etkinlik Katılımcısı`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("Etkinlik Katılımcısı rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("Etkinlik Katılımcısı rolü üzerinize verildi.")
        }
    }
    if (button.id === 'vk') {
        let role = button.guild.roles.cache.find(x => x.name === `Vampir Köylü`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("Vampir Köylü rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("Vampir Köylü rolü üzerinize verildi.")
        }
    }
    if (button.id === 'dc') {
        let role = button.guild.roles.cache.find(x => x.name === `Doğruluk Cesaret`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("Doğruluk Cesaret rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("Doğruluk Cesaret rolü üzerinize verildi.")
        }
    }

    if (button.id === 'koc') {
        let role = button.guild.roles.cache.find(x => x.name === `♈ | Koç`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♈ Koç rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♈ Koç rolü üzerinize verildi.")
        }
    }
    if (button.id === 'boga') {
        let role = button.guild.roles.cache.find(x => x.name === `♉ | Boğa`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♉ Boğa rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♉ Boğa rolü üzerinize verildi.")
        }
    }
    if (button.id === 'ikizler') {
        let role = button.guild.roles.cache.find(x => x.name === `♊ | İkizler`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♊ İkizler rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♊ İkizler rolü üzerinize verildi.")
        }
    }
    if (button.id === 'yengec') {
        let role = button.guild.roles.cache.find(x => x.name === `♋ | Yengeç`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♋ Yengeç rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♋ Yengeç rolü üzerinize verildi.")
        }
    }
    if (button.id === 'aslan') {
        let role = button.guild.roles.cache.find(x => x.name === `♌ | Aslan`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♌ Aslan rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♌ Aslan rolü üzerinize verildi.")
        }
    }
    if (button.id === 'basak') {
        let role = button.guild.roles.cache.find(x => x.name === `♍ | Başak`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♍ | Başak rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♍ | Başak rolü üzerinize verildi.")
        }
    }
    if (button.id === 'terazi') {
        let role = button.guild.roles.cache.find(x => x.name === `♎ | Terazi`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♎ Terazi rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♎ Terazi rolü üzerinize verildi.")
        }
    }
    if (button.id === 'akrep') {
        let role = button.guild.roles.cache.find(x => x.name === `♏ | Akrep`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♏ Akrep rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♏ Akrep rolü üzerinize verildi.")
        }
    }
    if (button.id === 'yay') {
        let role = button.guild.roles.cache.find(x => x.name === `♐ | Yay`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♐ Yay rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♐ Yay rolü üzerinize verildi.")
        }
    }
    if (button.id === 'oglak') {
        let role = button.guild.roles.cache.find(x => x.name === `♑ | Oğlak`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♑ Oğlak rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♑ Oğlak rolü üzerinize verildi.")
        }
    }
    if (button.id === 'kova') {
        let role = button.guild.roles.cache.find(x => x.name === `♒ | Kova`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♒ Kova rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♒ Kova rolü üzerinize verildi.")
        }
    }
    if (button.id === 'balık') {
        let role = button.guild.roles.cache.find(x => x.name === `♓ | Balık`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("♓ Balık rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("♓ Balık rolü üzerinize verildi.")
        }
    }

    if (button.id === 'lovers') {
        let role = button.guild.roles.cache.find(x => x.name === `💖 Lovers`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("💖 Lovers rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("💖 Lovers rolü üzerinize verildi.")
        }
    }
    if (button.id === 'alone') {
        let role = button.guild.roles.cache.find(x => x.name === `💔 Alone`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("💔 Alone rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("💔 Alone rolü üzerinize verildi.")
        }
    }
    if (button.id === 'LGBT') {
        let role = button.guild.roles.cache.find(x => x.name === `💙 LGBT`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("💙 LGBT rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("💙 LGBT rolü üzerinize verildi.")
        }
    }
    if (button.id === 'uzak') {
        let role = button.guild.roles.cache.find(x => x.name === `🖤 Sevgili yapmıyorum`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🖤 Sevgili yapmıyorum rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🖤 Sevgili yapmıyorum rolü üzerinize verildi.")
        }
    }

    if (button.id === 'amongus') {
        let role = button.guild.roles.cache.find(x => x.name === `🎮 Among Us`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Among Us rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Among Us rolü üzerinize verildi.")
        }
        
    }
    if (button.id === 'Rainbow') {
        let role = button.guild.roles.cache.find(x => x.name === `🎮 Rainbow Six Siege`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Rainbow Six Siege rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Rainbow Six Siege rolü üzerinize verildi.")
        }
    }
    if (button.id === 'lol') {
        let role = button.guild.roles.cache.find(x => x.name === `🎮 League of Legends`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 League of Legends rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 League of Legends rolü üzerinize verildi.")
        }
    }
    if (button.id === 'Valorant') {
        let role = button.guild.roles.cache.find(x => x.name === `🎮 Valorant`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Valorant rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Valorant rolü üzerinize verildi.")
        }
    }
    if (button.id === 'CSGO') {
        let role = button.guild.roles.cache.find(x => x.name === `🎮 CS:GO`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 CS:GO rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 CS:GO rolü üzerinize verildi.")
        }
    }
    if (button.id === 'Minecraft') {
        let role = button.guild.roles.cache.find(x => x.name === `🎮 Minecraft`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Minecraft rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Minecraft rolü üzerinize verildi.")
        }
    }
    if (button.id === 'Fortnite') {
        let role = button.guild.roles.cache.find(x => x.name === `🎮 Fortnite`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Fortnite rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Fortnite rolü üzerinize verildi.")
        }
    }
    
    if (button.id === 'GTA') {
        let role = button.guild.roles.cache.find(x => x.name === `🎮 GTA V`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 GTA V rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 GTA V yapmıyorum rolü üzerinize verildi.")
        }
    }
    if (button.id === 'ML') {
        let role = button.guild.roles.cache.find(x => x.name === `🎮 Mobile Legends`)
        if (button.clicker.member.roles.cache.get(role)) {
            await button.clicker.member.roles.remove(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Mobile Legends rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(role);
            await button.reply.think(true);
            await button.reply.edit("🎮 Mobile Legends rolü üzerinize verildi.")
        }
    }
};

module.exports.conf = {
  name: "clickButton"
};
