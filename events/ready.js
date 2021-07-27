module.exports = (client) => {
    console.log(`Ready as ${client.user.tag} to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
client.user.setActivity(">help", { type: "STREAMING", url:"https://www.twitch.tv/captain_motchy" }).then(() => {
    client.Manager.init(client.user.id);
    client.log("Successfully Logged in as " + client.user.tag);
  });
  client.RegisterSlashCommands();
};
