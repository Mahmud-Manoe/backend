// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "students",
            [
                {
                    invitations_id: 1,
                    users_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    invitations_id: 1,
                    users_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
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
