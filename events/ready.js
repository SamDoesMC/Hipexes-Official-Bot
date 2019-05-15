const config = require('../config.json');
const playing = ('On Hipexes ' + config.prefix + 'help')
exports.run = (client) => {
  client.user.setGame(playing, 'https://www.twitch.tv/hix')
  client.user.setStatus("dnd")
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  }
 