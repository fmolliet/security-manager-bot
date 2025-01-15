const { GuildMember, Events} = require("discord.js");

//const { Events } = require("discord.js");

module.exports = {
	name: Events.GuildMemberAdd,
    /**
     * 
     * @param {GuildMember} member The guild member who was added
     */
	async execute(member) {
        // Verifica se é bot
        if (member.user.bot) return;

        if (!member.isCommunicationDisabled() ) {
            const dmChannel = await member.createDM(true);
            dmChannel.send(
                `Olá ${member.user.username}, bem-vindo(a) ao servidor! Para se registrar, por favor utilize o comando /registrar.`
            );
        } 

        //TODO: Buscar dinamicamente o canal de boas-vindas
        const channel = member.guild.channels.cache.get("840751452082798612")
        if (channel && channel.isTextBased()) {
            channel.send( `Olá ${member.user.username}, bem-vindo(a) ao servidor! Para se registrar, por favor utilize o comando /registrar.`)
        }

        
        


    }
}