const {request}  = require('undici');

const BASE_URL = process.env.FB_SERVICES_URL ?? "http://localhost:8081";

module.exports = {

    /**
     *
     * @param {string} userId
     * @returns {Promise<any>}
     */
    getRegistrationStatus: async (userId) => {
        try {
            const response = await request(`${BASE_URL}/registration/${userId}/open`);
            return response.statusCode == 200;
        } catch (error) {
            console.error('Erro ao obter registro do usuário: ', error);
            throw error;
        }
    },

    /**
     *
     * @param {string} applicantId
     * @param {string} birthday
     * @param {string} specie
     * @param {string} source
     * @param {string} messageId
     * @returns {Promise<any>}
     */
    createRegistration: async ( applicantId,   birthday,  specie,  source,  messageId) => {
        try {
            const response = await request(`${BASE_URL}/registration`, {
                method: "POST",
                body: JSON.stringify({
                    applicantId,
                    birthday,
                    specie,
                    source,
                    messageId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.body.json();
        } catch (error) {
            console.error('Erro ao criar registro: ', error);
            throw error;
        }
    },

    /**
     *
     * @param {string} applicantId
     * @param {string} curatorId
     * @param {boolean} approved
     * reti
     */
    updateRegistration: async ( applicantId,  curatorId,  approved) => {
        try {
            const response = await request(`${BASE_URL}/registration`, {
                method: "PATCH",
                body: JSON.stringify({
                    applicantId,
                    curatorId,
                    approved
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.body.json();
        } catch (error) {
            console.error('Erro ao atualizar registro: ', error);
            throw error;
        }
    }

}
