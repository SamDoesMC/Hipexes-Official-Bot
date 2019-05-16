const moment = require('moment');
exports.run = (client, message, args) => {
    const status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline/Invisible"
      };
    const mb = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    if (!mb) return message.reply("you have to fill in a valid user!");
      message.channel.send({embed:{
          color: 000000,
          title: "Name",
          description: mb.user.tag,
          fields: [{
            name: "UserID",
            value: mb.user.id
        },

        {
            name: "Nickname: ",
            value: `${mb.nickname !== null ? `${mb.nickname}` : "No nickname"}`
          },
          {
              name: "Status",
              value: `${status[mb.user.presence.status]}`
          },
          {
            name: "\nPlaying",
            value: `${mb.user.presence.game ? `${mb.user.presence.game.name}` : "Nothing"}`
          },
          {
              name: "Joined at",
              value: moment(mb.joinedAt).format('MMMM Do YYYY h:mm:ss')
          },
          {
          name: "Roles",
          value: `${mb.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`
          }
        ],
        timestamp: new Date(),
        footer: {
            text: "InfoBot"
        }
    }});
}