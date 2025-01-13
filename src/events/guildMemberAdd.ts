
const { Events } = require("discord.js");

export default {
	name: Events.GuildMemberAdd,
    /**
     * 
     * @param {GuildMember} member The guild member who was added
     */
	async execute(member) {
        // Verifica se é bot
        if (member.user.bot) return;

        if (!member.isCommunicationDisabled()) {
            const dmChannel = await member.createDM(true);
            dmChannel.send(
                `Olá ${member.user.username}, bem-vindo(a) ao servidor! Para se registrar, por favor utilize o comando /registrar.`
            );
        }
        


    }
}