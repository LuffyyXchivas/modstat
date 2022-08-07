const { GuildMember, TextChannel, MessageEmbed, Guild } = require("discord.js");
const { numEmojis, coin: coinEmoji } = require("../configs/emojis.json");
const conf = require("../configs/config.json");
const penals = require("../schemas/penals");
const task = require("../schemas/task");
const coin = require("../schemas/coin");
const iltifat = require("../configs/iltifat.json");

/**
 * @param {Client} client
 */
module.exports = async (client) => {

  /**
   * @param {String} userID
   * @returns {Promise<Message>}
   */
  client.fetchUser = async (userID) => {
    try {
      return await client.users.fetch(userID);
    } catch (err) {
      return undefined;
    }
  };
  /**
   * @param {String} guild
   * @param {String} userID
   * @returns {Promise<Message>}
   */
  client.fetchBan = async (guild, userID) => {
    try {
      return await guild.fetchBan(userID);
    } catch (err) {
      return undefined;
    }
  };

  /**
   * @param {Number} num
   * @returns {String}
   */
  client.numEmoji = (num) => num.toString().split("").map((x) => numEmojis[x] || x).join("");

  /**
   * @param {Number} ms
   * @returns {Promise<unknown>}
   */
  client.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * @param {String|Array} roles
   * @returns {Promise<any>}
   */
  GuildMember.prototype.setRoles = async function (roles) {
    if (!this.manageable) return;
    const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
    return this.roles.set(newRoles).catch(() => {});
  };

  /**
   * @param {String} guildID
   * @param {String} type
   * @param {Number} data
   * @param {TextChannel|VoiceChannel} channel
   * @returns {Promise<void>}
   */
  GuildMember.prototype.updateTask = async function (guildID, type, data, channel = null) {
    const taskData = await task.find({ guildID, userID: this.user.id, type, active: true });
    taskData.forEach(async (x) => {
      if (channel && x.channels && x.channels.some((x) => x !== channel.id)) return;
      x.completedCount += data;
      if (x.completedCount >= x.count) {
        x.active = false;
        x.completed = true;
        await coin.findOneAndUpdate({ guildID, userID: this.user.id }, { $inc: { coin: x.prizeCount } });

        const embed = new MessageEmbed().setColor(this.displayHexColor).setAuthor(this.displayName, this.user.avatarURL({ dynamic: true, size: 2048 })).setThumbnail("https://img.itch.zone/aW1nLzIzNzE5MzEuZ2lm/original/GcEpW9.gif");
        if (channel && channel.type === "text") channel.send(embed.setDescription(`
				${this.toString()} Tebrikler! ${type.charAt(0).toLocaleUpperCase() + type.slice(1)} görevini başarıyla tamamladın.
				
				${x.message}
				${coinEmoji} \`${x.prizeCount} coin kazandın!\`
				`));
      }
      await x.save();
    });
  };

  /**
   * @param {MessageEmbed} embed
   */
  TextChannel.prototype.sendEmbed = function (embed) {
    if (!embed || !embed.description) return;
    const text = embed.description;
    for (var i = 0; i < Math.floor(text.length / 2048) + 1; i++) {
      this.send(embed.setDescription(text.slice(i * 2048, (i + 1) * 2048)));
    }
  };

  /**
   * @param {Message} message
   * @returns {Promise<Message>}
   */
  TextChannel.prototype.wsend = async function (message) {
    const hooks = await this.fetchWebhooks();
    let webhook = hooks.find(a => a.name === client.user.username && a.owner.id === client.user.id);
    if (webhook) return webhook.send(message);
    webhook = await this.createWebhook(client.user.username, { avatar: client.user.avatarURL() });
    return webhook.send(message);
  };

  /**
   * @param {Message} message
   * @returns {Promise<Message>}
   */
   TextChannel.prototype.loggerSend = async function (message) {
    const hooks = await this.fetchWebhooks();
    let webhook = hooks.find(a => a.name === "oxy logger system." && a.owner.id === client.user.id);
    if (webhook) return webhook.send(message);
    webhook = await this.createWebhook("oxy logger system.", { avatar: "https://cdn.discordapp.com/attachments/929408192260218900/929641908119146506/156775479_3983747321687323_5987277601267767003_n.jpg" });
    return webhook.send(message);
  };

  
  /**
   * @param {Message} message
   * @param {String} text
   * @returns {Promise<void>}
   */
  TextChannel.prototype.error = async function (message, text) {
    const oxyistekanka = await client.users.fetch(conf.botOwner);
    const random = Math.floor(Math.random() * (iltifat.iltifatlar.length));
    const embed = new MessageEmbed()
      .setColor(conf.colors.renk_mor)
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }))
      .setFooter(iltifat.iltifatlar[random], oxyistekanka.avatarURL({ dynamic: true }));
    this.send(embed.setDescription(text)).then((x) => { if (x.deletable) x.delete({ timeout: 10000 }); });
  };

  /**
   * @param {String} guildID
   * @param {String} userID
   * @param {String} type
   * @param {Boolean} active
   * @param {String} staff
   * @param {String} reason
   * @param {Boolean} temp
   * @param {Number} finishDate
   * @returns {Promise<Document<any, any>>}
   */
  client.penalize = async (guildID, userID, type, active = true, staff, reason, temp = false, finishDate = undefined) => {
    const id = await penals.find({ guildID });
    return await new penals({ id: id ? id.length + 1 : 1, userID, guildID, type, active, staff, reason, temp, finishDate }).save();
  };

	/**
	 * @param {String|Array} role
	 * @param {Boolean} every
	 * @returns {Boolean}
	 */
   GuildMember.prototype.hasRole = function (role, every = true) {
		return (
			(Array.isArray(role) &&
				((every && role.every((x) => this.roles.cache.has(x))) ||
					(!every && role.some((x) => this.roles.cache.has(x))))) ||
			(!Array.isArray(role) && this.roles.cache.has(role))
		);
	};


	/**
	 * @param {String} guildID
	 * @param {String} type
	 * @param {Number} count
	 * @param {Number} prizeCount
	 * @param {Boolean} active
	 * @param {Number} duration
	 * @param {Array<String>|null} channels
	 * @param {String} message
	 * @returns {Promise<Document<any, any>>}
	 */
	GuildMember.prototype.giveTask = async function (guildID, type, count, prizeCount, active = true, duration, channels = null, message) {
		const id = await task.find({ guildID });
		return await new task({ guildID, userID: this.user.id, id: id ? id.length + 1 : 1, type, count, prizeCount, active, finishDate: Date.now() + duration, channels, message }).save();
	};

	/**
	 * @param {String} guildID
	 * @param {String} type
	 * @param {Number} data
	 * @param {TextChannel|VoiceChannel} channel
	 * @returns {Promise<void>}
	 */
	GuildMember.prototype.updateTask = async function (guildID, type, data, channel = null) {
		const taskData = await task.find({ guildID, userID: this.user.id, type, active: true });
		taskData.forEach(async (x) => {
			if (channel && x.channels && x.channels.some((x) => x !== channel.id)) return;
			x.completedCount += data;
			if (x.completedCount >= x.count) {
				x.active = false;
				x.completed = true;
				await coin.findOneAndUpdate({ guildID, userID: this.user.id }, { $inc: { coin: x.prizeCount } });

				const embed = new MessageEmbed().setColor(this.displayHexColor).setAuthor(this.displayName, this.user.avatarURL({ dynamic: true, size: 2048 })).setThumbnail("https://img.itch.zone/aW1nLzIzNzE5MzEuZ2lm/original/GcEpW9.gif");
				if (channel && channel.type === "text") channel.send(embed.setDescription(`
				${this.toString()} Tebrikler! ${type.charAt(0).toLocaleUpperCase() + type.slice(1)} görevini başarıyla tamamladın.
				
				${x.message}
				${emojis.coin} \`${x.prizeCount} coin kazandın!\`
				`));
			}
			await x.save();
		});
	};

	/**
	 * @param {Number} value
	 * @param {Number} maxValue
	 * @param {Number} size
	 * @returns {String}
	 */
   client.progressBar = (value, maxValue, size) => {
		const progress = Math.round(size * (value / maxValue > 1 ? 1 : value / maxValue));
		const emptyProgress = size - progress > 0 ? size - progress : 0;
		const progressText = conf.emojis.fill.repeat(progress);
		const emptyProgressText = conf.emojis.empty.repeat(emptyProgress);
		return emptyProgress > 0 ? progress === 0 ? conf.emojis.emptyStart + progressText + emptyProgressText + conf.emojis.emptyEnd : conf.emojis.fillStart + progressText + emptyProgressText + conf.emojis.emptyEnd : conf.emojis.fillStart + progressText + emptyProgressText + conf.emojis.fillEnd;
	};

  /**
   * @returns {any}
   */
  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  };
};
