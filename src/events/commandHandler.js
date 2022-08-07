const settings = require("../configs/settings.json");
const config = require("../configs/config.json");
const iltifat = require("../configs/iltifat.json");
const emojis = require("../configs/emojis.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
moment.locale("tr");
let sent = false;

setInterval(() => {
  client.cooldown.forEach((x, index) => {
    if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
  });
}, 5000);

/**
 * @param { Client } client
 * @param { Message } message
 */

module.exports = async (message) => {



  const prefix = settings.prefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (message.author.bot || !message.guild || !prefix) return;
  let args = message.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();

  const random = Math.floor(Math.random() * (iltifat.iltifatlar.length));
  const oxy = await client.users.fetch(config.botOwner);
  const embed = new MessageEmbed()
    .setColor(message.member.displayHexColor)
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }))
    .setFooter(iltifat.iltifatlar[random], oxy.avatarURL({ dynamic: true }));

  args = args.splice(1);
  const cmd = client.commands.get(commandName) || client.commands.array().find((x) => x.conf.aliases && x.conf.aliases.includes(commandName));
  if (!cmd || cmd.conf.owner && !settings.owners.includes(message.author.id)) return;

  const oxyemb = new MessageEmbed().setAuthor(message.member.displayName, message.member.user.avatarURL({ dynamic: true })).setColor(config.colors.renk_mor).setFooter(`ID: ${message.member.user.id} • ${moment().calendar()}`).setThumbnail(message.member.user.displayAvatarURL({dynamic: true}));
  const channel = message.guild.channels.cache.get(config.cmdChannel);
   if(channel) {
     channel.loggerSend(oxyemb.setDescription(`${emojis.security} <@!${message.member.id}> adlı kullanıcı \`${prefix}${commandName}\` adlı komudu kullandı.
     
     \`\`\`diff
- Kanal : (#${message.channel.name} - ${message.channel.id})
- Kullanıcı : (${message.member.displayName} - ${message.member.id})
+ Zaman : ${moment().calendar()}\`\`\`

${emojis.inviteStar} Command content : \`${message.content}\``))
   }
   if (!settings.owners.includes(message.author.id)) {
		const cooldown = cmd.conf.cooldown || 3000;
		if (client.cooldown.has(message.author.id)) {
			const cd = client.cooldown.get(message.author.id);
			const diff = Date.now() - cd.lastUsage;
			if (diff < cooldown) {
				if (!sent) {
					sent = true;
					return message.channel.send(embed.setDescription(`Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`)).then((x) => x.delete({ timeout: cooldown - diff }));
				}
			}
		} else client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });
	}
  cmd.run(client, message, args, embed, prefix);
};

module.exports.conf = {
  name: "message",
};
