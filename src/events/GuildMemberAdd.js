const { GuildMember, Events, ButtonStyle, ButtonBuilder, ActionRowBuilder} = require("discord.js");
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
        try {
            await member.roles.add(constants.starterRoleId);
        } catch (error) {
            console.error(`Erro ao adicionar cargo para ${member.user.username}: ${error.message}`)
        }

        const register = new ButtonBuilder()
            .setCustomId('openRegistrationModal')
            .setLabel('Clique aqui para se registrar!')
            .setEmoji("📝")
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(register);

        const channel = member.guild.channels.cache.get(constants.guildIntroChannelId)
        if (channel && channel.isTextBased()) {
            channel.send({
                embeds: [
                    {
                        title: "Seja bem-vindo ao Furry Brasil 2.0!",
                        url: "https://linktr.ee/FurryBrasil2.0",
                        description: `Olá <@${member.user.id}>, bem-vindo(a). Para você ter acesso ao servidor, por favor utilize o botão abaixo para se registrar e preencha o formulário, após isso aguarde a staff aprovar.\nAtenciosamente, Staff Furry Brasil 2.0.`,
                        timestamp: new Date().toISOString(),
                        color: 0x039303,
                    },
                ], components: [
                    row
                ]
            });
        }

    }
}
