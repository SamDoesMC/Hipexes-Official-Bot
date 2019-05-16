const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
     let sicon = message.guild.iconURL;
          let serverembed = new Discord.RichEmbed()
          .setDescription("Owner's Or Creator Of The Bot")
          .setColor("000000")
          .setThumbnail(sicon)
          .setTimestamp()
          .addField(`Ghostly Hamster#2526`,`Made The Bot On Hipexes / Gaming Community \n [ [Hipexes](https://discord.gg/KMYxyxk) ] `);
          return message.channel.send(serverembed);
       };

module.exports.help = {
    name: "owner"
};