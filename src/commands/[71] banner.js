const Discord = require('discord.js');
const settings = require("../configs/settings.json");
const fetch = require('node-fetch')

module.exports = {
    conf: {
      aliases: ["banner"],
      name: "banner",
      help: "banner"
    },


    run: async (client, message, args, embed, prefix) => {
        let user = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
        let oxyistekanka = ``
        let oksicim = ``
        let response = fetch(`https://discord.com/api/v8/users/${user.id}`, {
        method: 'GET',
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).then(a => {
          if(a.status !== 404) {
              a.json().then(data => {
                oxyistekanka = data['banner']

                  if(oxyistekanka !== null) {

                      let response2 = fetch(`https://cdn.discordapp.com/banners/${user.id}/${oxyistekanka}.gif`, {
                          method: 'GET',
                          headers: {
                              Authorization: `Bot ${client.token}`
                          }
                      })
                      let statut = ''
                      response2.then(b => {
                          statut = b.status

                          oksicim = `https://cdn.discordapp.com/banners/${user.id}/${oxyistekanka}.gif?size=1024`
                          if(statut === 415) {
                            oksicim = `https://cdn.discordapp.com/banners/${user.id}/${oxyistekanka}.png?size=1024`
                          }

                      })
                  }
              })
          }
      })
      
      setTimeout(() => {
        if(oksicim) {
          message.channel.send(embed.setImage(oksicim))
        } else {
          message.channel.send(embed.setDescription(`Malesef <@!${user.id}> adlı kullanıcının bannerı bulunmuyor.`))
        }
      }, 1000)
  

      },
      };
    
