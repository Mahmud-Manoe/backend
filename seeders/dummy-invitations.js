// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "invitations",
            [
                {
                    kode_undangan: "12mmk",
                    classes_id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    kode_undangan: "12mmk",
                    classes_id: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            "invitations", null,
            {
                truncate: true,
                cascade: true,
                restartIdentity: true,
            },
        );
    },
};
