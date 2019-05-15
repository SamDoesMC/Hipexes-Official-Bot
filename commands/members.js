const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
     let sicon = message.guild.iconURL;
          let serverembed = new Discord.RichEmbed()
          .setDescription("Guild Info")
          .setColor("000000")
          .setThumbnail(sicon)
          .setTimestamp()
          .addField("Total Members", message.guild.memberCount);
          return message.channel.send(serverembed);
       };

module.exports.help = {
    name: "members"
};