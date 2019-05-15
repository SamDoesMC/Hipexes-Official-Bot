const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
     let sicon = message.guild.iconURL;
          let serverembed = new Discord.RichEmbed()
          .setDescription("Guild Info")
          .setColor("000000")
          .setThumbnail(sicon)
          .setTimestamp()
          .addField("Guild Name", message.guild.name)
          .addField("Created On", message.guild.createdAt)
          .addField("You Joined", message.member.joinedAt)
          .addField("Total Members", message.guild.memberCount);
          return message.channel.send(serverembed);
       };

module.exports.help = {
    name: "serverinfo"
};