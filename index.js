const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const config = require('./config.json');


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  });

  client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;
  
    channel.send(`Welcome To The Server Hope You Enjoy , ${member}!`);
  });

  client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;
  
    channel.send(`Sorry To See Yah Leaving , ${member}!`);
  });


  client.on("message", message => {
    if (message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
  //    console.error(err);
    }
  });


  client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
      
      client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
        stop(message, serverQueue);
		return;
	} else {
		message.channel.send('You need to enter a valid command!')
	}
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
    	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

    if(command === "ping") {
      const m = await message.channel.send("Wait");
      m.edit(`Here! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
    
    if(command === "say") {
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);
    }
  
    
   if (command === "announce") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
     let args = message.content.split(" ").slice(1).join(" ");
  let split = args.split("-");
  let url = args[2];
      message.channel.sendMessage("@everyone", {
        embed: {
          color: 000000,
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
          title: ":information_source: Announcement",
          description: split[0],
          url: split[1],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.avatarURL,
            text: message.author.username
          }
        }
    });
  }
  }
   
  
  
  if (command === "contact") {
    message.channel.sendMessage("``Contact My Owners https://discord.gg/spK22Vk!``");
  }
      
      
  if (command === "Test"){
    let TestEmbed = new Discord.RichEmbed()
    .setColor("000000")
    .setTitle("The Bot Runs Perfectly")

    return message.channel.send(TestEmbed)
  };
      
  if (command === "ironman")
   message.channel.sendMessage('``I Love You 3000`` :ily:')
  
  if (command === "invite") {
    message.author.sendMessage("``Oh I am so glad you want to invite me to your server!  So invite me now!`` https://discordapp.com/oauth2/authorize?client_id=575189451647483905&scope=bot&permissions=2146958847")
  } 
  
  if (command === "kms") {
    message.channel.sendMessage(`:knife: ``I have successfully killed ${message.author}.`` :knife:`)
  }
  
  
  if (command === "8ball") {
   var ball = ['Yes','No doubt about it','Try again','signs point to yes','I say no','No chance','Dont think so'];
   message.channel.sendMessage(ball[Math.floor(Math.random () * ball.length)]);
  }

  if (command === "dankmeme") {
    message.delete().catch(O_o=>{});
    var ball = ['https://cdn.discordapp.com/attachments/575203491216228355/575902908852469780/images_2.jpe','https://cdn.discordapp.com/attachments/575203491216228355/575902882595995689/images_1.jpe']
    message.channel.send(ball[Math.floor(Math.random () * ball.length)]).then(sentMessage => {
      sentMessage.react('😂')
    });
  }



  if (command === 'fruits') {
    Promise.all([
      message.react('🍎'),
      message.react('🍊'),
      message.react('🍇'),
    ])
      .catch(() => console.error('One of the emojis failed to react.'));
  }
  
  if (command === "roll") {
  message.channel.sendMessage(Math.floor(Math.random() * 100));
  }

  client.on('message', message => {
    if (message.content === 'kb!rip') {
      const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
      message.channel.send(attachment);
    }
  });


  
  
  
  if(command === "help")
  message.author.send({embed: {
    color: 000000,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "The Bot Is Currently In Progress",
    description: "The Bot Is Needed Other Commands / To Use Other Commands Go To #cmd",
    timestamp: new Date(),
    footer: {
      text: "© Example"
    }
  }
  });


  
  
 if(command === "freecode")
  message.author.send({embed: {
    color: 000000,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Wanna Create A Discord Bot?",
    description: "https://discord.js.org/#/",
    fields: [{
        name: "Create A Music Bot?",
        value: "https://medium.freecodecamp.org/how-to-create-a-music-bot-using-discord-js-4436f5f3f0f8"
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "© Example"
    }
  }
});




if(command === "rules")
  message.author.send({embed: {
    color: 000000,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "------------------------Rules of Hipexes---------------------",
    description: "1. Don't swear/rude/bully | This will result in a warn!\n2. Don't post other minecraft/discord server links! Results in a temp/permanent ban!\n3. Don't post NSFW (Not Safe For Work) images, will result in a warn, maybe... the server will have a nsfw channel sometimes...\n4. Don't disrespect staff!\n5. Don't ask for admin or other roles, ok? Will result in a warn...\n6. Don't hack or use selfbot's/userbot's! This will result in a PERMANENTLY BAN!\n7. Staff can't mute other staff members! So legit huh?\n8. No Using Mute,Ban And Kick Command From Any Channel Except A New Channel I Will Make\n9. No sharing viruses, minecraft accounts. This will result in a warn or maybe a BAN!",
    timestamp: new Date(),
    footer: {
      text: "© Example"
    }
  }
});
      
      
      
      
 if(command === "test")
  message.channel.send({embed: {
    color: 000000,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Test?",
    description: "Now The Bot Runs Perfectly",
    timestamp: new Date(),
    footer: {
      text: "© Example"
    }
  }
});      
      




  
  
  
  if (command === "mute") {
  if (message.member.hasPermission("ADMINISTRATOR")) {
   let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
  if (!modlog) return message.reply('I cannot find a log channel').catch(console.error);
  if (!muteRole) return message.reply('I cannot find a muted role').catch(console.error);
  if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  message.delete();
  const embed = new Discord.RichEmbed()
    .setColor(000000)
    .addField('Action:', 'Un/Mute')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);
  
  
  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  
  
  }
  }
  };
  
  if (command === "warn") {
  if (message.member.hasPermission("ADMINISTRATOR")) {
   let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'log');
  if (!modlog) return message.reply('I cannot find a log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  message.delete();
  const embed = new Discord.RichEmbed()
  .setColor(000000)
  .addField('Action:', 'Warning')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Reason', reason);
  return client.channels.get(modlog.id).sendEmbed(embed);
  
  }
  }
  
  if (command === "ban") {
  if (message.member.hasPermission("BAN_MEMBERS")) {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'log');
  if (!modlog) return message.reply('I cannot find a log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  
  if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
  message.guild.ban(user, 2);
  message.delete();
  
  const embed = new Discord.RichEmbed()
    .setColor(000000)
    .addField('Action:', 'Ban')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return client.channels.get(modlog.id).sendEmbed(embed);
  }
  }
  
  if (command === "kick") {
  if (message.member.hasPermission("KICK_MEMBERS")) {
    let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'log');
  if (!modlog) return message.reply('I cannot find a log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  message.delete();
  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  message.guild.member(user).kick();
  
  const embed = new Discord.RichEmbed()
    .setColor(000000)
    .addField('Action:', 'kick')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return client.channels.get(modlog.id).sendEmbed(embed);
  }
  }

    
    if(command === "purge") {
      const deleteCount = parseInt(args[0], 10);
      if(!deleteCount || deleteCount < 1 || deleteCount > 100)
        return message.channel.send(":x: " + "|Please Enter A Numeric Value! ");
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
  });

  client.login(config.token); 
