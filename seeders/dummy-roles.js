// "use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "roles",
            [
                {
                    role: "Admin",
                },
                {
                    role: "Guru",
                },
                {
                    role: "Siswa",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("roles", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
