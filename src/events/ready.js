const CronJob = require("cron").CronJob;
const client = global.client;
const regstats = require("../schemas/registerStats");
const conf = require("../configs/config.json");
const penals = require("../schemas/penals");
const tasks = require("../schemas/task");
const messageGuild = require("../schemas/messageGuild");
const voiceGuild = require("../schemas/voiceGuild");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const { MessageEmbed } = require("discord.js");
/**
 * @param { Client } client
 * @returns {Promise<void>}
 */

module.exports = async () => {
  setInterval(async () => client.guilds.cache.forEach(async (guild) => await tasks.findOneAndUpdate({ guildID: guild.id, active: true, finishDate: { $lte: Date.now() } }, { active: false })), 1000 * 60 * 60);

  const daily = new CronJob("00 00 00 * * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      await messageGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
      await voiceUser.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
    });
  }, null, true, "Europe/Istanbul");
  daily.start();

  const weekly = new CronJob("00 00 00 * * 0", () => {
    client.guilds.cache.forEach(async (guild) => {
      await messageGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
      await voiceUser.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
    });
  }, null, true, "Europe/Istanbul");
  weekly.start();

  const twoWeekly = new CronJob("00 00 00 * * 0/2", () => {
    client.guilds.cache.forEach(async (guild) => {
      await messageGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
      await voiceUser.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
    });
  }, null, true, "Europe/Istanbul");
  twoWeekly.start();

  const dailys = new CronJob("0 0 * * *", () => client.guilds.cache.forEach(async (guild) => await regstats.findOneAndUpdate({ guildID: guild.id }, { $set: { topGuild24: 0, top24: 0, erkek24: 0, kız24: 0 } })), null, true, "Europe/Istanbul");
  dailys.start();
  const weeklys = new CronJob("0 0 * * 0", () => client.guilds.cache.forEach(async (guild) => await regstats.findOneAndUpdate({ guildID: guild.id }, { $set: { topGuild7: 0, top7: 0, erkek7: 0, kız7: 0 } })), null, true, "Europe/Istanbul");
  weeklys.start();
  const twoWeeklys = new CronJob("0 0 1,15 * *", () => client.guilds.cache.forEach(async (guild) => await regstats.findOneAndUpdate({ guildID: guild.id }, { $set: { top14: 0, erkek14: 0, kız14: 0 } })), null, true, "Europe/Istanbul");
  twoWeeklys.start();

  //client.guilds.cache.forEach(async (guild) => {
    //const invites = await guild.fetchInvites();
    //client.invites.set(guild.id, invites);
  //});

  setInterval(async () => {
    const guild = client.guilds.cache.get(conf.guildID);
    if (!guild) return;
    const finishedPenals = await penals.find({ guildID: guild.id, active: true, temp: true, finishDate: { $lte: Date.now() } });
    finishedPenals.forEach(async (x) => {
      const member = guild.members.cache.get(x.userID);
      if (!member) return;
      if (x.type === "CHAT-MUTE") {
        x.active = false;
        await x.save();
        await member.roles.remove(conf.penals.chatMute.roles);
        client.channels.cache.get(conf.penals.chatMute.log).send(new MessageEmbed().setColor("GREEN").setDescription(`${member.toString()} üyesinin susturulması, süresi bittiği için kaldırıldı!`));
      }
      if (x.type === "TEMP-JAIL") {
        x.active = false;
        await x.save();
        await member.setRoles(conf.registration.unregRoles);
        client.channels.cache.get(conf.penals.jail.log).send(new MessageEmbed().setColor("GREEN").setDescription(`${member.toString()} üyesinin jaili, süresi bittiği için kaldırıldı!`));
      } 
      if (x.type === "VOICE-MUTE") {
        if (member.voice.channelID) {
          x.removed = true;
          await x.save();
          if (member.voice.serverMute) member.voice.setMute(false);
        }
        x.active = false;
        await x.save();
        member.roles.remove(conf.penals.voiceMute.roles);
        client.channels.cache.get(conf.penals.voiceMute.log).send(new MessageEmbed().setColor("GREEN").setDescription(`${member.toString()} üyesinin **sesli kanallarda** susuturulması, süresi bittiği için kaldırıldı!`));
      }
    });

    const activePenals = await penals.find({ guildID: guild.id, active: true });
    activePenals.forEach(async (x) => {
      const member = guild.members.cache.get(x.userID);
      if (!member) return;
      if (x.type === "CHAT-MUTE" && !conf.penals.chatMute.roles.some((x) => member.roles.cache.has(x))) return member.roles.add(conf.penals.chatMute.roles);
      if ((x.type === "JAIL" || x.type === "TEMP-JAIL") && !conf.penals.jail.roles.some((x) => member.roles.cache.has(x))) return member.setRoles(conf.penals.jail.roles);
      if (x.type === "VOICE-MUTE") {
        if (!conf.penals.voiceMute.roles.some((x) => member.roles.cache.has(x))) member.roles.add(conf.penals.voiceMute.roles);
        if (member.voice.channelID && !member.voice.serverMute) member.voice.setMute(true);
      }
    });
  }, 1000 * 5);

  setInterval(() => {
    const oxy = Math.floor(Math.random() * (conf.botConfig.game.length));
    client.user.setPresence({ activity: { name: conf.botConfig.game[oxy], type: conf.botConfig.type }, status: conf.botConfig.status })
    if (client.channels.cache.get(conf.VoiceChannelID)) client.channels.cache.get(conf.VoiceChannelID).join().then(e => {
        e.voice.setSelfDeaf(true);
    });
}, 10000);

  client.guilds.cache.forEach(async (guild) => {
    const invites = await guild.fetchInvites();
    client.invites.set(guild.id, invites);
  });
};

module.exports.conf = {
  name: "ready",
};
