const { ChatInputCommandInteraction, Collection, GuildMemberRoleManager, Interaction, ModalActionRowComponentBuilder, Role, SlashCommandBuilder } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { getRegistrationStatus } = require('../../api/fbservices');
const constants = require('../../config/Constants');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('registrar')
		.setDescription('Reliza a criação de um registro na portaria!'),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @returns 
	 */
	async execute(interaction) {
		if (interaction.user.bot) return;
		if ( process.env.REGISTER_CHANNEL_ID && interaction.channelId !== process.env.REGISTER_CHANNEL_ID ) {
			await interaction.reply('Esse comando só pode ser executado no canal #introducao!');
			return;
		}

		if ( constants.starterRoleId && !interaction.member.roles.cache.has(constants.starterRoleId)){
			await interaction.reply('Você não tem a tag de membro novo para realizar o registro!');
			return
		}

		if (interaction.member.roles.cache.has(constants.registeredRoleId)
			|| (constants.registeredAltRoleId && interaction.member.roles.cache.has(constants.registeredAltRoleId))) {
			await interaction.reply('Você já está registrado!');
			return;
		}
		
		
		try {
			const registrationStatus = await getRegistrationStatus(interaction.user.id);
			if (registrationStatus) {
				await interaction.reply('Você já se registrou, aguarde a aprovação da staff!');
				return;
			}
		} catch (error) {
			console.error('Erro ao verificar registro do usuário: ', error);
			await interaction.reply('Erro ao verificar registro do usuário.');
			return;
		}

		const modal = new ModalBuilder()
			.setCustomId('registerModal')
			.setTitle('Registro da Portaria');

		const birthDayInput = new TextInputBuilder()
			.setCustomId('birthDayInput')
			.setLabel('Qual sua data de nascimento? (DD/MM/AAAA)')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('DD/MM/AAAA')
			.setMinLength(8)
			.setMaxLength(10)
			.setRequired(true);

		const fursonaInput = new TextInputBuilder()
			.setCustomId('fursonaInput')
			.setLabel('Qual a espécie do seu fursona?')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('Caso não seja furry, por favor nos diga qual seu envolvimento com a fandom!')
			.setRequired(true);

		const sourceInput = new TextInputBuilder()
			.setCustomId('sourceInput')
			.setLabel('Por onde você conheceu o grupo? ')
			.setStyle(TextInputStyle.Paragraph)
			.setPlaceholder('Nos diga por onde você encontrou ou qual membro lhe indicou o grupo!')
			.setRequired(true);

		const firstActionRow = new ActionRowBuilder().addComponents(birthDayInput);
		const secondActionRow = new ActionRowBuilder().addComponents(fursonaInput);
		const thridActionRow = new ActionRowBuilder().addComponents(sourceInput);

		modal.addComponents(firstActionRow, secondActionRow, thridActionRow);

		await interaction.showModal(modal);

	},
};