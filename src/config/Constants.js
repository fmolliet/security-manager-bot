module.exports = {
    starterRoleId: process.env.STARTER_ROLE_ID,
    registeredRoleId: process.env.REGISTERED_ROLE_ID ?? '1329255219716034570',
    registeredAltRoleId: process.env.REGISTERED_ALT_ROLE_ID,
    guildIntroChannelId: process.env.GUILD_INTRO_CHANNEL_ID??'840751452082798612',
    guildApprovalChannelId: process.env.GUILD_APPROVAL_CHANNEL_ID??'1328922027024842852',
    enableWelcomeMessage: process.env.ENABLE_WELCOME_MESSAGE??false
}
