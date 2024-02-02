// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "students",
            [
                {
                    invitations_id: 1,
                    users_id: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    invitations_id: 1,
                    users_id: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            "students", null,
            {
                truncate: true,
                cascade: true,
                restartIdentity: true,
            }
        );
    },
};
