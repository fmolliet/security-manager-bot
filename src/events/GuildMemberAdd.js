const { GuildMember, Events} = require("discord.js");
const constants = require("../config/Constants");

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

        if ( !constants.enableWelcomeMessage ) return;

        if (!member.isCommunicationDisabled() ) {
            try { 
                const dmChannel = await member.createDM(true);
                await dmChannel.send(
                    `Olá ${member.user.username}, bem-vindo(a) ao servidor! Para se registrar, por favor utilize o comando /registrar.`
                );
            } catch (error){
                console.error(`Erro ao enviar mensagem para ${member.user.username}: ${error.message}`)
            }
           
        } 

        const channel = member.guild.channels.cache.get(constants.guildIntroChannelId)
        if (channel && channel.isTextBased()) {
            channel.send( `Olá ${member.user.username}, bem-vindo(a) ao servidor! Para se registrar, por favor utilize o comando /registrar.`)
        }

    }
}