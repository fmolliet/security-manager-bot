const { ChatInputCommandInteraction, Collection, GuildMemberRoleManager, Interaction, ModalActionRowComponentBuilder, Role, SlashCommandBuilder } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

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

		// verifica se é bot
		if (interaction.user.bot) return;

		// Verifica se já está registrado pelas tags
		if (interaction.member.roles.cache.some((role) => role.name === 'Engineer')) {
			await interaction.reply('Você já está registrado!');
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