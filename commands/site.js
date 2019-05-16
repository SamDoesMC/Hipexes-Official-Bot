const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
     let sicon = message.guild.iconURL;
          let serverembed = new Discord.RichEmbed()
          .setDescription("The Website Of Hipexes")
          .setColor("000000")
          .setThumbnail(sicon)
          .setTimestamp()
          .addField(`Ghostly Hamster#2526`,`Made The Website For Hipexes / Gaming Community \n [ [Hipexes](https://hipexes.yolasite.com/) ] `);
          return message.channel.send(serverembed);
       };

module.exports.help = {
    name: "site"
};
